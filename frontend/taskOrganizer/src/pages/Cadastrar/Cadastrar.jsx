import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'https://task-organizer-back-front.vercel.app'; // URL do seu backend

function Cadastrar({ setPrecisoRegistrar, setDados }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [erroEntrar, setErroEntrar] = useState('');

  const cadastrarF = async (e) => {
    e.preventDefault();

    if (user.length < 3 || password.length < 3) {
      setErroEntrar('Por favor, adicione os dados!');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/cadastrar`, { username: user, password });
      console.log('Cadastro realizado com sucesso:', response.data);
      setDados(response.data);
      setPrecisoRegistrar(false); // Volta para a tela de login
    } catch (error) {
      if (error.response) {
        console.error('Erro na resposta do servidor:', error.response.data);
        setErroEntrar(error.response.data.message || 'Erro ao cadastrar. Tente novamente.');
      } else if (error.request) {
        console.error('Nenhuma resposta recebida do servidor:', error.request);
        setErroEntrar('Nenhuma resposta recebida do servidor.');
      } else {
        console.error('Erro na configuração da requisição:', error.message);
        setErroEntrar('Erro na requisição. ' + error.message);
      }
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center'>
      <form onSubmit={cadastrarF} className='border-2 rounded-md w-1/3 py-2 px-4'>
        <h2 className='font-semibold text-3xl w-full text-center text-blue-500 my-2'>Cadastrar</h2>

        <input
          type="text"
          name='user'
          onChange={(e) => setUser(e.target.value)}
          placeholder='User'
          className='w-full outline-none border text-blue-500 hover:bg-blue-100 focus:border-blue-500 hover:placeholder-blue-900 hover:text-blue-900 rounded-md px-2 py-1 mb-2'
        />

        <input
          type="password"
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
          className='w-full outline-none border text-blue-500 hover:bg-blue-100 focus:border-blue-500 hover:placeholder-blue-900 hover:text-blue-900 rounded-md px-2 py-1 mb-2'
        />

        <a onClick={() => setPrecisoRegistrar(false)} className='text-sm justify-center flex w-full text-blue-500 mb-2 hover:text-blue-600 cursor-pointer focus:font-semibold'>
          Do you have an account? Connect
        </a>

        {erroEntrar && (
          <p className='text-white bg-red-500/[0.8] rounded-md font-normal w-full text-center mb-2'>
            {erroEntrar}
          </p>
        )}

        <button type='submit' className='w-full rounded-md bg-blue-500 p-1 font-bold text-white mb-2'>Cadastrar</button>
      </form>
    </div>
  );
}

export default Cadastrar;