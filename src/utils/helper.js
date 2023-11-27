const bcrypt = require('bcryptjs')


const hashPass = (password) => {
 const salt = bcrypt.genSaltSync(10)
 return bcrypt.hashSync(password, 10)
}

const comparePass = (rawPass,hashPass) => {
  
 return bcrypt.compareSync(rawPass, hashPass);
}

module.exports = {
 hashPass,
 comparePass,
}

