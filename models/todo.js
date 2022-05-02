const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ToDo = new Schema({
  author: { type: String, default: 'Anonimo', require},
  name: { type: String, require},
  description: { type: String, require},
  date: { type: Date, default: Date.now },
  state: { type: Boolean, default: false },
  buff: Buffer
});

module.exports = mongoose.model('ToDo', ToDo);