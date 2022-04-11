const auth = require('../middleware/auth');
const express = require("express");
const router = express.Router();
const { validatePhotoresistor, Photoresistor } = require("../models/photoresistor");
const validateSecretKey = require("./checkSecretKey");
//POST: CREATE A NEW station
router.post("/", async (req, res) => {
  const checkSecretKey = await validateSecretKey(req.body);
  if (!checkSecretKey) res.status(401).json({ err: 'Not Authorized'});
  else {
    const error = await validatePhotoresistor(req.body);
    if (error.message) res.status(400).json({ err: error.message });
    else {
      let photoresistor = new Photoresistor({
        value: req.body.value
      });
      photoresistor
        .save()
        .then((photoresistor) => {
          res.send(photoresistor);
        })
        .catch((error) => {
          res.status(500).json({ err: "Something went wrong" });
        });
    }
  }
});
  
router.get("/", (req, res) => {
  Photoresistor.find().sort({ "_id" : -1 }).limit(1)
    .then((photoresistor) => res.send(photoresistor))
    .catch((error) => {
      res.status(500).send("Something went wrong");
    });
});

module.exports = router;