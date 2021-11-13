pragma solidity ^0.8.7;


import "@openzeppelin/contracts/access/Ownable.sol";


struct VerifiedEntity { // temporary data structure to hold data passed voting
    string data;
    uint confidence;
}

contract VerifiedDB is Ownable { 

    mapping (uint256 => VerifiedEntity) private _verifiedEntity; // Todo: use decentrlized DB instead (like FileCoin / IPFS) instead of savig it locally

    constructor() {}

    function addVerifiedEntity(uint256 _hash, VerifiedEntity calldata _newEntity) public onlyOwner {
        VerifiedEntity storage newEntity = _verifiedEntity[_hash];
        newEntity.data = _newEntity.data;
        newEntity.confidence = _newEntity.confidence;
    }

    function getVerifiedEntity(uint256 _hash) public view returns (VerifiedEntity memory) {
        return _verifiedEntity[_hash];
    }
}