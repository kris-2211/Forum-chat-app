import {User} from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import sendMail from "../utils/NodeMailer.js"


const registerUser = async (req, res) => {
  const { fullname, username, email, password } = req.body

  if (
    [fullname, username, email, password].some((field) => field?.trim() == "")
  ) {
    throw new ApiError(400, "All fields are required")
  }

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  }).select("-password")

  if (existingUser?.username == username) {
    //throw new ApiError(409,"User already exists");
    return res
      .status(409)
      .json({ message: "User with this username already exists" })
  }
  if (existingUser?.email == email) {
    //throw new ApiError(409,"User already exists");
    return res
      .status(409)
      .json({ message: "User with this email already exists" })
  }
  const otp = generateOTP()
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000) // OTP valid for 10 minute
  const newUser = await User.create({
    fullname,
    username,
    email,
    password,
    otp,
    otpExpires,
  })

  const createdUser = await User.findById(newUser._id).select("-password")
  if (!createdUser) {
    return res.status(409).json({ message: "Something went wrong" })
  }
  let mailOptions = {
    from: "forumchatapp@gmail.com",
    to: email,
    subject: "Account Registration",
    html: `<h1 style="color:">Thank you for joining us</h1>
           <p>We are excited to have you on our forum chat platform, ${fullname}!</p>
           <p>Your OTP for account verification is:</p>
           <h2>${otp}</h2>
           <p>This OTP is valid for 10 minutes.</p>`,
    text: `Thank you for joining us, ${fullname}!
           We are excited to have you on our forum chat platform.
           Your OTP for account verification is: ${otp}
           This OTP is valid for 10 minutes.`,
  };
  await sendMail(mailOptions);  
  res.status(200).json(
      new ApiResponse(
        200,
        "User created. Please verify your OTP.",
        createdUser,
      ),
    );
 
};


const loginUser = async (req, res) => {
  const { email, password } = req.body

  if ([email, password].some((field) => field?.trim() == "")) {
    //throw new ApiError(400,"All fields are required");
    return res.status(409).json({ message: "all fields are required" })
  }

  const user = await User.findOne({ email });
  if (!user) {
    //throw new ApiError(409,"User Not Found");
    return res.status(404).json({ message: "User not found" })
  } else {
    const isUserMatched = await user.isPasswordMatch(password)
    
    if (!isUserMatched) {
      //throw new ApiError(40,"Invalid credentials");
      return res.status(409).json({ message: "Invalid credentials" })
    }
    if(!user.isVerified)
    {
      return res.status(409).json({ message: "Not a verified user" })
    }
    //generate token
    const token = user.generateToken()

    return res
      .status(200)
      .json(new ApiResponse(200, "User logged in", user,token))
  }
};





const logOut = async (req, res) => {
  res.status(200).json(new ApiResponse(200, "User logged out"))
};




const generateOTP = () => {
  return Math.floor(Math.random() * 1000000).toString()
};




const regenerateOTP = async (req, res) => {
  const {fullname,email} = req.body
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(404).json({ message: "User not found." })
  }
  const otp = generateOTP();
  const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save()
  let mailOptions = {
    from: "forumchatapp@gmail.com",
    to: email,
    subject: "Account Registration",
    html: `<h1 style="color:">Thank you for joining us</h1>
           <p>We are excited to have you on our forum chat platform, ${fullname}!</p>
           <p>Your OTP for account verification is:</p>
           <h2>${otp}</h2>
           <p>This OTP is valid for 10 minutes.</p>`,
    text: `Thank you for joining us, ${fullname}!
           We are excited to have you on our forum chat platform.
           Your OTP for account verification is: ${otp}
           This OTP is valid for 10 minutes.`,
  }
  await sendMail(mailOptions);
  res.status(200).json({message:"otp re-sent successfully.."});
};



const verifyOTP = async (req, res) => {
  const { email, otp } = req.body
  const user = await User.findOne({ email })

  if (!user) {
    return res.status(400).json({ message: "Invalid email or OTP" })
  }

  if (user.otp !== otp || user.otpExpires < Date.now()) {
    return res.status(400).json({ message: "Invalid or expired OTP" })
  }

  user.otp = undefined
  user.otpExpires = undefined
  user.isVerified = true
  await user.save()

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "OTP verified successfully. Account is now active.",
        user,
      ),
    )
};


export { registerUser, loginUser, logOut, verifyOTP, regenerateOTP }
