// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Script, console} from "forge-std/Script.sol";
import {Resolver} from "../contracts/src/Resolver.sol";
import {IEscrowFactory} from "../contracts/lib/cross-chain-swap/contracts/interfaces/IEscrowFactory.sol";
import {IOrderMixin} from "limit-order-protocol/contracts/interfaces/IOrderMixin.sol";

contract DeployResolver is Script {
    function run() external {
        // Get environment variables
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        address factory = vm.envAddress("FACTORY_ADDRESS");
        address lop = vm.envAddress("LOP_ADDRESS");
        
        // Get deployer address
        address deployer = vm.addr(deployerPrivateKey);
        console.log("Deploying with address:", deployer);
        console.log("Factory address:", factory);
        console.log("LOP address:", lop);
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy the Resolver contract
        Resolver resolver = new Resolver(
            IEscrowFactory(factory),
            IOrderMixin(lop),
            deployer // initial owner
        );
        
        vm.stopBroadcast();
        
        console.log("Resolver deployed at:", address(resolver));
    }
}
