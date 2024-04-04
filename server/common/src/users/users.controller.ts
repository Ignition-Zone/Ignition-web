import { Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class AuthController {
  constructor(private usersService: UsersService) {}
}
