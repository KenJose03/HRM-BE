import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 20
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 20,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });



const userDetailsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fullName: {
        type: String,
        required: true,
    },
    residece: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    fullAddress: {
        type: String,
        required: true,
    },
    designation: {
        type: String,
        required: true,
    },
    empRole: {
        type: String,
        required: true,
    },
    empType: {
        type: String,
        required: true,
        enum: ["office", "remote", "hybrid", "part-time", "full-time"]
    },
    team: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    datOfJooining: {
        type: Date,
        required: true,
    },
    dateOfLeaving: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const socialLinksSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    fb_link: {
        type: String,
        required: true
    },
    x_link: {
        type: String,
        required: true
    },
    linkedin_link: {
        type: String,
        required: true
    },
}, { timestamps: true })

const contactSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    primaryContact: {
        type: String,
        required: true
    },
    alternateContact: {
        type: String,
        required: true
    },
    primaryEmergencyContact: {
        type: String,
        required: true
    },
    alternateEmergencyContact: {
        type: String,
        required: true
    }
}, { timestamps: true })

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    user_photo: {
        type: String,
        required: true
    },
    aadhaar_front: {
        type: String,
        required: true
    },
    aadhaar_back: {
        type: String,
        required: true
    },
    pan_card: {
        type: String,
        required: true
    },
})

const prevEmploymentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    empType: {
        type: String,
        required: true,
        enum: ["office", "remote", "hybrid", "part-time", "full-time"]
    },
    address: {
        type: String,
        required: true,
    },
    dateOfJoining: {
        type: Date,
        required: true,
    },
    dateOfLeaving: {
        type: Date,
        required: true,
    }
}, { timestamps: true })

const attendanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Present", "Leave"]
    },
    checkInTime: {
        type: Date,
        required: true
    },
    checkOutTime: {
        type: Date,
        required: false // Made optional so it is not required on check-in
    },
}, { timestamps: true })

const HolidaySchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)
export const UserDetails = mongoose.model("UserDetails", userDetailsSchema)
export const SocialLinks = mongoose.model("SocialLinks", socialLinksSchema)
export const Contact = mongoose.model("Contact", contactSchema)
export const Document = mongoose.model("Document", documentSchema)
export const PrevEmployment = mongoose.model("PrevEmployment", prevEmploymentSchema)
export const Attendance = mongoose.model("Attendance", attendanceSchema)
export const Holiday = mongoose.model("Holiday", HolidaySchema)





