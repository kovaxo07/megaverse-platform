// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DAB101Token is ERC20Burnable, Ownable {
    uint256 public constant INITIAL_SUPPLY = 1_000_000_000 * 10**18;
    bool public paused;
    constructor(address treasury) ERC20("DAB101", "DAB") Ownable(msg.sender) {
        _mint(treasury, INITIAL_SUPPLY);
    }
    modifier whenNotPaused(){ require(!paused, "paused"); _; }
    function pause() external onlyOwner { paused = true; }
    function unpause() external onlyOwner { paused = false; }
    function _update(address f,address t,uint256 v) internal override whenNotPaused { super._update(f,t,v); }
}