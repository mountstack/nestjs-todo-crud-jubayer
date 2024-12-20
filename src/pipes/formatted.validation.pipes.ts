import { BadRequestException, ValidationError, ValidationPipe } from "@nestjs/common";

export class FormattedValidationPipe extends ValidationPipe {
    constructor() {
        super({
            exceptionFactory: (errors: ValidationError[]) => { 
                return new BadRequestException({
                    statusCode: 400,
                    message: 'Validation failed', 
                    errors: errors.reduce((acc, err) => { 
                        acc[err.property] = err.constraints[Object.keys(err.constraints)[0]]
                        return acc;
                    }, {})
                })
            }
        });
    }
} 
