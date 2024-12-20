import { TodoService } from './todo.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { TodoDTO } from "./dto/todo.dto";
import { FormattedValidationPipe } from "../pipes/formatted.validation.pipes";
import { UpdateTodoPipe } from "./pipes/update-todo.pipe";

@Controller('todos')
export class TodoController { 
    constructor(
        private updateTodoPipe: UpdateTodoPipe, 
        private formattedValidationPipe: FormattedValidationPipe, 
        private todoService: TodoService 
    ) {}

    @Post()
    createTodo(@Body(FormattedValidationPipe) body: TodoDTO) { 
        return {
            statusCode: 201,
            data: this.todoService.addTodo(body) 
        };
    }

    @Get() 
    findAllTodos() {
        return {
            statusCode: 200,
            message: "This action returns all todos",
            data: this.todoService.getAllTodos()
        };
    }

    @Get(':id')
    findOneTodo(@Param('id', ParseIntPipe) id: number) {
        const todo: TodoDTO | undefined = this.todoService.getTodoById(id);

        if (!todo) {
            throw new NotFoundException();
        }

        return { statusCode: 200, todo };
    } 

    @Patch(':id')
    updateTodo(@Param('id', ParseIntPipe) id: number, @Body(UpdateTodoPipe) body) { 
        return { 
            statusCode: 200, 
            todos: this.todoService.updateTodo(id, body) 
        }; 
    } 

    @Delete(':id')
    deleteTodo(@Param('id', ParseIntPipe) id: number) { 
        return { 
            statusCode: 200, 
            message: `This action deletes a #${id} todo`, 
            data: this.todoService.deleteTodo(id) 
        }; 
    } 
} 
