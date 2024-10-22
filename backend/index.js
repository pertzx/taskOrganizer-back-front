const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); // Para permitir JSON no corpo das requisições
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb+srv://pyerre:familia321p@cluster0.zr8u0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => console.error(err));

// Modelo de Usuário
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  tasks: [
    {
      title: { type: String, required: true },
      description: { type: String },
      completed: { type: Boolean, default: false },
    },
  ],
});

const User = mongoose.model('User', UserSchema);

// Rota de Cadastro (POST /cadastrar)
app.post('/cadastrar', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao cadastrar o usuário' });
  }
});

// Rota de Login (POST /entrar)
app.post('/entrar', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Por favor, preencha todos os campos' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta' });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token, username, password, logado: true, user});
  } catch (err) {
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
});

app.listen(PORT, () => {
  console.log('Servidor rodando na porta 5000');
});
