require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express();
app.use(express.json())
const lembretes = {}
let id = 1
app.get('/lembretes', (req,res) => res.send(lembretes))

app.post('/eventos', (req, res) => {
    try{
        const evento = req.body
        console.log(evento)
    }
    catch(e){}
    res.status(200).end()
})

app.post('/lembretes', async (req, res) => {
    const texto = req.body.texto
    const lembrete = {
        id,
        texto,
        status: 'aguardando'
    }
    lembrete[id] = lembrete
    id++
    await axios.post('https://localhost:10000/eventos', {
        type: 'LembreteCriado',
        payload: lembrete
    })
    res.status(201).send(lembrete)
})

app.listen(
    process.env.PORT,
    () =>console.log(`Lembretes: ${process.env.PORT}`)
)