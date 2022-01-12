const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
  }

const password = process.argv[2]

const url =
  `mongodb+srv://fso-part3:${password}@fullstack.sqve7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  mongoose.connect(url)
  .then(res => console.log('connected to db'))
  .catch(err => console.log(err))

  const notebook = new mongoose.Schema({
      name: String,
      number: Number
  });

  const PhoneNote = mongoose.model('PhoneNote', notebook);

  const numberBook = new PhoneNote({
      name: 'gia',
      number: 111
  })

  numberBook.save()
  .then(res => {
      console.log('note saved')
      mongoose.connection.close()
  })
  .catch(err => console.log(err));

  PhoneNote.find({})
  .then(res =>{
      res.forEach(n => {
          console.log(n.name, n.number)
      })
      mongoose.connection.close()
  })
  .catch(err => console.log(err))
