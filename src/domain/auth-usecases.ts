import { AUTH_TOKEN } from "../core/constants/keys-constans";
import { authService } from "../data/functions/auth-functions";
import { AuthReigsterParams } from "../data/interfaces/auth-register-params";

async function userLogin ({ userEmail, userPassword }: { userEmail: string, userPassword: string }): Promise<boolean> {
  try {
    const response = await authService.login(userEmail, userPassword);
    const ok = await response.data.token

    if (ok !== undefined) {
      localStorage.setItem(AUTH_TOKEN, response.data.token!);
      return true;
    }

    return false;
  } catch (err) {
    localStorage.removeItem(AUTH_TOKEN);
    return false;
  }
}

async function userRegister (registerForm: AuthReigsterParams): Promise<boolean> {
  try {
    const response = await authService.register(registerForm);

    if (response.data.status) {
      return true
    }

    return false

  } catch (err) {
    return false;
  }
}

export const authUseCases = {
  userLogin,
  userRegister
}