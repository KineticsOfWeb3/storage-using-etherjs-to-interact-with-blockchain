// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdvancedStorage {
    uint256 private totalSupply;
    address private owner;

    struct Item {
        string name;
        uint256 quantity;
    }
    Item[] private items;

    event ItemAdded(string name, uint256 quantity);
    event TotalSupplyUpdated(uint256 total);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function addItem(string memory _name, uint256 _quantity) public onlyOwner {
        items.push(Item(_name, _quantity));
        emit ItemAdded(_name, _quantity);
    }

    function getTotalSupply() public view returns (uint256) {
        return totalSupply;
    }

    function updateTotalSupply(uint256 _newTotal) public onlyOwner {
        totalSupply = _newTotal;
        emit TotalSupplyUpdated(_newTotal);
    }

    function getItem(uint256 _index) public view returns (string memory, uint256) {
        require(_index < items.length, "Index out of bounds");
        return (items[_index].name, items[_index].quantity);
    }

    function getItemCount() public view returns (uint256) {
        return items.length;
    }
}
