const express = require('express');
const router = express.Router();

let usuarios = require('../data/dadosUsuarios');

router.get('/', (req, res) => {
  res.json(usuarios);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);

  if (!usuario) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }
  res.json(usuario);
});

router.post('/', (req, res) => {
  const { nome, senha, tipo } = req.body;

  if (!nome || !senha || !tipo) {
    return res.status(400).json({ erro: "Campos 'nome', 'senha' e 'tipo' são obrigatórios" });
  }

  const novoId = usuarios.length > 0 ? Math.max(...usuarios.map(u => u.id)) + 1 : 1;

  const novoUsuario = {
    id: novoId,
    nome,
    senha,
    tipo
  };

  usuarios.push(novoUsuario);

  res.status(201).json({
    mensagem: "Usuário cadastrado com sucesso!",
    usuario: novoUsuario
  });
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  if (usuarioIndex === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  usuarios[usuarioIndex] = {
    ...usuarios[usuarioIndex],
    ...req.body,
    id: id
  };

  res.json({ mensagem: `Usuário '${usuarios[usuarioIndex].nome}' atualizado com sucesso` });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const usuarioIndex = usuarios.findIndex(u => u.id === id);

  if (usuarioIndex === -1) {
    return res.status(404).json({ erro: "Usuário não encontrado" });
  }

  const usuarioDeletado = usuarios.splice(usuarioIndex, 1);
  res.status(200).json({ mensagem: `Usuário deletado com sucesso` });
});

module.exports = router;