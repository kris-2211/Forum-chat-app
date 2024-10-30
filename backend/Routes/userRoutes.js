const express = require('express')
const { registerUser, authUser, allUsers ,setPassword,forgotPassword,verifyOTP} = require('../controllers/userController')
const { protect } = require('../Middlewares/authMiddleware')
const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers)
router.route('/login').post(authUser)
router.route('/setpassword').put(protect,setPassword);
router.route('/forgotpassword').post(forgotPassword);
router.route('/verifyotp').post(verifyOTP);
router.route('./resetpassword').post(setPassword);
module.exports=router




