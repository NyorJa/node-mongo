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

router.get('/accountNumber/:accountNumber', async (req, res) => {
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


router.get('/:id', async (req, res) => {
    // const id = new ObjectId(req.params.id);
    const id = req.params.id;
    try {
        const data = await Bank.findById(id.toString());
        if (!data) {
            res.status(404).json({ message: `${id} is not existing` });
        } else {
            res.json(data)
        }
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const data = await Bank.findByIdAndDelete(id);
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

    const bankPayload = new Bank({
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
            const dataToSave = await bankPayload.save();
            res.status(201).json(dataToSave)
        } else {
            res.status(400).json({ message: `${accountNumber} is already taken` });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const options = { new: true };

    try {
        const dataToFind = await Bank.findById(id);
        if (!dataToFind) {
            res.status(400).json({ message: `${id} is not existing` });
        } else {
            const result = await Bank.findByIdAndUpdate(dataToFind._id, updatedData, options);
            res.send(result);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
