const { default: User } = require("@/models/User");
import bcrypt from "bcrypt"
import { randomBytes } from "crypto";
import { mongoConnect } from "../mongoose";


const validatePassword = (password) => {
  if (!password) {
    return { isValid: false, message: "Password is required" };
  }
  if (password.length < 8) {
    return { isValid: false, message: "Password must be at least 8 characters" };
  }
  if (password.length > 128) {
    return { isValid: false, message: "Password must be less than 128 characters" };
  }
  
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  const missingRequirements = [];
  if (!hasUpperCase) missingRequirements.push("uppercase letter");
  if (!hasLowerCase) missingRequirements.push("lowercase letter");
  if (!hasNumbers) missingRequirements.push("number");
  if (!hasSpecialChar) missingRequirements.push("special character");
  
  if (missingRequirements.length > 0) {
    return { 
      isValid: false, 
      message: `Password must include: ${missingRequirements.join(", ")}` 
    };
  }
  
  return { isValid: true, message: "" };
};

const validateEmail = (email) => {
  if (!email) {
    return { isValid: false, message: "Email is required" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, message: "Please enter a valid email address" };
  }
  return { isValid: true, message: "" };
};

const validateUsername = (username) => {
  if (!username) {
    return { isValid: false, message: "Username is required" };
  }
  if (username.length < 3) {
    return { isValid: false, message: "Username must be at least 3 characters" };
  }
  if (username.length > 30) {
    return { isValid: false, message: "Username must be less than 30 characters" };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, message: "Username can only contain letters, numbers, and underscore" };
  }
  return { isValid: true, message: "" };
};


export const userHelper = {
    userSignin: (user)=> {
        return new Promise( async (resolve, reject) => {
            await mongoConnect();
            let existingUser = await User.findOne({ Email: user.email });
            
            // new account
            if (!existingUser && user.username) {
                const validation = userHelper.validateSignupData(user);
                if (!validation.isValid) {
                    reject({ message: validation.message });
                    return;
                }
                let hashedPassword = await bcrypt.hash(user.password,10);
                let verificationId = randomBytes(16).toString("base64")
                console.log("vid",verificationId)
                let data = await User.create({username: user.username, email: user.email, password: hashedPassword, verificationId});
                resolve({ name:data.username, email: data.email, _id:data._id})
            }

            // login to existing account
            else if(existingUser && !user.username && existingUser.password){
                if (await bcrypt.compare(user.password,existingUser.password)){
                    resolve({username: existingUser.username, _id:existingUser._id, email:existingUser.email})
                }
                else{
                    console.log("wrong Password")
                    reject({message:"signin failed, wrong credentials"})
                }
            }
            else if(existingUser && !existingUser.Password){
                reject({message:"signin failed, user not verified"})
            }
            else{
                reject({message:"signin failed, user already exist"})
            }
        })
    },
    validateSignupData: (user) => {
        const emailValidation = validateEmail(user.email);
        if (!emailValidation.isValid) return emailValidation;
        const passwordValidation = validatePassword(user.password);
        if (!passwordValidation.isValid) return passwordValidation;
        
        const usernameValidation = validateUsername(user.username);
        if (!usernameValidation.isValid) return usernameValidation;
        
        return { isValid: true, message: "" };
    },
    
}