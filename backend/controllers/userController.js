const asyncHandler = require('express-async-handler');
const generateToken = require('../config/generateToken');
const User = require('../models/userModel')
const bcryptjs = require('bcryptjs');
const { sendMail } = require('../services/NodeMailer');

const setPassword = async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      user.password = password;
      await user.save();
      res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
      res.status(500).json({ message: "Error updating password" });
  }
};

const verifyOTP = async (req, res) => {
  const { email, otp } = req.body;
  try {
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "Invalid email or OTP" });
      }

      // Check if OTP matches and is still valid
      if (user.otp !== otp || user.otpExpires < Date.now()) {
          return res.status(400).json({ message: "Invalid or expired OTP" });
      }

      // Clear the OTP fields after verification
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();

      res.status(200).json({ message: "OTP verified successfully. Proceed to reset your password." });
  } catch (error) {
      res.status(500).json({ message: "Error verifying OTP" });
  }
};
const forgotPassword = async (req, res) => {
  const OTP = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
  const { email } = req.body;

  try {
      const user = await User.findOne({ email });
      if (!user) {
        //console.log("usernot found..");
          return res.status(404).json({ message: "User not found" });
      }

      // Set OTP and expiration
      user.otp = OTP;
      user.otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes
      await user.save();

      // Set up email content for OTP
      let mailOptions = {
          from: process.env.MAIL_USER, // Use environment variable for the sender
          to: email,
          subject: "Password Reset Request",
          html: `<h1>Password Reset Request</h1>
                 <p>Hello ${email},</p>
                 <p>We received a request to reset your password. Please use the OTP below to proceed with resetting your password.</p>
                 <h2>${OTP}</h2>
                 <p>This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email or contact support.</p>
                 <p>Thank you,</p>
                 <p>The Forum Chat Team</p>`,
          text: `Hello ${email},
                 We received a request to reset your password. Please use the OTP below to proceed with resetting your password.
                 OTP: ${OTP}
                 This OTP is valid for 10 minutes. If you did not request a password reset, please ignore this email or contact support.
                 Thank you,
                 The Forum Chat Team`
      };

      // Send email with OTP
      await sendMail(mailOptions);
      res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
      console.error("Error in forgotPassword:", error); // Log the error for debugging
      res.status(500).json({ message: "Error sending OTP" });
  }
};



const allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});
const registerUser = asyncHandler(async (req,res) => {
  const { name, email, password, pic } = req.body;
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields')
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    const user = await User.create({
        name,email,password,pic
    })
    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token:generateToken(user._id)
        })
    }
    else {
        res.status(400)
        throw new Error('Failed to create user')
    }
}); 
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

module.exports = { registerUser, authUser, allUsers ,setPassword,forgotPassword,verifyOTP};
