export default class User {
  constructor(
    public userId: string = '',
    public name: string = '',
    public username: string = '',
    public email: string = '',
    public role: string = ''
  ) {}

  isLoggedIn() {
    return this.username === '';
  }
}
