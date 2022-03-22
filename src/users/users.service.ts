import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(email: string) {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    return user;
  }

  async findOneEmail({ emailAddress }: { emailAddress: string }) {
    const { id, email, twitterhandle } = await this.userRepository.findOne({
      where: {
        email: emailAddress,
      },
    });
    return { id, email, twitterhandle };
  }

  async findOneUser(id: string) {
    const { password, ...result } = await this.userRepository.findOne(id);
    return result;
  }

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    await this.userRepository.save(newUser);
    return newUser;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with #${id} not found`);
    }
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOne(id);
    return this.userRepository.remove(user);
  }
}
