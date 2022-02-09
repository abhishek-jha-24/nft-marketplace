var mongoose = require("mongoose");

var bidder = new mongoose.Schema(
    {
        Auction_id: {
            type: String,
            required: true
        },
        Buyer_account_address: {
            type: Array,
            required: true
        },
        Bid_Value: {
            type: Number,
            required: true
        }       
});

// Virtual for user's full name
// UserSchema
// 	.virtual("fullName")
// 	.get(function () {
// 		return this.firstName + " " + this.lastName;
// 	});

module.exports = mongoose.model("bidder", bidder);
