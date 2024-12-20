
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class UpdateTodoPipe implements PipeTransform {
    constructor() {
        console.log('Update-Todo Pipe initialized...');
    } 

    transform(value: any, metadata: ArgumentMetadata) { 
        
        if(value.isCompleted && typeof(value.isCompleted) !== 'boolean') {
            throw new BadRequestException('isCompleted must be a boolean');
        } 

        if(value.task && typeof(value.task) !== 'string') {
            throw new BadRequestException('task must be a string');
        } 
        else if(value.task === '') {
            throw new BadRequestException('Task cannot be empty');
        }

        if(!value.task && !value.isCompleted) {
            throw new BadRequestException('Task and isCompleted, at least one field is required');
        } 

        return value;
    } 
}


