const Resolver = artifacts.require('Resolver');

const configs = {
    tron: {
        lop: "",
        escrowFactory: ""
    },
    nile: {
        lop: "TAYjAyuKjKvkhkcvgJ7CgrJ8PVziU5vr4R",
        escrowFactory: "THVQCzNgJxTvBRH297tmHXuxVdcahipy3f"
    },
};

module.exports = async function (deployer, network, accounts) {
    console.log('Running deployment for Resolver...');
    console.log(`Network: ${network}`);
    console.log(`Deployer account: ${accounts}`);

    // =================================================================
    // 2. Select Configuration and Deploy
    // =================================================================

    const cfg = configs[network];

    // Safety check: fail if the network is not configured
    if (!cfg) {
        throw new Error(`Configuration for network "${network}" not found. Please add it to the script.`);
    }

    console.log("----------------------------------------------------");
    console.log("Deploying Resolver with the following arguments:");
    console.log(`  1. LOP:             ${configs[network].lop}`);
    console.log(`  1. EscrowFactory:   ${configs[network].escrowFactory}`);
    console.log("----------------------------------------------------");

    // Deploy the contract with the network-specific arguments
    await deployer.deploy(Resolver, cfg.lop, cfg.escrowFactory);

    const resolver = await Resolver.deployed();
    console.log('Resolver deployed to:', resolver.address);
};
