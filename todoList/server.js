const express = require('express')
const app = express();
const path = require('path')
const bodyParser = require("body-parser");
const interact = require("./scripts/interact.js");


app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

const port = process.env.PORT||4000;
app.set('view engine', 'ejs');

app.use('/static', express.static(path.join(__dirname, 'scripts')));



//the completed task array with initial placeholders for removed task
// var complete = ["finish jquery"];
// app.post("/removetask", function(req, res) {
// 	console.log("===========hello")
//      var completeTask = req.body.check;
// //check for the "typeof" the different completed task, then add into the complete task
// if (typeof completeTask === "string") {
//      complete.push(completeTask);
// //check if the completed task already exist in the task when checked, then remove using the array splice method
//   task.splice(task.indexOf(completeTask), 1);
// } else if (typeof completeTask === "object") {
//     for (var i = 0; i < completeTask.length; i++) {     complete.push(completeTask[i]);
//     task.splice(task.indexOf(completeTask[i]), 1);
// }
// }
//    res.redirect("/");
// });



//the task array with initial placeholders for added task
var task = [];
async function main_showall() {
		const all = await interact.contract.viewAllTask();
		for(i=0; i<=all.length; i++)
		{	if(all[i] != undefined)
			{
				task.push({"name" : Object.values(all[i])[0], "isDone" : Object.values(all[i])[1]});
			}
			debugger;
		}
	}
	main_showall()
// 	debugger;

//post route for adding new task
app.post('/addtask', function (req, res) {
    var newTask = req.body.newtask;
	async function main() {
	    const tx = await interact.contract.add_todo_list(newTask);
	    await tx.wait();
	}
	main()
    task.push({'name': newTask, 'isDone' : false});
    res.redirect("/");
});

app.post('/delete/task', function(req, res){
	console.log(req.body.index);
	async function main()
	{
		await interact.contract.deleteTask(req.body.index);
	}
	main();
});

app.post('/complete/task', function(req, res){
	console.log(req.body.index);
	async function main()
	{
		await interact.contract.taskCompleted(req.body.index);
	}
	main();
});

app.get("/", function(req, res) {  
  res.render("todo", { "task": task});
});


app.listen(port, ()=>{console.log("localhost is running on 2000...!")})
