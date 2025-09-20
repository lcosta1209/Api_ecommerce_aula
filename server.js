const express = require('express');
const cors = require('cors'); // 👈 importa o cors
const app = express();
const port = 3000; 

const produtosRoutes = require('./routes/produtos');
const usuariosRoutes = require('./routes/usuarios');

app.use(cors({
  origin: "http://localhost:5173" 
}));

app.use(express.json());

app.use('/produtos', produtosRoutes);
app.use('/usuarios', usuariosRoutes);

app.get('/', (req, res) => {
  res.send('API de E-commerce funcionando!');
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
