import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUserRepository } from "../../repositories/IUserRepository";
import { ICreateUserExportDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUserRepository,
    private mailProvider: IMailProvider
  ){}
  
  async execute(data: ICreateUserExportDTO){
    const userExist = await this.usersRepository.findByEmail(data.email);
    if (userExist){
      throw new Error('Usuario já existe.');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to:{
        name: data.name,
        email: data.email
      },
      from:  {
        name: "Adm",
        email: "adm@apisolid.com",
      },
      subject: "Obrigado por se cadastrar",
      body: "<p>Você já pode fazer login!</p>"
    });
  }
}