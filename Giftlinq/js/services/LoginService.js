// Assignment 2 mentioned login, but secure login is outside the static-only proposal.
// This class preserves the designed interface without collecting passwords.
export class LoginService {
  login(){throw new Error('Login is not supported in this no-backend prototype.');}
  logout(){return true;}
  validateCredentials(){return false;}
}
