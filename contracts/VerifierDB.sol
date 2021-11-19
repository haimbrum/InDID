pragma solidity ^0.8.7;


import "@openzeppelin/contracts/access/Ownable.sol";


contract VerifiedDB is Ownable { 

    mapping (address => string) private _verifiedEntity; // Todo: use decentrlized DB instead (like FileCoin / IPFS) instead of savig it locally

    constructor() {}

    function addVerifiedEntity(address _address, string memory _entityData) public onlyOwner {
        _verifiedEntity[_address] = _entityData;
    }

    function getVerifiedEntity(address _address) public view returns (string memory) {
        return _verifiedEntity[_address];
    }
}