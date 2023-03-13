pragma solidity ^0.8.17;
// SPDX-License-Identifier: MIT

contract wallet{
    //read
    uint num;
    struct transaction{
        string name;
        string message;
        uint val;
        address from;
        uint256 timestamp;
    }
    transaction[] trans;
    address payable owner;
    constructor(){
        owner = payable(msg.sender);
    }
    //write
    function donate_eths(string memory name, string memory message) public payable{
        require(msg.value > 0 , "Enter value greater than 0");
        trans.push(transaction(name,message,msg.value,msg.sender,block.timestamp));
    }

    //read
    function getTrans() public view returns(transaction[] memory){
        return trans;
    }

    //write
    function withdraw_by_owner(uint _amount) external {
        require(_amount <= address(this).balance , "Not enough amount");
        require(msg.sender == owner, "You are not an owner");
        owner.transfer(_amount);
    }

    //write
    function setValue(uint _num) public {
        num=_num;
    }
    //read
     function getValue() public view returns(uint){
        return num;
    }
    //read
    function contract_balance() public view returns(uint){
        return address(this).balance;
    }
    //write
    function send_to_user(address _user) public payable{
       payable(_user).transfer(msg.value);
    }
    //read
    function account_balance(address _address) public view returns(uint){
        return (_address).balance;
    }

    //read
    function owner_balance() public view returns(uint){
        return owner.balance;
    }

    function owner_address() public view returns(address){
        return owner;
    }
}