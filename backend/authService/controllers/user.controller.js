
const User = require("../models/user.model").User;
const Auth = require("../models/authentication.model").Auth;
const Authlog = require("../models/authlog.model").Authlog;
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");

const JWT = require("../utils/jwtToken");

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const sendingEmailThrough = process.env.SENDING_EMAIL_THROUGH;
const ses = new AWS.SES({ region: process.env.AWS_REGION });

const sendOtpEmail = async (to, otp) => {
  const params = {
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your OTP is: ${otp}`,
        },
      },
      Subject: {
        Data: "OTP Verification",
      },
    },
    Source: sendingEmailThrough,
  };

  try {
    await ses.sendEmail(params).promise();
    console.log(`OTP email sent successfully to ${to}`);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};


const registerUser = async (req, res) => {
  try {
    const { name, email, phoneNo } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const newUser = new User({
      name,
      email,
      phoneNo
    });

    await newUser.save();

    const newAuth = new Auth({
      userId: newUser._id,
      otp: Math.floor(100000 + Math.random() * 900000),
      isVerified: false,
      attempt: 0,
    });

    await newAuth.save();

    const newAuthlog = new Authlog({
      userId: newUser._id,
      ip: req.ip,
      status: true,
    });

    await newAuthlog.save();
    await sendOtpEmail(newUser.email, newAuth.otp);

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const formattedOTP = parseInt(otp.join(""));

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(formattedOTP);
    const auth = await Auth.findOne({ userId: user._id });

    if (auth && auth.otp === formattedOTP && !auth.isVerified) {
      user.accountStatus = "active";
      auth.isVerified = true;
      await user.save();
      token = JWT.generateToken(user._id, user.userType);
      return res.status(200).json({
        message: "OTP verified successfully.",
        jwtToken: token,
      });
    } else {
      return res
        .status(401)
        .json({ message: "Invalid OTP or OTP already verified" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateAuthlog = async (userId, ip, status) => {
  const newAuthlog = new Authlog({
    userId,
    ip,
    status,
  });

  await newAuthlog.save();
};

const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let tmpOtp = Math.floor(100000 + Math.random() * 900000);

    const updatedAuth = await Auth.findOneAndUpdate(
      { userId: user._id },
      {
        otp: tmpOtp,
        isVerified: false,
      }
    );
    if (!updatedAuth) {
      const newAuth = new Auth({
        userId: user._id,
        otp: Math.floor(100000 + Math.random() * 900000),
        isVerified: false,
        attempt: 0,
      });
      await newAuth.save();
    }

    await updateAuthlog(user._id, req.ip, true);
    await sendOtpEmail(user.email, tmpOtp);

    return res
      .status(200)
      .json({ message: "OTP Sent. Verify OTP. Login Again." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserDataById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const updateUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    const { name, email, phoneNo, programId, batchId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNo = phoneNo || user.phoneNo;
    user.programId = programId || user.programId;
    user.batchId = [...user.batchId, batchId] || user.batchId;

    await user.save();

    res.status(200).json({ message: "User data updated successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  registerUser,
  verifyOTP,
  loginUser,
  getAllUser,
  getUserDataById,
  updateUserData,
  deleteUserById,
};
