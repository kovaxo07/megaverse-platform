// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract StakingPool is Ownable {
    IERC20 public immutable token;
    uint256 public rewardRatePerSecond;
    uint256 public lastUpdate;
    uint256 public accRewardPerToken;
    mapping(address=>uint256) public balanceOf;
    mapping(address=>uint256) public userRewardPerTokenPaid;
    mapping(address=>uint256) public rewards;
    uint256 public totalStaked;
    event Staked(address indexed u,uint256 a);
    event Withdrawn(address indexed u,uint256 a);
    event RewardPaid(address indexed u,uint256 r);
    constructor(IERC20 _token,uint256 _rate) Ownable(msg.sender){token=_token;rewardRatePerSecond=_rate;lastUpdate=block.timestamp;}
    modifier update(){accRewardPerToken=_c();lastUpdate=block.timestamp;rewards[msg.sender]=earned(msg.sender);userRewardPerTokenPaid[msg.sender]=accRewardPerToken;_;}
    function _c() internal view returns(uint256){if(totalStaked==0)return accRewardPerToken;uint256 d=block.timestamp-lastUpdate;return accRewardPerToken+d*rewardRatePerSecond*1e18/totalStaked;}
    function stake(uint256 a) external update {require(a>0);totalStaked+=a;balanceOf[msg.sender]+=a;require(IERC20(token).transferFrom(msg.sender,address(this),a));emit Staked(msg.sender,a);}
    function withdraw(uint256 a) external update {require(a>0&&balanceOf[msg.sender]>=a);totalStaked-=a;balanceOf[msg.sender]-=a;require(IERC20(token).transfer(msg.sender,a));emit Withdrawn(msg.sender,a);}
    function earned(address u) public view returns(uint256){uint256 rpt=_c();return (balanceOf[u]*(rpt-userRewardPerTokenPaid[u])/1e18)+rewards[u];}
    function getReward() external update {uint256 r=rewards[msg.sender];rewards[msg.sender]=0;require(IERC20(token).transfer(msg.sender,r));emit RewardPaid(msg.sender,r);}
}