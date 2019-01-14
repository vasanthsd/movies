const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let GeographyModel = new Schema({
    _id : false,
    'cityCode': [{ type: String, min: 2,
        max: 24 }],
    'provinceCode': [{ type: String, min: 2,
        max: 24 }],
    'countryCode': [{ type: String, min: 2,
        max: 24 }]
})

let Rights = new Schema({
    _id : false,
    'included': { type: GeographyModel,  default: {} },
    'excluded': { type: GeographyModel, default: {} }
})

let DistributorSchema = new Schema({
    name: { type: String, required: true },
    rights: { type: Rights, required: true }
})

module.exports = mongoose.model('Distributor', DistributorSchema);