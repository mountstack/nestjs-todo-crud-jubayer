import { Module } from '@nestjs/common'; 
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [TodoModule],
  controllers: [],
  providers: [],
})
export class RootModule { 
  constructor() {
    console.log('Root Module Initialized...'); 
  }
}
