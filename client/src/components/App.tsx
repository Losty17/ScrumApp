import { useEffect, useState } from "react";

function App() {
  const [mensagem, setMensagem] = useState("");
  const fetchData = async () => {
    const data = await fetch("/api/mensagem");
    const body = await data.json();

    return body;
  };

  useEffect(() => {
    fetchData().then((data) => setMensagem(data.express));
  }, []);

  return <div className="App">{mensagem}</div>;
}

export default App;
