import { MailTrapMailProvider } from "../../providers/implementations/MailtrapMailProvider";
import { PosgresUsersRepository } from "../../repositories/implementations/PostgresUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailTrapMailProvider()
const posgresUsersRepository = new PosgresUsersRepository()

const createUserUseCase = new CreateUserUseCase(
  posgresUsersRepository,
  mailtrapMailProvider
)

const createUserController = new CreateUserController(
  createUserUseCase
)

export { createUserUseCase, createUserController }