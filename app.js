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
// delete the todo 
app.delete('/delete/:id', (req,res) =>{
    // first fetch the todo 
   
    const id = parseInt(req.params.id);
    //get the index of the task 
    const indx = todo.findIndex(item => item.id ===id); 
    if(indx ===-1 ){
        res.status(404).json({
            success: false,
            message: "Todo not found"
        })
    }
    // use splice 
    const del = todo.splice(indx, 1)[0]; 
    res.status(200).json({
        success: true,
        message: "Your todo is deleted"
    }); 

});
// read the file with the given id 
app.get("/todos/read/:id", (req, res) =>{
    // first fetch the id 
    const id = parseInt(req.params.id); 
    const indexx = todo.findIndex(item => item.id === id); 
    if(indexx === -1){
        return res.status(404).json({
            message: "Todo not found"
        });
        
    }
    res.send(todo[indexx]); 

});
app.get("/todos/read/all", function (req, res) {
    
    if (todo.length === 0) {
        return res.send("No todos found");
    }

    // send the todos array as response
    res.send(todo);
});


app.listen(5050, () =>{
    console.log("Server is running on the port 5050")
})

