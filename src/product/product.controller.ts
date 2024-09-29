import { Controller, Get } from '@nestjs/common';

@Controller('product')
export class ProductController {

    @Get('/health')
    health() {
        return 'UP'
    }
}
