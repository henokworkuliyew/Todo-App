const ToDoModel = require("../models/todo.model"); 
 
class ToDoService{ 
    static async createToDo(userId,title,description){ 
            const createToDo = new ToDoModel({userId,title,description}); 
            return await createToDo.save(); 
    } 
    
 
    static async getUserToDoList(userId){ 
        const todoList = await ToDoModel.find({userId}) 
        return todoList; 
    } 
 
   static async deleteToDo(id){ 
        const deleted = awaitToDoModel.findByIdAndDelete({_id:id})
    return deleted; 
   } 
} 
 
module.exports = ToDoService; 