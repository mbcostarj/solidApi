import { User, PrismaClient } from '@prisma/client';
import { IUserRepository } from "../IUserRepository";

export class PosgresUsersRepository implements IUserRepository{
  private users: User[] = []
  prisma = new PrismaClient()

  async findByEmail(email: string): Promise<User> {
    const user = this.prisma.user.findUnique({ where: {email} });
    return user;
  }
  async save(user: User): Promise<User> {
    return this.prisma.user.create({ data: user });
  }
  
}