import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { UpdateTodoPipe } from "./pipes/update-todo.pipe";
import { FormattedValidationPipe } from "../pipes/formatted.validation.pipes";
import { TodoService } from './todo.service';


@Module({
    controllers: [TodoController],
    providers: [UpdateTodoPipe, FormattedValidationPipe, TodoService]
})
export class TodoModule {
    constructor() {
        console.log('Todo Module running...');
    }
}

