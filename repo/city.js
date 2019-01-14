var express = require('express');
let routes = function (City) {
var cityRouter = express.Router();

    cityRouter.route('/')
        .get(function (req, res) {
            var query = {};
            if (req.query.cityName) {
                query.cityName = req.query.cityName;
            }
            City.find(query, function (err, city) {
                if (err) {
                    res.status(500).send("Error occur while trying to retrieve user in a db");
                }
                else {
                    res.status(200).send(city)
                }
            })
        })
        .post(function (req, res) {
            if (req.body.cityName !== undefined && req.body.countryName !== undefined && req.body.cityCode !== undefined && req.body.provinceName !== undefined
                && req.body.provinceCode !== undefined && req.body.countryCode !== undefined) {
                City.find({ cityCode: req.body.cityCode }, function (err, result) {
                    if (result.length > 0) {
                        res.status(417).send("same city code already exists")
                    }
                    else {
                        var city = new City(req.body);
                        city.save()
                        res.status(201).send(city);
                    }
                })
            }
            else {
                res.status(400).send("Invalid request body");
            }
        }
        )

    cityRouter.route('/:id')
        .get(function (req, res) {

            var id = req.params.id;

            City.findById(id, function (err, city) {
                if (err) {
                    res.status(500).send('unable to retrieve user in db');
                }
                else {
                    let result = city === null ? [] : city
                    res.status(200).send(result);
                }
            })
        }
        )
        .put(function (req, res) {
            if (req.body.cityName !== undefined || req.body.countryName !== undefined || req.body.cityCode !== undefined ||
                req.body.provinceName !== undefined || req.body.provinceCode !== undefined || req.body.countryCode !== undefined) {


                City.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, result) {

                    if (err) {
                        res.status(500).send('Error occurred');
                    }
                    else {

                        res.status(200).send(result);
                    }
                })
            }
            else {
                res.status(400).send("Invalid request body");
            }
        })
        .delete(function (req, res) {
            var id = req.params.id;
            City.findByIdAndRemove(id, function (err, city) {
                if (err) {
                    res.status(500);
                }
                else {
                    res.status(204).send();
                }
            })
        })

    return cityRouter;

}


module.exports = routes;



