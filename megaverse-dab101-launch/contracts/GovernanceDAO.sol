// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract GovernanceDAO {
    IERC20 public immutable token;
    struct Proposal{address proposer;string description;uint256 forVotes;uint256 againstVotes;uint256 deadline;bool executed;}
    uint256 public constant VOTING_PERIOD=3 days; uint256 public nextId;
    mapping(uint256=>Proposal) public proposals; mapping(uint256=>mapping(address=>bool)) public hasVoted;
    event Proposed(uint256 id,address proposer,string description); event Voted(uint256 id,address voter,bool s,uint256 w); event Executed(uint256 id);
    constructor(IERC20 _token){token=_token;}
    function propose(string calldata d) external returns(uint256 id){id=nextId++;proposals[id]=Proposal(msg.sender,d,0,0,block.timestamp+VOTING_PERIOD,false);emit Proposed(id,msg.sender,d);}
    function vote(uint256 id,bool s) external {Proposal storage p=proposals[id];require(block.timestamp<p.deadline&&!hasVoted[id][msg.sender]);hasVoted[id][msg.sender]=true;uint256 w=token.balanceOf(msg.sender);require(w>0); if(s)p.forVotes+=w;else p.againstVotes+=w;emit Voted(id,msg.sender,s,w);}
    function execute(uint256 id) external {Proposal storage p=proposals[id];require(block.timestamp>=p.deadline&&!p.executed);p.executed=true;emit Executed(id);}
}