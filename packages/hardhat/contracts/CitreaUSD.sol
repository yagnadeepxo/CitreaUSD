// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.22;

import {ERC20} from "@openzeppelin/contracts@5.1.0/token/ERC20/ERC20.sol";
import {ERC20Burnable} from "@openzeppelin/contracts@5.1.0/token/ERC20/extensions/ERC20Burnable.sol";
import {ERC20Permit} from "@openzeppelin/contracts@5.1.0/token/ERC20/extensions/ERC20Permit.sol";
import {Ownable} from "@openzeppelin/contracts@5.1.0/access/Ownable.sol";

contract CitreaUSD is ERC20, ERC20Burnable, Ownable, ERC20Permit {
    constructor(address initialOwner)
        ERC20("CitreaUSD", "cUSD")
        Ownable(initialOwner)
        ERC20Permit("CitreaUSD")
    {}

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }

    function burnFrom(address account, uint256 amount) override public {
    _burn(account, amount);
}

    function updateOwner(address newOwner) public onlyOwner {
        require(newOwner != address(0), "New owner cannot be zero address");
        _transferOwnership(newOwner);
    }
}