var express = require('express');
var router = express.Router();
const app = express();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.send(JSON.stringify({"status": 200, "error": null, "response": [{"hi": 11}]}));
});


module.exports = router;

