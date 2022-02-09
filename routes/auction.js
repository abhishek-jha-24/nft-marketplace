var express = require("express");
const AuctionController = require("../src/auction/AuctionController");

var router = express.Router();

//router.post("/verifyUser", AuthController.verifyUser);

router.post("/Create", AuctionController.createAuction);
router.post("/Check/:id", AuctionController.IsauctionAvailable);
router.post("/CreateBid/:id", AuctionController.CreateBid);
router.post("/Restart/:id", AuctionController.Restart);
router.post("/History/:id", AuctionController.History);
module.exports = router;
