const express = require('express');
const Bank = require('../models/model');

const router = express.Router();

module.exports = router;

router.get('/', async (req, res) => {
    try {
        const data = await Bank.find();
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.get('/:accountNumber', async (req, res) => {
    const accountNumber = req.params.accountNumber;
    try {
        const data = await Bank.findOne({
            accountNumber: accountNumber
        });
        if (!data) {
            res.status(404).json({ message: `${accountNumber} is not existing` });
        } else {
            res.json(data)
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:accountNumber', async (req, res) => {
    const accountNumber = req.params.accountNumber;
    try {
        const data = await Bank.findOne({
            accountNumber: accountNumber
        });
        if (!data) {
            res.status(404).json({ message: `${accountNumber} is not existing` });
        } else {
            const dataToDelete = await Bank.findByIdAndDelete(data._id);
            res.send(`Document with ${dataToDelete.accountNumber} has been deleted..`)
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/', async (req, res) => {
    const accountNumber = req.body.accountNumber;

    const data = new Bank({
        accountNumber: accountNumber,
        trust: req.body.trust,
        transactionFee: req.body.transactionFee,
        name: req.body.name
    });

    try {
        const dataToFind = await Bank.findOne({
            accountNumber: accountNumber
        });
        if (!dataToFind) {
            const dataToSave = await data.save();
            res.status(201).json(dataToSave)
        } else {
            res.status(400).json({ message: `${accountNumber} is already taken` });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/', async (req, res) => {
    const accountNumber = req.body.accountNumber;
    const updatedData = req.body;
    const options = { new: true };

    try {
        const dataToFind = await Bank.findOne({
            accountNumber: accountNumber
        });
        if (!dataToFind) {
            res.status(400).json({ message: `${accountNumber} is not existing` });
        } else {
            const result = await Bank.findByIdAndUpdate(dataToFind._id, updatedData, options);
            res.send(result);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
