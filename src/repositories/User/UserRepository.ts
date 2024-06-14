import Auth from "../../Dto/AuthDto";
import User from "../../Dto/UserDto";
import ChangePassword from "../../Dto/changePasswordDto";
import db from "../../config/config-db";
import bcrypt, { compare } from "bcryptjs";
import generateHash from "../../helpers/generateHash";

class UserRepository {

  //REGISTER
  static async add(user: User) {
    const sql =
      "INSERT INTO clients (nombres, apellidos, email, contrasenia) VALUES (?, ?, ?, ?)";
    const values = [
      user.nombres,
      user.apellidos,
      user.email,
      user.contrasenia,
    ];
    return db.execute(sql, values);
  }

  //LOGIN
  static async authh(auth: Auth) {
    const sql = "SELECT idCliente, contrasenia FROM clients WHERE email=?";
    const values = [auth.email];
    const result: any = await db.execute(sql, values);
    
    if (result[0].length > 0) {
      const user = result[0][0];
      const isPasswordValid = await bcrypt.compare(
        auth.contrasenia,
        user.contrasenia
      );
      if (isPasswordValid) {
        return {
          idCliente: user.idCliente,
          logged: true,
          status: "Successful authentication",
        };
      }
      return { logged: false, status: "Invalid username or password" };
    }
    return { logged: false, status: "Invalid username or password" };
  }

  //PROFILE
  static async getById(idCliente: number) {
    const sql = "SELECT email, nombres, apellidos FROM clients WHERE idCliente = ?";
    const values = [idCliente];
    return db.execute(sql, values);
  }

  //CHANGE PASSWORD
  static async changePassword(changePassword: ChangePassword) {

    const { id, oldPassword, newPassword } = changePassword;

    if(oldPassword === newPassword){
      return { message: "La nueva contraseña no puede ser igual a la anterior"}
    }

    const sql = "SELECT contrasenia FROM clients WHERE idCliente = ?";
    const values = [changePassword.id];
    const result: any = await db.execute(sql, values);

    if (result[0].length > 0) {
      const user = result[0][0];
      const isPasswordValid = await bcrypt.compare(
        changePassword.oldPassword,
        user.contrasenia
      );

      if (isPasswordValid) {
        const hashedPassword = await generateHash(changePassword.newPassword);

        await this.updatePassword(hashedPassword);

        return { message: "Contraseña cambiada exitosamente" };
      } else {
        return { message: "Contraseña antigua incorrecta" };
      }
    } else {
      return { message: "Usuario no encontrado" };
    }
  }

  //REPOSITORIO QUE SE UTILIZA EN CHANGEPASSWORD, SU FUNCION ES ACTUALIZAR LA CONTRASEÑA EN LA BASE DE DATOS
  static updatePassword(newPassword:any) {
    
    const sql = "UPDATE clients SET contrasenia = ? WHERE idCliente = ?";
    const values = [newPassword.newPassword, newPassword.idCliente];

    return db.execute(sql, values);
  }

  static delete(idClient: string) {
    const sql = "DELETE FROM clients WHERE idCliente = ?";
    const values = [idClient];
    return db.execute(sql, values);
  }
}

export default UserRepository;
