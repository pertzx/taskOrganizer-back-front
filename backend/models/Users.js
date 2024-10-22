const mongoose = require('mongoose');

// Definição do Schema
const dados = new mongoose.Schema({
  user: string,
  password: string,
  tarefas: string,
});

// Criação do modelo
const MeuModelo = mongoose.model('dados', dados);
module.exports = MeuModelo;