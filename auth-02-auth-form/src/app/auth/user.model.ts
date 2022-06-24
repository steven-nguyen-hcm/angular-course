export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  public get token() {
    const _tokenExpirationDate = new Date(this._tokenExpirationDate);

    if (!this._tokenExpirationDate || this._tokenExpirationDate <= new Date()) {
      return null;
    }

    return this._token;
  }
}
