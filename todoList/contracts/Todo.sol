pragma solidity >= 0.7.3;
pragma experimental ABIEncoderV2;

contract TodoList {
  
  struct Task {
    string task;
    bool isDone;
  }

  mapping (address => Task[])  Users;


  function add_todo_list(string memory _name) external{
  		Users[msg.sender].push(Task({
  			task : _name,
  			isDone : false
  			}));
  }

  function viewOneTask(uint256 _taskIndex) external view returns(Task memory)
  {
  	Task memory task = Users[msg.sender][_taskIndex];
  	return task;
  }

  function viewAllTask() external view returns(Task[]  memory )
  {
      return Users[msg.sender];
  }

  function taskCompleted(uint256 _taskIndex) external 
  {
     Task memory task = Users[msg.sender][_taskIndex];
     task.isDone = true;
     Users[msg.sender][_taskIndex] = task;
  }

  function deleteTask(uint256 _taskIndex) external
  {
  	delete Users[msg.sender][_taskIndex];
  }

}
