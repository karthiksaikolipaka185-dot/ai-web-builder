const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  messages: [
    {
      role: {
        type: String,
        enum: ['user', 'ai'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  generatedCode: {
    type: String,
    default: '',
  },
  versions: [
    {
      code: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isPublic: {
    type: Boolean,
    default: false,
  },
  shareId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Project', projectSchema);
