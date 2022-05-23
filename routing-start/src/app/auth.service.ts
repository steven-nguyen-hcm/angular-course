
export class AuthService {
  loggedIn: boolean = false;
  
  isAuthenticated(): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 100);
    })
  }
  
  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}