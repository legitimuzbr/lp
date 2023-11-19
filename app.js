const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/obrigado", (req, res) => {
  res.render("obrigado");
})

app.get("*", (req, res) => {
  res.redirect("/");
})

app.post('/formulario', (req, res) => {
  
  const nome = req.body.nome;
  const email = req.body.email;
  const telefone = req.body.telefone;
  const gclid = req.body.gclid;

  const webhookUrl = 'https://hooks.zapier.com/hooks/catch/17112146/3kd9sq2/';

  const dataToSend = [
    {"contato": {"nome": nome, "email": email, "telefone": telefone}}
  ];

  axios.post(webhookUrl, dataToSend)
    .then(response => {
      console.log('Dados enviados com sucesso para o webhook.');
    })
    .catch(error => {
      console.error('Erro ao enviar dados para o webhook:', error);
    });

    res.redirect("/obrigado")
    
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
