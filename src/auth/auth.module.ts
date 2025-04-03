import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, UsersService, JwtService],
  exports: [AuthService],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: 'change!',
      signOptions: { expiresIn: '60s' },
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
})
export class AuthModule {}
