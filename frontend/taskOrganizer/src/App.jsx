import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio/Inicio.jsx';
import Entrar from './pages/Entrar/Entrar.jsx';
import Cadastrar from './pages/Cadastrar/Cadastrar.jsx';

function App() {
  const [logado, setLogado] = useState(false);
  const [precisoRegistrar, setPrecisoRegistrar] = useState(false);
  const [username, setUsername] = useState('');
  const [dados, setDados] = useState();

  const renderRoute = () => {
    if (logado) {
      console.log(dados.user)
      return <Inicio username={username} tarefasArray={dados.user}/>;
    } else {
      if (precisoRegistrar) {
        return <Cadastrar setPrecisoRegistrar={setPrecisoRegistrar} setDados={setDados}/>;
      } else {
        return <Entrar setPrecisoRegistrar={setPrecisoRegistrar} setLogado={setLogado} setUsername={setUsername} setDados={setDados}/>;
      }
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={renderRoute()} />
      </Routes>
    </Router>
  );
}

export default App;
