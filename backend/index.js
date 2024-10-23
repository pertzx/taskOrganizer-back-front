const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(express.json()); // Para permitir JSON no corpo das requisições
app.use(cors());

const port = process.env.PORT || 5000;

// Conectar ao MongoDB
mongoose.connect(process.env.DB, {
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
    res.json({ token, username, password, logado: true, user });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao realizar login' });
  }
});

// Rota para buscar tarefas
app.get('/tarefas/:username', async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.json({ tasks: user.tasks });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar tarefas' });
  }
});


// rota pra adicionar tarefa
app.post('/adicionar-tarefa', async (req, res) => {
  const { username, title, description } = req.body;
  const user = await User.findOne({ username });
  var mensagem;

  if (!user) {
    mensagem = 'Server-side error';
    return res.json({ mensagem });
  }
  if (!title || !description) {
    mensagem = 'Please enter data';
    return res.json({ mensagem });
  } else {
    try {
      const novaTarefa = {
        title,
        description,
        completed: false // a tarefa inicia como não concluída!
      };

      mensagem = '';
      user.tasks.push(novaTarefa);

      await user.save();
      console.log(user.tasks);
      // Retorna a nova tarefa
      res.json({ username, logado: true, mensagem, task: novaTarefa });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao adicionar a tarefa' });
    }
  }
});

//rota pra editar a tarefa!
app.post('/editar-tarefa', async (req, res) => {
  const { username, title, description, index } = req.body;
  console.log({ username, title, description, index }); // Verifique o que está sendo recebido

  if(!title){
    return res.status(400).json({message: 'O titulo é obrigatorio!'})
  }

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    console.log(user.tasks); // Verifique as tarefas existentes
    
    // Certifique-se de que o índice seja válido
    if (index < 0 || index >= user.tasks.length) {
      return res.status(400).json({ message: 'Índice de tarefa inválido' });
    }

    // Atualize a tarefa com o novo título e descrição
    user.tasks[index] = { title, description };
    await user.save();

    const editedTask = user.tasks[index];

    const message = {
      good: true,
      mess: 'Tarefa editada com sucesso' 
    };
    
    res.json({ task: editedTask, message });
  } catch (error) {
    console.error(error); // Log do erro detalhado
    res.status(500).json({ message: 'Erro ao editar tarefa', error: error.message });
  }
});

// Rota para deletar uma tarefa
app.delete('/deletar-tarefa/:username/:index', async (req, res) => {
  const { username, index } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (index < 0 || index >= user.tasks.length) {
      return res.status(400).json({ message: 'Índice de tarefa inválido' });
    }

    // Remove a tarefa do array usando splice
    user.tasks.splice(index, 1); 

    await user.save();
    res.json({ message: 'Tarefa deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar tarefa' });
  }
});






app.listen(port, () => {
  console.log('Servidor rodando na porta '+ port);
});
