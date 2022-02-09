//Importing ERC721 standards into our contracts
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

    //Creation of the contract
    contract assetContract is ERC721{
        
    //Declaration of the variables
    address owner;
    uint public assetCount = 0;
    uint256 minlength1=2;
    uint256 maxlength1=19;
    uint256 minlength2=2;
    uint256 maxlength2=29;
    string _AssetName;
    string _CreaterName;
    
    //Creation of the modifier
    modifier onlyOwner{
        
        //Require statement
        require(msg.sender == owner ,"Only Owner can create and deploy this Function");
        _;
    }
    
    //Creation of the constructor
    constructor() public ERC721("nft original","NFT"){
        owner = msg.sender;
    }
    
    //Creation of the enumeration
    enum State{Art,Music,Domain_Names,Sports,Virtual_Worlds,Trading_Cards,Collectibles,GIFs,Memes}
    State state;
    
    //Creation of the mapping
    mapping(uint => assetcreation) public AssetCreation;
    
    //Creation of the structure
    struct assetcreation{
        
        uint _id;
        string _AssetName;
        string _CreaterName;
        string _Description_of_the_asset;
        uint256 _Category_of_Asset;
    }
    
    //Defining of the function
    function assetCreate(string memory _AssetName, string memory _CreaterName,string memory _Description_of_the_asset,uint256 _Category_of_Asset) public onlyOwner returns(uint){
        
        //Conversion of one databyte to another databyte
        bytes memory assetName = bytes(_AssetName);
        bytes memory createrName = bytes(_CreaterName);
        
        //Defining of the mapping
        AssetCreation[assetCount]=assetcreation(assetCount,_AssetName,_CreaterName,_Description_of_the_asset,_Category_of_Asset);
        
        //Incrementing assetcount by 1
        assetCount += 1;
        
        //copying the data from one variable to another variable
        uint256 tokenId = assetCount;
         
        //Declaration of the variable and copying data from one datatype to another datatype
        uint256 assetTokenClassId = assetCount;
         
        //Deffining the mint function from ERC721
        _mint(msg.sender, assetTokenClassId);
        
        //Require statement for limitation of characters of the particular textarea
        require(minlength1 < assetName.length && assetName.length < maxlength1,"Details should be greater than 2 and less than 20 !!!");
        require(minlength2 < createrName.length && createrName.length < maxlength2,"Details should be greater than 2 and less than 20 !!!");
        
        //Require statement for user defined enumeration
        require(uint(State.Memes) >= _Category_of_Asset);
        
        //Storing the data in state from State
        state = State(_Category_of_Asset);
        
        return assetCount;
    }

    
    function burnToken(uint256 tokenId) public {
      
      //Burn the token     
      _burn(tokenId);
    }
}
