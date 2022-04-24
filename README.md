# Intro

Learning project, made with React and Express. Primary goal is to understand SQL and creating/consuming REST APIs.

---

## Tools

- React and Typescript for the front-end;
- Express and Typescript for the back-end (REST API);
- MySQL as the database (with MySQL Workbench);
- Postman for REST API testing;
- Visual Studio Code as IDE;
- Chrome as web environment;
- Github as GIT and Planning tool.

---

## Base design

The core design was made in Figma, with my poor skills in graphics design.

---

### Dashboard

![Dashboard](https://i.imgur.com/rmyVHPw.png)

---

## Environment

Running this project requires a `.env` file at `/src/`. You may use this as your testing env file.

```.env
DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=tests

JWT_SECRET=test
```

---

## Database

Working with MySQL. Models made with Sequelize.

### User

|     id      | username | email  | password | picture | createdAt | updatedAt |
|-------------|----------|--------|----------|---------|-----------|-----------|
| primary key |  string  | string |   hash   | string  |   date    |   date    |
