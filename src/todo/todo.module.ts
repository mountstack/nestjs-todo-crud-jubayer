import { Module } from "@nestjs/common";
import { TodoController } from "./todo.controller";
import { UpdateTodoPipe } from "./pipes/update-todo.pipe";
import { FormattedValidationPipe } from "../pipes/formatted.validation.pipes";


@Module({
    controllers: [TodoController],
    providers: [UpdateTodoPipe, FormattedValidationPipe]
})
export class TodoModule {
    constructor() {
        console.log('Todo Module running...');
    }
}

