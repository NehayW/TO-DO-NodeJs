const { ethers } = require("hardhat");

const API_KEY = process.env.API_KEY; //get from alchemy
const CONTRACT_ADDRESS = process.env.CONTRACT; //deployed contract address
const PRIVATE_KEY = process.env.PRIVATE_KEY; //metamask

const contract = require('../artifacts/contracts/Todo.sol/TodoList.json');

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="rinkeby", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const toDo = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

debugger;

async function main() {

    // const task = await toDo.Task();
    // console.log("the Task is "+ task);

    // const tx = await toDo.add_todo_list("now toDo List1");
    // await tx.wait();

    // const nmessage = await toDo.viewOneTask(
    //   1);
    // console.log("your first task is.......!! "+ nmessage);

    const all = await toDo.viewAllTask();
    console.log("your all task is.......!! "+ all);
}

main()

// module.exports = mongoose.model('users', userSchema);

module.exports = { 'contract': toDo};

// .then(() => process.exit(0))
// .catch(error => {
//   console.error(error);
//   process.exit(1);
// });