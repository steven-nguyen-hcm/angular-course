
export class AuthService {
  loggedIn: boolean = false;
  
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    })
  }
  
  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}