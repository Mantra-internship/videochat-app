const mongoose = require("mongoose");

const astrologerInfoSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        description: {
            type: String
        },
        languages: [String],
        specialities: [String],
        // In years
        experience: {
            type: Number,
            default: 0,
        },
        sessionsConducted: {
            type: Number,
            default: 0,
        },
        rating: {
            type: Number,
            default: 0,
        },
    },{
        timestamps: true,
    }
)

module.exports = mongoose.model("AstrologerInfo", astrologerInfoSchema);