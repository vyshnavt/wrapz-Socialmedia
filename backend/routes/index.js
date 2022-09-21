var express = require('express');
var router = express.Router();
const userRoutinghealper =require("../controllers/userRoutinghealpers")
const middleware = require('../controllers/middleware')

/* GET home page. */

router.post('/', userRoutinghealper.userlogin);
router.post('/normalSignup', userRoutinghealper.normalSignup);
router.get('/profile', middleware.jwtautenticate,userRoutinghealper.userProfile)
router.post('/businessmalSignup');
router.get('/verification',userRoutinghealper.userVerification)
module.exports = router;
