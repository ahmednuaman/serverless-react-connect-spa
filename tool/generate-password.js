const { argv } = require('yargs')
const bcrypt = require('bcrypt')
const saltRounds = 10

bcrypt.hash(argv._[0], saltRounds, (error, password) => console.log(error, password))
