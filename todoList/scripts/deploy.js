const { ethers } = require("hardhat");
async function main() {

   const TodoList = await ethers.getContractFactory('TodoList');

   const hw = await TodoList.deploy();

   console.log('Contract Deployed to:', hw.address);
}

main().then(() => process.exit(0))
.catch(error => {
 console.error(error);
 process.exit(1);
});