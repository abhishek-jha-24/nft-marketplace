var mongoose = require("mongoose");

var seller = new mongoose.Schema(
    {
        Auction_item_id: {
            type: String,
            required: true
        },
        Author_account_address: {
            type: Array,
            required: true
        }     
});

// Virtual for user's full name
// UserSchema
// 	.virtual("fullName")
// 	.get(function () {
// 		return this.firstName + " " + this.lastName;
// 	});

module.exports = mongoose.model("seller", seller);
