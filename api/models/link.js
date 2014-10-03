var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LinkSchema = new Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  modified: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User'},
  tags: [String]
});

module.exports = mongoose.model('Link', LinkSchema);