import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class TodoDTO {
    @IsInt()
    @IsOptional()
    id: number;

    @IsString()
    @IsNotEmpty()
    task: string;

    @IsBoolean() 
    @IsOptional() 
    isCompleted: boolean; 
} 

