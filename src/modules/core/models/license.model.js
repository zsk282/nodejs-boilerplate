const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const licenseSchema = mongoose.Schema(
  {
    module_id: {
      type: String,
      required: true,
      trim: true,
    },
    module_name: {
      type: String,
      required: true,
      trim: true,
    },
    module_version: {
      type: String,
      required: false,
      unique: true,
      trim: true,
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
licenseSchema.plugin(toJSON);
licenseSchema.plugin(paginate);

/**
 * @typedef License
 */
const License = mongoose.model('License', licenseSchema);

module.exports = License;
