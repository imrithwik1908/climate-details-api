const mongoose = require('mongoose')

const climateDataSchema = new mongoose.Schema({
    climate: {
      type: String,
      enum: ['hot', 'humid', 'rainy', 'cold'],
      required: true,
    },
    areaCode: {
      type: Number,
      min: 100,
      max: 1000, 
      required: true,
    },
    temperature: {
      type: Number,
      required: true,
    },
    humidity: {
      type: Number,
      required: true,
    },
    chancesOfRain: {
      type: Number,
      required: true,
    },
});
  
module.exports = mongoose.model('ClimateData', climateDataSchema);
