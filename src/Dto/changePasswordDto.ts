class ChangePassword {
  oldPassword: string;
  newPassword: string;
  id: number;
  constructor(oldPassword: string, newPassword: string,id: number) {
      this.oldPassword = oldPassword;
      this.newPassword = newPassword;
      this.id = id;
  }
}

export default ChangePassword;
