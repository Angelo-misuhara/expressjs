
//importing the mongoose
const mongoose = require('mongoose')

//creating a schema(its like a defining the columns of table)
const discordUserShema = new mongoose.Schema({
 disordID: {
  type:mongoose.SchemaTypes.String,
  required:true,
 },
 createdAt: {
  type: mongoose.SchemaTypes.Date,
  required: true,
  default: new Date(),
 }
});

//exporting the discord_user(discordUserShema)
// the 'user' is for calling the schema
module.exports = mongoose.model('discord_user',discordUserShema)