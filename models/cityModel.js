const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var CitySchema = new Schema({
    cityCode: { type: String,required:true },
    countryCode: { type: String,required:true },
    provinceCode: { type: String,required:true },
    cityName: { type: String,required:true },
    countryName: { type: String,required:true },
    provinceName: { type: String,required:true }
})

module.exports = mongoose.model('City', CitySchema);