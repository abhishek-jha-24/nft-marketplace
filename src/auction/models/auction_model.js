var mongoose = require("mongoose");



var auctions = new mongoose.Schema(
    {
        Author_account_address: {
            type: Array,
            required: true
        },
        Asset_id: {
            type: Array,
            default: null
        },
        min_Amount: {
            type: Number,
            required: true
        },
        max_Amount: {
            type: Number,
            required: true
        },
        current_Bid: {
            type: Number,
            default: 0
        },
        Successfull_Bidder: {
            type: Array,
            required: false
        },
        Start_Date: {
            type: Date,
            default: Date.now
        },
        End_Date: {
            type: Date,
            required: true
        }
});

// Virtual for user's full name
// UserSchema
// 	.virtual("fullName")
// 	.get(function () {
// 		return this.firstName + " " + this.lastName;
// 	});

module.exports = mongoose.model("auctions", auctions);
