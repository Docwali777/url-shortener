const mongoose = require('mongoose');
let { Schema } = mongoose
var urlSchema = new Schema({
  url: String,
  id: String
})

const URL = mongoose.model('URL', urlSchema)

module.exports = URL
