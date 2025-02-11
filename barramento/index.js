require('dotenv').config()
const express = require('express')
const axios = require('axios')
const app = express()
app.use(express.json())
const eventos = []
app.post('/eventos', async (req, res) => {

    const evento = req.body
    eventos.push(evento)
    console.log(evento)

    if (evento.type === 'ObservacaoClassificada' || 'LembreteCriado') {
        try {
            await axios.post('https://localhost:4000/eventos', evento)
        } catch (e) {
        }
    }
    if (evento.type !== 'ObservacaoClassificada') {
        try {
            await axios.post('https://localhost:5000/eventos', evento)
        } catch (e) {
        }
    }
    if (evento.type === 'ObservacaoClassificada') {
        try {
            await axios.post('https://localhost:7000/eventos', evento)
        } catch (e) {
        }
    }
    res.status(200).end()
})

app.get('/eventos', (req, res) => {
    res.status(200).json(eventos)
})

app.listen(
    process.env.PORT,
    () => console.log(`Barramento: ${process.env.PORT}`)
)