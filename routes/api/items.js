var express = require('express');
var router = express.Router();

// Item Model
var Item = require('../../models/Item');

// list all: GET api/items
router.get('/api/items', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

// get 1: GET api/item/:id
router.get('/api/item/:id', (req, res) => {
    Item.findById(req.params.id)
    .then(item => res.json(item));
});

// post edit 1: POST api/item/:id
router.post('/api/item/:id', (req, res) => {
    Item.findOneAndUpdate(
        { _id: req.params.id },
        { $set: {
                name: req.body.name
                // date: Date.now()
            }
        },
        { new: true },
        function(err, doc) { if(err) console.log(err); }
    )
    .then(item => res.json(item));
});

// create new 1: POST api/item
router.post('/api/item', (req, res) => {
    var newItem = new Item({
        name: req.body.name,
        date: req.body.date
    });
    newItem.save().then(item => res.json(item));
});

// delete 1: DELETE api/item/:id
router.delete('/api/item/:id', (req, res) => {
    Item.findById(req.params.id).
    then(item => item.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: err }));
});

module.exports = router;