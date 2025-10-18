const mongoose = require('mongoose');

const hexColorRegex = /^#?[0-9A-Fa-f]{6}$/;

const BudgetItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required'],
    trim: true,
    minlength: [1, 'title cannot be empty']
  },
  value: {
    type: Number,
    required: [true, 'value is required'],
    min: [0, 'value must be >= 0']
  },
  color: {
    type: String,
    required: [true, 'color is required'],
    validate: {
      validator: (v) => hexColorRegex.test(v),
      message: (props) => `${props.value} is not a valid 6-digit hex color like #ED4523`
    },
    set: (v) => v && (v.startsWith('#') ? v : ('#' + v))
  }
}, { timestamps: true });

module.exports = mongoose.model('BudgetItem', BudgetItemSchema);