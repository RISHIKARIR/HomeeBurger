import jwt from "jsonwebtoken";
import bcrypt, { hash } from "bcrypt";
import pool from "../db.js";
import transporter from "../config/mail.js";
import dotenv from "dotenv";


const signUp = async (req, res) => {
  let { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    email = email.toLowerCase();

    console.log(email, "email hai");

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const existinguser = user.rows[0];

    if (existinguser) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const encryptedpassword = await bcrypt.hash(password, 10);

    const refreshToken = jwt.sign(
      {
        email: email,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const accesstoken = jwt.sign(
      {
        email: email,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const hashedrefresh = await bcrypt.hash(refreshToken, 10);

    await pool.query(
      "INSERT into users (username,email,password,refresh_token) VALUES ($1,$2,$3,$4)",
      [username, email, encryptedpassword, hashedrefresh],
    );

    res.cookie("accesstoken", accesstoken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshtoken", refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User has been succesfully created",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//Login controller

const login = async (req, res) => {
  let { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });

    email = email.toLowerCase();

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const existinguser = user.rows[0];

    if (!existinguser) {
      return res.status(400).json({
        message: "User doesn't exist",
        success: false,
      });
    }

    const comparepass = await bcrypt.compare(password, existinguser.password);

    if (!comparepass)
      return res.status(401).json({
        message: "Incorrect password",
        success: false,
      });

    const refreshtoken = jwt.sign(
      {
        userId: existinguser.id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    const accesstoken = jwt.sign(
      {
        userId: existinguser.id,
      },
      process.env.JWT_ACCESS_SECRET,
      {
        expiresIn: "15m",
      },
    );

    const hashedrefresh = await bcrypt.hash(refreshtoken, 10);

    await pool.query("UPDATE users SET refresh_token = $1 where id = $2", [
      hashedrefresh,
      user.id,
    ]);

    res.cookie("accesstoken", accesstoken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "User logged in successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something Went wrong",
      success: false,
    });
  }
};

const generateAccessFromRefresh = async (req, res) => {
  const refreshtoken = req.cookies.refreshtoken;

  try {
    if (!refreshtoken) {
      return res.status(401).json({
        message: "Refresh Token expired ! Login again",
      });
    }

    const decodeRefresh = jwt.verify(
      refreshtoken,
      process.env.JWT_REFRESH_SECRET,
    );

    const User = await pool.query(`SELECT * FROM users WHERE id=$1`, [
      decodeRefresh.userId,
    ]);

    if (!User.rows.length === 0) {
      return res.status(401).json({
        message: "User not Found",
        success: false,
      });
    }


  

    const accesstoken = jwt.sign(
      { userId: User.rows[0].id },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" },
    );

    res.cookie("accesstoken",accesstoken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Access Token Regenerated Succesfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//forgot password

const ForgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      return res.status(400).json({
        message: "Email cannot be empty",
        success: false,
      });
    }

    const isExist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (isExist.rows.length > 0) {
      const otp = String(Math.floor(100000 + Math.random() * 900000));

      const hashedotp = await bcrypt.hash(otp, 10);

      await pool.query("DELETE FROM reset_password WHERE email = $1", [email]);

      await pool.query(
        "INSERT INTO reset_password (otp,email) values ($1,$2)",
        [hashedotp, email],
      );

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "OTP for password reset",
        text: `We received a request to reset your password. Your OTP is ${otp}. This OTP is valid for 5 minutes. If you did not request this, please ignore this email.`,
      });
    }

    return res.status(200).json({
      message: "If the account exists, an OTP has been sent.",
      success: true,
    });
  } catch (err) {
    console.log(err, "Error hai");

    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//verify otp

const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;

  try {
    if (!otp || !email) {
      return res.status(400).json({
        message: "Otp and email both are required",
        success: false,
      });
    }

    const isUserExist = await pool.query(
      "SELECT * FROM reset_password WHERE email=$1",
      [email],
    );

    if (otp.length > 6 || otp.length < 6) {
      return res.status(400).json({
        message: "Otp length should be equal to 6",
        success: false,
      });
    }

    if (isUserExist.rows.length === 0) {
      return res.status(400).json({
        message: "Invalid Otp request",
        success: false,
      });
    }

    const otpCreatedTime = new Date(isUserExist.rows[0].created_at).getTime();

    if (otpCreatedTime + 5 * 60 * 1000 < Date.now()) {
      return res.status(400).json({
        message: "Otp has been expired",
        success: false,
      });
    }

    const isOtpVerified = await bcrypt.compare(otp, isUserExist.rows[0].otp);

    if (!isOtpVerified)
      return res.status(401).json({
        message: "Otp is invalid",
        success: false,
      });

    await pool.query("DELETE  FROM reset_password WHERE email = $1", [email]);

    const resetToken = jwt.sign(
      { email: email },
      process.env.JWT_RESET_PASSWORD,
      { expiresIn: "5m" },
    );

    res.cookie("resetToken", resetToken, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 5 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Otp verified successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

//set New passWord

const setNewPassword = async (req, res) => {
  const { password } = req.body;
  const resetToken = req?.cookies?.resetToken;

  try {
    if (!password) {
      return res.status(400).json({
        message: "Password is required",
        success: false,
      });
    }

    if (!resetToken) {
      return res.status(401).json({
        message: "UnAuthorized Access",
        success: false,
      });
    }

    const verified = jwt.verify(resetToken, process.env.JWT_RESET_PASSWORD);

    const user = await pool.query("SELECT * FROM users WHERE email = $1", [
      verified.email,
    ]);

    const compareOldNew = await bcrypt.compare(password, user.rows[0].password);

    if (user.rows.length === 0) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (compareOldNew) {
      return res.status(400).json({
        message: "New Password cannot be same as Old Password",
        success: false,
      });
    }

    const hashedpassword = await bcrypt.hash(password, 10);

    await pool.query("UPDATE  users SET password =$1 WHERE email=$2", [
      hashedpassword,
      verified.email,
    ]);

    res.clearCookie("resetToken");

    return res.status(200).json({
      message: "Password reset Successfully",
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

const Logout = async (req, res) => {
  try {

      const refreshtoken = req.cookies.refreshtoken;


    if(!refreshtoken){
      return res.status(401).json({
        message : "No refresh token found",
        success : false
      })
    }




    const decodeAccess = jwt.verify(refreshtoken, process.env.JWT_REFRESH_SECRET);

   

    console.log(decodeAccess, "access token");

      await pool.query(
      `UPDATE users SET refresh_token=$1 WHERE id=$2`,
      [null, decodeAccess.userId],
    );

    
     res.clearCookie("accesstoken");
    res.clearCookie("refreshtoken");



    return res.status(200).json({
      message: "Logged Out successfully",
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Something went Wrong",
      success: false,
      error: err,
    });
  }
};

const profileRoute = async (req, res) => {
  console.log("profile route");
};

//Get user

const getUser = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User returned successfully",
      success: true,
      user: req.user,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export {
  signUp,
  login,
  ForgotPassword,
  generateAccessFromRefresh,
  verifyOtp,
  setNewPassword,
  profileRoute,
  getUser,
  Logout,
};
