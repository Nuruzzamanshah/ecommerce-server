const express  = require("express");
const router   = express.Router();
const {signup, signin,} = require("../controller/UsersController");

router.post('/signup', signup);
router.post('/signin', signin);


// router.post('/profile',requireSignin, (req, res) =>{
//     res.status(200).json({ user: 'profile' })
// });






module.exports = router;