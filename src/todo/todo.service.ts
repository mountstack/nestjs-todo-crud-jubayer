import { Injectable } from '@nestjs/common';
import { TodoDTO } from './dto/todo.dto';



@Injectable()
export class TodoService { 
    private todos: TodoDTO[] = [];

    addTodo(todo: TodoDTO): TodoDTO[] { 
        todo.id = this.todos.length + 1;
        todo.isCompleted = false;
        this.todos.push(todo);

        return this.todos;
    } 

    getAllTodos(): TodoDTO[] {
        return this.todos;
    }

    getTodoById(id: number): TodoDTO {
        return this.todos.find(todo => todo.id === id);
    } 

    updateTodo(id: number, updatedTodo: TodoDTO): TodoDTO[] {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) { 
            Object.assign(this.todos[index], updatedTodo); 
        } 

        return this.todos;
    } 

    deleteTodo(id: number): TodoDTO[] {
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index !== -1) {
            this.todos.splice(index, 1);
        }
        return this.todos;
    }
}
