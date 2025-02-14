import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobileNo: {
    type: Number,
    required: true,
  },
  documents: [{
    documentType: {
     type: String,
    },
    documentId: {
      type: String,
    },
    documentURL: {
      type: String,
    },
    verificationStatus: {
      type: Boolean,
      default: false,
      
    }

  }],
  Role:{
    type: String,
    enum: ["User","Organization"]
  },
  highestQualification: {
    type: String,
    enum: ["10th","12th","UG","PG","PHD"]
  },
  gender:{
    type: [String],
    enum: ["Male","Female"]
  },
  disability:{
    type: Boolean,
    default: false,
  },
  caste: {
    type: [String],
    enum: ['General', 'ST', 'SC', 'OBC']
  },
  familyIncome: {
    type: Number,
  },
  DOB: {
    type: Date
  },
  bankDetails: [{
    accountNumber:{
      type: Number,
    },
    IFSC:{
      type: String,
    },
    bankName: {
      type: String,
    },
    branchName: {
      type: String,
    },
  }],
},{
  timestamps: true,
});
// UserSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) return next();

//   this.password = await bcrypt.hash(this.password, 10)
//   next()
// })

// UserSchema.methods.isPasswordCorrect = async function (password) {
//   return await bcrypt.compare(password, this.password)
// }

// UserSchema.methods.generateAccessToken = function () {
//   return jwt.sign(
//       {
//           _id: this._id,
//           email: this.email,
//           userName: this.userName
//       },
//       process.env.Access_Token_Secret,
//       {
//           expiresIn: process.env.Access_Token_Expiry
//       }
//   )
// }
// UserSchema.methods.generateRefreshToken = function () {
//   return jwt.sign(
//       {
//           _id: this._id,

//       },
//       process.env.Refresh_Token_Secret,
//       {
//           expiresIn: process.env.Refresh_Token_Expiry
//       }
//   )
// }

// export default
export default mongoose.model("User", userSchema);
