export class UserNotLoggedIn extends Error {
  super() {
    this.message = 'You have to be logged in to perform this action';
    this.name = 'UserNotLoggedIn';
  }
}
