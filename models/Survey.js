const mongoose = require('mongoose');
const RecipientSchema = require('./Recipient.js');

const surveySchema = new mongoose.Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [RecipientSchema],
  yse: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model('survey', surveySchema);
