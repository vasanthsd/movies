var express = require('express');
let routes = function (Distributor) {
    var distributorRouter = express.Router();

    distributorRouter.route('/')
        .get(function (req, res) {
            var query = {};
            if (req.query.name) {
                query.name = req.query.name;
            }
            Distributor.find(query, function (err, results) {
                if (err) {
                    res.status(500).send("Error occur while trying to retrieve user in a db");
                }
                else {
                    res.status(200).send(results)
                }
            })
        })
        .post(function (req, res) {
            if (req.body.name !== undefined) {
                Distributor.find({ name: req.name }, function (err, result) {
                    if (result.length > 0) {
                        res.status(417).send("same distributor name exists")
                    }
                    else {
                        var dist = new Distributor(req.body);
                        dist.save()
                        res.status(201).send(dist);
                    }
                })
            }
            else {
                res.status(400).send("Invalid request body");
            }
        }
        )

    distributorRouter.route('/:id')
        .get(function (req, res) {

            var id = req.params.id;

            Distributor.findById(id, function (err, distributor) {
                if (err) {
                    res.status(500).send('unable to retrieve user in db');
                }
                else {
                    let result = distributor === null ? [] : distributor
                    res.status(200).send(result);
                }
            })
        }
        )
        .put(function (req, res) {
            if (req.body.name !== undefined) {

                Distributor.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, result) {
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
            Distributor.findByIdAndRemove(id, function (err, dist) {
                if (err) {
                    res.status(500);
                }
                else {
                    res.status(204).send();
                }
            })
        })

    return distributorRouter;

}


module.exports = routes;



