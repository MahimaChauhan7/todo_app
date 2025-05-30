
const express = require('express'); 
const app = express() ;
app.use(express.json()); // This will help to parse the json file automatically to req.body when required 
// Parse meaning --> Parsing means analyzing and converting a program into an internal format that a runtime environment can actually run.

const todo = [] 
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// POST Method for my todo app 
app.post('/todos/create', (req, res) =>{
    // if the todo is already exist 
    

    const newTask = req.body.task; // eg. {todo: "Go to the gym"} 
    const id = parseInt(req.body.id);
    for(let i = 0; i< todo.length; i++){
        if(todo[i].id === id){
            return res.status(400).send("Todo already exist");
        }
        
    }
    let newTodo = {
        id: id,
        task: newTask
    };
     todo.push(newTodo) ;
     
     res.status(201).send("Your todo is successfully added")
     
}) 
// Update the todo list 
// First get the todo from the REQ.BODY 
app.put("/todos/up/:id", (req, res) =>{
    const updateTask = req.body.task; 
    const id = parseInt(req.params.id); 
    const exist = todo.findIndex(item => item.id ===id);
    if(exist === -1){

        return res.status(404).send("Todo not found");
    }
    todo[exist].task = updateTask; 
    res.status(200).json({ 
        message: "Todo updated successfully", 
        todo: todo[index] 
    });




})

app.listen(5050, () =>{
    console.log("Server is running on the port 5050")
})

