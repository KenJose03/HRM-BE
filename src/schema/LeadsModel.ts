import mongoose from "mongoose";

const leadsSchema = new mongoose.Schema({
    contact_person: {
        type: Number,
        required: true
    },
    contact_number: {
        type: Number,
        required: true
    },
    market_niche: {
        type: String,
        required: true,
    },
    service: {
        type: String,
        required: true
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Permanent", "Temporary", "Contract"]
    }
}, { timestamps: true })

export const Leads = mongoose.model("Leads", leadsSchema);