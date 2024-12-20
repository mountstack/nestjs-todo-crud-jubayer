import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { TodoDTO } from "./dto/todo.dto";
import { FormattedValidationPipe } from "../pipes/formatted.validation.pipes";
import { UpdateTodoPipe } from "./pipes/update-todo.pipe";

@Controller('todos')
export class TodoController {
    todos = []; 

    constructor(
        private readonly updateTodoPipe: UpdateTodoPipe, 
        private readonly formattedValidationPipe: FormattedValidationPipe, 
    ) {}

    @Post()
    createTodo(@Body(FormattedValidationPipe) body: TodoDTO) {
        body.id = this.todos.length + 1;
        body.isCompleted = false;
        this.todos.push(body);

        return {
            statusCode: 201,
            data: this.todos
        };
    }

    @Get() 
    findAllTodos() {
        return {
            statusCode: 200,
            message: "This action returns all todos",
            data: this.todos
        };
    }

    @Get(':id')
    findOneTodo(@Param('id', ParseIntPipe) id: number) {
        const todo: TodoDTO | undefined = this.todos?.find(item => item?.id === id);

        if (!todo) {
            throw new NotFoundException();
        }

        return { statusCode: 200, todo };
    } 

    @Patch(':id')
    updateTodo(@Param('id', ParseIntPipe) id: number, @Body(UpdateTodoPipe) body: Partial<TodoDTO>) {
        const todo: TodoDTO | undefined = this.todos?.find(item => item?.id === id);

        if (!todo) { 
            throw new NotFoundException(); 
        } 

        Object.assign(todo, body); 

        return { statusCode: 200, todo }; 
    } 

    @Delete(':id')
    deleteTodo(@Param('id', ParseIntPipe) id: number) { 
        this.todos = this.todos.filter(item => item?.id !== id);
        
        return { 
            statusCode: 200, 
            message: `This action deletes a #${id} todo`, 
            data: this.todos 
        }; 
    } 
} 
