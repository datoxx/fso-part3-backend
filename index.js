const express = require('express');
const morgan = require('morgan');

const app = express()

app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));

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

const generateId = () => {
    const id = Math.floor(Math.random() * 10000000);
    return id;
  }


  app.post('/api/persons', (req, res) => {
    const body = req.body
    const sameName = phoneBook.some(n => n.name === body.name)

    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        })
    } else if(sameName) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const phone = {
        id : generateId(),
        name: body.name,
        number: body.number
    }

    phoneBook = phoneBook.concat(phone)

    res.json(phone)
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
