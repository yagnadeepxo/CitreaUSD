//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
 
// 0x98d541984fb9C63CA4Fece3Aa515CC02A3EB567c cUSD contract address
// 0x43A444AC5d00b96Daf62BC00C50FA47c1aFCf3C3 BTC/USD price feed
// 0xf62C673Ac717349Cd06f4763cE7c8319F262D7F9 lock-mint/burn-release

pragma solidity ^0.8.22;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IChainlinkAggregator} from "./interfaces/IChainlinkAggregator.sol";

contract NativeBTCLocker is Ownable {
    // Chainlink Price Feed
    IChainlinkAggregator public priceFeed;
    // cUSD Token contract
    address public cUSDToken;
    // Minting parameters
    uint256 public constant MIN_LOCK_AMOUNT = 0.01 * 10**18; // 0.01 cBTC minimum
    uint256 public constant MAX_LOCK_AMOUNT = 100 * 10**18; // 100 cBTC maximum
    // Events
    event BTCLocked(address indexed user, uint256 amount);
    event USDMinted(address indexed user, uint256 amount);
    event BTCUnlocked(address indexed user, uint256 amount);
    event USDBurned(address indexed user, uint256 amount);

    constructor(address _cUSDTokenAddress, address _priceFeedAddress) Ownable() {
        cUSDToken = _cUSDTokenAddress;
        priceFeed = IChainlinkAggregator(_priceFeedAddress);
    }

    // Get the latest BTC/USD price from Chainlink
    function getBTCUSDPrice() public view returns (uint256) {
        int256 price = priceFeed.latestAnswer();
        require(price > 0, "Invalid price feed");
        return uint256(price);
    }

    // Lock native cBTC and mint equivalent cUSD
    function lockAndMint() external payable {
        // Validate lock amount
        require(msg.value >= MIN_LOCK_AMOUNT, "Lock amount too small");
        require(msg.value <= MAX_LOCK_AMOUNT, "Lock amount too large");

        // Get current BTC/USD price
        uint256 btcPrice = getBTCUSDPrice();
        // Calculate cUSD amount to mint
        uint256 cUSDAmount = (msg.value * btcPrice) / (10 ** (18));

        // Mint new cUSD tokens to the user
        (bool success, ) = cUSDToken.call(
            abi.encodeWithSignature("mint(address,uint256)", msg.sender, cUSDAmount)
        );
        require(success, "cUSD minting failed");
        emit BTCLocked(msg.sender, msg.value);
        emit USDMinted(msg.sender, cUSDAmount);
    }

function unlockAndBurn(uint256 cUSDAmount) external {
    // Get current BTC/USD price
    uint256 btcPrice = getBTCUSDPrice(); 
    uint256 cBTCAmount = (cUSDAmount * 10**36) / (btcPrice);

    // Burn cUSD tokens
    (bool burnSuccess, ) = cUSDToken.call(
        abi.encodeWithSignature("burnFrom(address,uint256)", msg.sender, cUSDAmount*10**18)
    );
    require(burnSuccess, "cUSD burning failed");

    // Transfer native cBTC back to user in wei
    (bool transferSuccess, ) = msg.sender.call{value: cBTCAmount}("");
    require(transferSuccess, "cBTC transfer failed");

    emit USDBurned(msg.sender, cUSDAmount);
    emit BTCUnlocked(msg.sender, cBTCAmount);
}

    // Allow the contract to receive native cBTC
    receive() external payable {}
}
