const auction = require("./models/auction_model");
const bidder = require("./models/bidder");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("../user/helpers/apiResponse");
var mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const Web3 = require('web3');
const abi2=require('../build/contracts/auctionContract').abi2;
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { token } = require("morgan");
const address1='0xccdb17b8eF68ffFdbCA4bf4AB6B765e41d61733A';
const address2='0x8DADF9aCaBEe5595a55eaF41c074d8e60A1bC3f8';
const address3='0xdE2A79e1868CC11AFc8b210180398fC81B2008C7';
const privateKey1="c244b6e8ae351e71fa353515c55a4e0be82fb5bf7186c18419f89421805f74b7";
var _beneficiary='0xccdb17b8eF68ffFdbCA4bf4AB6B765e41d61733A';
var _assetContract='0xf075a6f1e11BF42b961b4976618E78a7872815e4';
var _biddingTime=60;
var _tokenId=106;

exports.createAuction = [
	function (req, res) {
		try {

			const init = async() => {
				const provider = new  HDWalletProvider(
				  privateKey1,
				  'https://ropsten.infura.io/v3/8d012749a8ae4ca1a238b25053109ffe'
				);
				const web3 = new Web3(provider);
				const accounts= await web3.eth.getAccounts();
				// contractInstance = new web3.eth.Contract(bytecode);
				// var string = JSON.stringify(bytecode);
				// let deploy_contract=new web3.eth.Contract(JSON.parse(string));
				let contract = new web3.eth.Contract(abi2);
                const networkId = await web3.eth.net.getId();
                const receipt = await contract.deploy({data:'0x608060405260006003553480156200001657600080fd5b50604051620013563803806200135683398181016040528101906200003c91906200016f565b336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555083600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550426004819055508142620000d29190620001db565b60058190555082600660006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555080600781905550505050506200031b565b6000815190506200013b81620002cd565b92915050565b6000815190506200015281620002e7565b92915050565b600081519050620001698162000301565b92915050565b600080600080608085870312156200018657600080fd5b600062000196878288016200012a565b9450506020620001a98782880162000141565b9350506040620001bc8782880162000158565b9250506060620001cf8782880162000158565b91505092959194509250565b6000620001e88262000294565b9150620001f58362000294565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156200022d576200022c6200029e565b5b828201905092915050565b6000620002458262000274565b9050919050565b6000620002598262000274565b9050919050565b60006200026d8262000238565b9050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b620002d8816200024c565b8114620002e457600080fd5b50565b620002f28162000260565b8114620002fe57600080fd5b50565b6200030c8162000294565b81146200031857600080fd5b50565b61102b806200032b6000396000f3fe60806040526004361061007b5760003560e01c806391f901571161004e57806391f901571461010b578063b9d1fb6114610136578063d57bde791461014d578063eb54f9ec146101785761007b565b80631998aeef1461008057806338af3eed1461008a5780633ccfd60b146100b55780634b449cba146100e0575b600080fd5b6100886101a3565b005b34801561009657600080fd5b5061009f610333565b6040516100ac9190610af1565b60405180910390f35b3480156100c157600080fd5b506100ca610359565b6040516100d79190610b6c565b60405180910390f35b3480156100ec57600080fd5b506100f5610595565b6040516101029190610c67565b60405180910390f35b34801561011757600080fd5b5061012061059b565b60405161012d9190610ad6565b60405180910390f35b34801561014257600080fd5b5061014b6105c1565b005b34801561015957600080fd5b50610162610961565b60405161016f9190610c67565b60405180910390f35b34801561018457600080fd5b5061018d610967565b60405161019a9190610c67565b60405180910390f35b60035434116101e7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101de90610be7565b60405180910390fd5b600554421061022b576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161022290610c07565b60405180910390fd5b6000600354146102b05760035460086000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546102a89190610c9e565b925050819055505b33600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550346003819055507ff4757a49b326036464bec6fe419a4ae38c8a02ce3e68bf0809674f6aab8ad3003334604051610329929190610b43565b60405180910390a1565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600080600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060055442116103e2576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103d990610bc7565b60405180910390fd5b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161415610473576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161046a90610c27565b60405180910390fd5b600081116104b6576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016104ad90610ba7565b60405180910390fd5b600081111561058c576000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f1935050505061058b5780600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055506000915050610592565b5b60019150505b90565b60055481565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff161461064f576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161064690610c47565b60405180910390fd5b6000600860003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905060055442116106d7576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106ce90610b87565b60405180910390fd5b6000600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1660405161071e90610ac1565b6000604051808303816000865af19150503d806000811461075b576040519150601f19603f3d011682016040523d82523d6000602084013e610760565b606091505b50509050801561082457600660009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166323b872dd33600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166007546040518463ffffffff1660e01b81526004016107ed93929190610b0c565b600060405180830381600087803b15801561080757600080fd5b505af115801561081b573d6000803e3d6000fd5b5050505061088b565b8160086000600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055505b8061089557600080fd5b7fdaec4582d5d9595688c8c98545fdd1c696d41c6aeaeb636737e84ed2f5c00eda600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff166003546040516108ea929190610b43565b60405180910390a1600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166108fc6003549081150290604051600060405180830381858888f1935050505015801561095c573d6000803e3d6000fd5b505050565b60035481565b60045481565b61097681610d06565b82525050565b61098581610cf4565b82525050565b61099481610d18565b82525050565b60006109a7602183610c8d565b91506109b282610d7d565b604082019050919050565b60006109ca603583610c8d565b91506109d582610dcc565b604082019050919050565b60006109ed605e83610c8d565b91506109f882610e1b565b606082019050919050565b6000610a10604583610c8d565b9150610a1b82610e90565b606082019050919050565b6000610a33600083610c82565b9150610a3e82610f05565b600082019050919050565b6000610a56603983610c8d565b9150610a6182610f08565b604082019050919050565b6000610a79603083610c8d565b9150610a8482610f57565b604082019050919050565b6000610a9c602e83610c8d565b9150610aa782610fa6565b604082019050919050565b610abb81610d44565b82525050565b6000610acc82610a26565b9150819050919050565b6000602082019050610aeb600083018461097c565b92915050565b6000602082019050610b06600083018461096d565b92915050565b6000606082019050610b21600083018661097c565b610b2e602083018561097c565b610b3b6040830184610ab2565b949350505050565b6000604082019050610b58600083018561097c565b610b656020830184610ab2565b9392505050565b6000602082019050610b81600083018461098b565b92915050565b60006020820190508181036000830152610ba08161099a565b9050919050565b60006020820190508181036000830152610bc0816109bd565b9050919050565b60006020820190508181036000830152610be0816109e0565b9050919050565b60006020820190508181036000830152610c0081610a03565b9050919050565b60006020820190508181036000830152610c2081610a49565b9050919050565b60006020820190508181036000830152610c4081610a6c565b9050919050565b60006020820190508181036000830152610c6081610a8f565b9050919050565b6000602082019050610c7c6000830184610ab2565b92915050565b600081905092915050565b600082825260208201905092915050565b6000610ca982610d44565b9150610cb483610d44565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115610ce957610ce8610d4e565b5b828201905092915050565b6000610cff82610d24565b9050919050565b6000610d1182610d24565b9050919050565b60008115159050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f41756374696f6e20686173206e6f74206265656e20656e64656420796574212160008201527f2100000000000000000000000000000000000000000000000000000000000000602082015250565b7f4f6e6c792056616c696420426964646572732063616e2077697468647261772060008201527f74686569722042696464696e6720616d6f756e74730000000000000000000000602082015250565b7f41756374696f6e20686173206e6f74206265656e20656e64656420796574212160008201527f2120596f752063616e6e6f7420776974686472617720796f757220626964646960208201527f6e6720616d6f756e7473206265666f72652061756374696f6e20656e64730000604082015250565b7f546865726520697320616c72656164792061206869676865722062696420212160008201527f2120506c656173652062696420686967686572207468616e2070726569766f7560208201527f7320626964000000000000000000000000000000000000000000000000000000604082015250565b50565b7f41756374696f6e20686173206265656e20656e6465642121214279652042796560008201527f2068617665206120676f6f64206461792061686561642e2e2e00000000000000602082015250565b7f48696768657374204269646465722063616e277420776974686472617720697460008201527f732062696464696e6720616d6f756e7400000000000000000000000000000000602082015250565b7f4f6e6c79204f776e65722063616e2063726561746520616e64206465706c6f7960008201527f20746869732046756e6374696f6e00000000000000000000000000000000000060208201525056fea264697066735822122090ea58d1657999d737d5b5fac8b7a58ebce6e56f65587c9ea6893a50943ec59764736f6c63430008010033',
					arguments:[_beneficiary,_assetContract,_biddingTime,_tokenId]}).send({from:address1,gas: 1500000,
						gasPrice: '30000000000'});
			        console.log(await receipt);
					return receipt;
				};
				init();

			console.log(req.body.Author_account_address)
			  var item={
			    Author_account_address: req.body.Author_account_address,
			    Asset_id: req.body.Asset_id,
			    min_Amount: req.body.min_Amount,
			    max_Amount: req.body.max_Amount,
			    End_Date: req.body.End_Date
			  };
			 
			  if (!item.Author_account_address || !item.min_Amount || !item.max_Amount|| !item.End_Date) {
			    return apiResponse.successResponseWithData(res, "Enter all The fields", item);
			  } else if (item.min_Amount >= item.max_Amount){
			  	return apiResponse.successResponseWithData(res, "Min Bid cannot be >= Max bid", item);

			  }
			  else {
			  	const newAuction = new auction(item);
			        newAuction
			          .save()
			            .then(user => {
			               return apiResponse.successResponseWithData(res, "Auction creation success", user); 
			              })
			              .catch(err => console.log(err));
			    
			  }			
		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.IsauctionAvailable = [
	function (req, res) {
		try {
			const Auction_id = req.params.id;

			auction.findOne({_id: Auction_id}).then((user)=>{
				if (user){
					const current_date = Date.now()
					const end_time = user.End_Date
					if (current_date <= end_time){
						return apiResponse.successResponseWithData(res, "Not yet ended", user);

					} else {
						return apiResponse.successResponseWithData(res, "Auction ended", user);
					}
					
				} else  {
					return apiResponse.successResponseWithData(res, "Auction Not found");
				}
			});

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];

exports.Restart = [
	function (req, res) {
		try {
			const Auction_id = req.params.id;
			const Author_account_address = req.body.Author_account_address;
			console.log(Author_account_address)
			auction.findOne({_id: Auction_id}).then((user)=>{
				if(Author_account_address.localeCompare(user.Author_account_address) == 0){
					if (user){
						const current_date = Date.now()
						const end_time = user.End_Date
						if (current_date <= end_time){
							return apiResponse.successResponseWithData(res, "Auction not yet Not yet ended", user);

						} else {
							user.min_Amount = req.body.min_Amount
							user.max_Amount = req.body.max_Amount
							user.End_Date = req.body.End_Date
							user
							 .save()
							   .then(created => {
							   	return apiResponse.successResponseWithData(res, "Auction updated", created);
							   })
							   .catch(err => console.log(err));
						}
						
					} else  {
						return apiResponse.successResponseWithData(res, "Auction Not found");
					}	
				} else{
					return apiResponse.successResponseWithData(res, "Permission denied, You are not the author");
				}
				
			});

		} catch (err) {
			//throw error in json response with status 500. 
			return apiResponse.ErrorResponse(res, err);
		}
	}
];


exports.CreateBid = [
    function (req, res) {
        try {

			const init = async() => {
				const provider = new  HDWalletProvider(
				  privateKey1,
				  'https://ropsten.infura.io/v3/8d012749a8ae4ca1a238b25053109ffe'
				);
				const web3 = new Web3(provider);
				// contractInstance = new web3.eth.Contract(bytecode);
				// var string = JSON.stringify(bytecode);
				// let deploy_contract=new web3.eth.Contract(JSON.parse(string));
				let contract = new web3.eth.Contract(abi2,address3);

			    var bidAuctionReceipt=await contract.methods.bid().send({from: address1, value: req.body.Bid_Value});
			    console.log('bid value: ', req.body.Bid_Value);
				console.log(bidAuctionReceipt);
				return (bidAuctionReceipt);
				}; 
				init();
				
        	console.log("...")
            var item={
                Buyer_account_address: req.body.Buyer_account_address,
                Bid_Value: req.body.Bid_Value,
                Auction_id: req.params.id
        
              };

            auction.findOne({_id: item.Auction_id}).then((user)=>{
                if (user){
                    if (item.Bid_Value < user.min_Amount){
                        return apiResponse.successResponseWithData(res, "Sorry cant bid at value lower than min amount");
                    }
                    const newbidder = new bidder(item);
                        newbidder
                          .save()
                            .then(bidd => {
                                console.log("user_bid created")
                            })
                            .catch(err => console.log(err));

                    if(item.Bid_Value < user.current_Bid){
                        return apiResponse.successResponseWithData(res, "A higher bid exists"); 
                    }else if(item.Bid_Value >= user.max_Amount) {
                        user.current_Bid = item.Bid_Value
                        user.Successfull_Bidder = item.Buyer_account_address
                        user.End_Date = Date.now()
                        user
                          .save()
                            .then(created => {
                                return apiResponse.successResponseWithData(res, "You won the bid", created);
                            })
                        
                    }
                     else{
                        user.current_Bid = item.Bid_Value
                        user.Successfull_Bidder = item.Buyer_account_address
                        user
                          .save()
                            .then(created => {
                                return apiResponse.successResponseWithData(res, "You are leading the auction", created);
                            })
                    }
                    
                } else  {
                    return apiResponse.successResponseWithData(res, "Auction Not found");
                }
            });

        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];


exports.History = [
    function (req, res) {
        try {

            auction.findOne({_id: req.params.id}).then((auct)=>{
                if (auct) {
                	bidder.find({Auction_id: req.params.id}).then((users)=> {
                		return apiResponse.successResponseWithData(res, "The Data", {auction: auct, users: users});
                	});
                } else {
                	return apiResponse.successResponseWithData(res, "Auction Not found");
                }
            });

        } catch (err) {
            //throw error in json response with status 500. 
            return apiResponse.ErrorResponse(res, err);
        }
    }
];