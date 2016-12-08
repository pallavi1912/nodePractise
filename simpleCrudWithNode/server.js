// define our base
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Bear = require('./app/models/bear');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
mongoose.connect('mongodb://pallavi:pallavi@jello.modulusmongo.net:27017/igohe4Jo');

var port = process.env.PORT || 8080;

var router = express.Router();

router.use(function(req, res, next) {
    console.log('something is happening');
    next(); //make sure when you go to next route you should not stop here
})

router.route('/bears')
    .post(function(req, res) {
        var bear = new Bear();
        bear.name = req.body.name;
        bear.age = req.body.age;

        bear.save(function(err) {
            if (err) {
                res.send(err);

            }
            res.json({ message: 'Bear created' });
        });
    })
    .get(function(req, res) {
        Bear.find(function(err, bears) {
            if (err) {
                res.send(err);
            }
            res.json(bears);
        })
    });

router.route('/bears/:bear_id')
    .get(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) {
                res.send(err);
            }
            res.json(bear);
        })
    })
    .put(function(req, res) {
        Bear.findById(req.params.bear_id, function(err, bear) {
            if (err) {
                res.send(err);
            }
            bear.name = req.body.name;
            bear.age = req.body.age;

            bear.save(function(err) {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Bear Updated!' })
            })
        })
    })
    .delete(function(req, res) {
        Bear.remove({ id: req.params.bear_id }, 
        	function(err, bear) {
               if(err){
               	res.send(err);
               }
               res.json({message: 'Bear Deleted!'})

        })
    })
app.use('/api', router);

app.listen(port);
console.log('part information ' + port);
