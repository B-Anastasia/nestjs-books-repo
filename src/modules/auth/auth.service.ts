import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
// сравним хеш пароли
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private userRepository: UsersRepository) {}
  async validateUser(
    email: string,
    password: string,
  ): Promise<{ userId: number }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('un auth');
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new UnauthorizedException('un auth password');
    }

    return {
      userId: user.id,
    };
  }
}
