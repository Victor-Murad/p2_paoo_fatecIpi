require('dotenv').config()
const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
const { PORT } = process.env
const baseConsolidada = {}

const funcoes = {
    LembreteCriado: (lembrete) => {
        baseConsolidada[lembrete.id] = lembrete
    },
    ObservacaoCriada: (observacao) => {
        const observacoes = baseConsolidada[observacao.lembreteId]['observacoes'] || []
        observacao.push(observacao)
        baseConsolidada[observacao.lembreteId]['observacoes'] = observacoes
    },
    observacaoAtualizada: (observacao) => {
        const observacoes = 
            baseConsolidada[observacao.lembreteId]['observacoes']
        const indice = observacoes.findIndex(o => o.id === observacao.id)
        observacoes[indice] = observacao
    }
}

app.get('/lembretes', (req, res) => {
    res.json(baseConsolidada)
})

app.post('/eventos', (req, res) => {
    try {
        const evento = req.body
        funcoes[evento.type](evento.payload)
    } catch (e) {}
    res.status(200).json(baseConsolidada)
})

app.listen(
    PORT,
    async () => {
        console.log(`Consulta: ${PORT}`)
        const eventos = await axios.get(`https://localhost:10000/eventos`)
        eventos.data.forEach((valor, indice, colecao) => {
            if(funcoes[valor.type]) {
                funcoes[valor.type](valor.payload)
            }
        })
    }
)