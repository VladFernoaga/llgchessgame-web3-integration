const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


const { LUCID_LANDS_CONTRACT_ADDRESS, BSCSCAN_API_KEY } = process.env;

router.get('/', function (req, res) {
    res.render('partials/play', {
        title: 'Chess Hub - Game',
        user: req.user,
        isPlayPage: true
    });
});

router.post('/', function (req, res) {
    var side = req.body.side;
    //var opponent = req.body.opponent; // playing against the machine in not implemented
    var token = randomString(20);
    res.redirect('/game/' + token + '/' + side);
});

router.get('/totalSupply', async (req, res) => {
    try {
        const response = await axios.get('https://api.bscscan.com/api', {
            params: {
                module: 'stats',
                action: 'tokensupply',
                contractaddress: LUCID_LANDS_CONTRACT_ADDRESS,
                apikey: BSCSCAN_API_KEY
            }
        });

        if (response.data.status === "1") {
            res.json({ totalSupply: response.data.result });
        } else {
            res.status(500).json({ error: response.data.message });
        }
    } catch (error) {
        console.error('Error getting total supply:', error);
        res.status(500).json({ error: 'An error occurred' });
    }


})

function randomString(length) {
    // var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
    var chars = '0123456789';

    var string = '';

    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        string += chars.substring(randomNumber, randomNumber + 1);
    }

    return string + Date.now();
}


module.exports = router;