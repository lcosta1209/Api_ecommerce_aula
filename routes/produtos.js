const express = require('express');
const router = express.Router();

let produtos = require('../data/dadosProdutos');

router.get('/', (req, res) => {
  res.json(produtos);
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }
  res.json(produto);
});

router.post('/', (req, res) => {
  const { nome, valor, quantidade } = req.body;

  if (!nome || valor === undefined || quantidade === undefined) {
    return res.status(400).json({ erro: "Campos 'nome', 'valor' e 'quantidade' são obrigatórios" });
  }

  const novoProduto = {
    id: produtos.length + 1,
    nome,
    valor: parseFloat(valor),
    quantidade: parseInt(quantidade)
  };

  produtos.push(novoProduto);
  res.status(201).json(novoProduto);
});

router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex(p => p.id === id);

  if (produtoIndex === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  produtos[produtoIndex] = {
    ...produtos[produtoIndex],
    ...req.body,
    id: id
  };

  res.json({ mensagem: `Produto '${produtos[produtoIndex].nome}' atualizado com sucesso` });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produtoIndex = produtos.findIndex(p => p.id === id);

  if (produtoIndex === -1) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  const produtoDeletado = produtos.splice(produtoIndex, 1);
  res.status(200).json({ mensagem: `Produto '${produtoDeletado[0].nome}' deletado com sucesso` });
});

module.exports = router;