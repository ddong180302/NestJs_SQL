import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, FindOptionsWhere } from 'typeorm';
import { genSaltSync, hashSync } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }


  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async create(createUserDto: CreateUserDto) {
    const { email, password, name, phone, age, address } = createUserDto;
    const hashPassword = this.getHashPassword(password);
    let user = await this.usersRepository.save({
      email, password: hashPassword, name, phone, age, address
    })
    return user;
  }

  async findAll() {
    return await this.usersRepository.find();
  }

  async findOne(id: number) {
    if (isNaN(id)) {
      // Nếu id không phải là một số
      throw new BadRequestException("Invalid id. Must be a number.");
    }
    // const conditions: FindOptionsWhere<User> = { id };
    // const exists = await this.usersRepository.existsBy(conditions);
    // if (!exists) {
    //   throw new BadRequestException("User not found!");
    // } else {
    //   const user = await this.usersRepository.findOne({ where: { id: id } });
    //   return user;
    // }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException("User not found!")
    } else {
      return user;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const { email, name, phone, age, address } = updateUserDto;
    if (isNaN(id)) {
      // Nếu id không phải là một số
      throw new BadRequestException("Invalid id. Must be a number.");
    }
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new BadRequestException("User not found!")
    } else {
      const updated = await this.usersRepository.update({ id: id }, { email, name, phone, age, address });
      return updated;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
