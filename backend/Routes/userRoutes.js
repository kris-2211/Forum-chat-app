const express = require('express')
const { registerUser, authUser, allUsers ,setPassword} = require('../controllers/userController')
const { protect } = require('../Middlewares/authMiddleware')
const router = express.Router()

router.route('/').post(registerUser).get(protect, allUsers)
router.route('/login').post(authUser)
router.route('/setpassword').put(protect,setPassword);
module.exports=router





