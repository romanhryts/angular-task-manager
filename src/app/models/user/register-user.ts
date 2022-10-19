import { ILoginUser } from './login-user';

export interface IRegisterUser extends ILoginUser {
  readonly message: string;
  readonly status: number;
}
