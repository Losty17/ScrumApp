import express, { Request, Response } from "express";
import dotenv from "dotenv";
import User from "./models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cors from "cors";
import db from "./db";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

/**
 * Middleware for JWT authentication.
 *
 * @param req request object
 * @param res response object
 * @param next redirect to next route
 */
const verifyJWT = (req: Request, res: Response, next: any) => {
  const token = req.headers.token;

  if (!token)
    res.status(401).send({ error: "Access denied. No token provided." });
  else if (typeof token === "string") {
    jwt.verify(
      token,
      process.env.JWT_SECRET || "",
      (err: any, decoded: any) => {
        if (err)
          res.status(401).send({ error: "Access denied. Invalid token." });
        else {
          res.locals.userId = decoded.id;

          next();
        }
      }
    );
  }
};

app.get("/api/authenticate", verifyJWT, async (req: Request, res: Response) => {
  const user = await User.findByPk(res.locals.userId);
  if (user) res.send({ auth: true });
  else res.status(404).send({ auth: false, message: "Invalid token." });
});

/**
 * @api {get} /login User authentication endpoint
 *
 * @apiParam {string} email
 * @apiParam {string} password
 */
app.post("/api/login", async (req: Request, res: Response) => {
  const { email, password } = req.headers;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user && typeof password === "string") {
      bcrypt.compare(password, user.password, (err, response) => {
        if (response) {
          const id = user.id;
          const token = jwt.sign({ id }, process.env.JWT_SECRET || "", {
            expiresIn: 1800,
          });

          res.send({ auth: true, token: token, expiresIn: 1800 });
        } else {
          res.status(401).send({ error: "Invalid credentials" });
        }
      });
    } else {
      res.status(401).send({ error: "Invalid email or password" });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong" });
  }
});

/**
 * /api/register User registration endpoint
 *
 * POST with { email, password, username } as headers,
 * then check if user exists, if not, create user,
 * if user exists, return error message
 */
app.post("/api/register", async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.headers;

    if (typeof password === "string") {
      const hash = await bcrypt.hash(password, 10);

      const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: { password: hash, username: username },
      });

      if (!created)
        res.status(400).send({ error: "The email is already in use" });
      else if (user)
        res.status(200).send({ message: "User created, you can now login" });
      else res.status(500).send("Something went wrong");
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({ auth: false, error: "Something went wrong" });
  }
});

app.get("/api/user", verifyJWT, async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(res.locals.userId, {
      attributes: ["username", "email", "picture"],
    });
    if (user) res.send(user);
    else res.status(404).send("User not found.");
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Something went wrong" });
  }
});

app.listen(port, () => {
  db.sync().then(
    (success) => {
      console.log("Database synced!");
    },
    (error) => {
      console.error("Could not sync database", error);
    }
  );
  console.log(`Listening on port ${port}`);
});
