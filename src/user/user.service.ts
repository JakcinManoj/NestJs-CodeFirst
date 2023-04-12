import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {

    const obj = {
      algorithm: 'aes-256-cbc',
      ivLength: 16,
      key: crypto
        .createHash('sha256')
        .update(createUserInput.password)
        .digest('base64')
        .substr(0, 32),
    };

    const forencryption = await this.encryptingPassword(
      createUserInput.password,
      obj,
    );
    const fordecryption = await this.decryptingPassword(forencryption, obj);
    const user = this.userRepository.create({
      email: createUserInput.email,
      password: fordecryption,
    });
    return this.userRepository.save(user);
  }

  private async encryptingPassword(password: string, obj): Promise<string> {
    const iv = crypto.randomBytes(obj.ivLength);
    const cipher = crypto.createCipheriv(obj.algorithm, obj.key, iv);
    const encryptedBuffer = Buffer.concat([
      cipher.update(password, 'utf8'),
      cipher.final(),
    ]);
    const encrypted = `${iv.toString('hex')}:${encryptedBuffer.toString(
      'hex',
    )}`;
    console.log('password encrypted------------------', encrypted);
    return encrypted;
  }

  private async decryptingPassword(password: string, obj): Promise<string> {
    const [ivHex, encryptedDataHex] = password.split(':');
    const ivs = Buffer.from(ivHex, 'hex');
    const encryptedData = Buffer.from(encryptedDataHex, 'hex');
    const decipher = crypto.createDecipheriv(obj.algorithm, obj.key, ivs);
    const decryptedBuffer = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);
    const decryptedText = decryptedBuffer.toString('utf8');
    console.log('password decrypted------------------', decryptedText);
    return decryptedText;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }
}
