const { model, Schema } = require('mongoose');

const Question = new Schema({
  Text: {
    type: String,
    required: true 
  }, 
  Type: {
    type: String,
    required: true 
  }, 
  Options: {
    type: [String],
    required: false 
  }, 
});

const Response = new Schema({
  UUID: {
    type: String,
    required: true 
  }, 
  Name: {
    type: String,
    required: true 
  }, 
  Results: {
    type: [String],
    required: false 
  }, 
});

const Survey = new Schema({
  Title: {
    type: String,
    required: true
  },
  Description: {
    type: String,
    required: true
  },
  Creator: {
    type: String,
    required: true
  },
  Questions: {
    type: [Question],
    required: true
  },
  Results: {
    type: [Response],
    required: true
  }
});

module.exports = {
  Survey: model('Surveys', Survey)
};