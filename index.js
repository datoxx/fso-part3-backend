const express = require('express')

const app = express()

//app.use(express.json())

let phoneBook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (req, res) => {
    res.json(phoneBook)
})

app.get('/info', (req, res) => {
    res.send(`<h1>Phonebook has info ${phoneBook.length} people </h1> <p>${new Date}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const phone = phoneBook.find(n => n.id === id)

    if(phone) {
        res.json(phone)
    } else {
        res.status(404).end()
    }

})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phoneBook = phoneBook.filter(n => n.id !== id)

    res.status(204).end()
  })


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
