import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    health() {
        return 'UP'
    }
}
