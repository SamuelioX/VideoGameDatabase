var express = require('express');
var scraper = require('table-scraper');
var router = express.Router();
router.get('/', function (req, res) {
    var endpoint = '/table.html';
    scrape(endpoint, function (data) {
        res.json(data);
    });
});

function scrape(endpoint, callback) {
    scraper
            .get('http://localhost:3000/table.html')
            .then(function (tableData) {
                callback(tableData);
            });
}
module.exports = router;

