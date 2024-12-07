// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

interface IChainlinkAggregator {
    function latestAnswer() external view returns (int256);
    function decimals() external view returns (uint8);
}