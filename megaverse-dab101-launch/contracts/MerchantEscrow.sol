// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract MerchantEscrow is Ownable {
    IERC20 public immutable token;
    struct Order{address buyer;address merchant;uint256 amount;bool released;bool refunded;}
    uint256 public nextOrderId; mapping(uint256=>Order) public orders;
    event OrderCreated(uint256 id,address buyer,address merchant,uint256 amount);
    event Released(uint256 id,address merchant); event Refunded(uint256 id,address buyer);
    constructor(IERC20 _token) Ownable(msg.sender){token=_token;}
    function createOrder(address m,uint256 amt) external returns(uint256 id){require(m!=address(0)&&amt>0);id=nextOrderId++;orders[id]=Order(msg.sender,m,amt,false,false);require(token.transferFrom(msg.sender,address(this),amt));emit OrderCreated(id,msg.sender,m,amt);}
    function release(uint256 id) external onlyOwner {Order storage o=orders[id];require(!o.released&&!o.refunded);o.released=true;require(token.transfer(o.merchant,o.amount));emit Released(id,o.merchant);}
    function refund(uint256 id) external onlyOwner {Order storage o=orders[id];require(!o.released&&!o.refunded);o.refunded=true;require(token.transfer(o.buyer,o.amount));emit Refunded(id,o.buyer);}
}