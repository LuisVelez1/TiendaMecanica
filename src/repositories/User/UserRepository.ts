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

  static async changePassword(changePassword: ChangePassword) {
    const { id, oldPassword, newPassword } = changePassword;

    if (oldPassword === newPassword) {
      throw new Error("La nueva contraseña no puede ser igual a la anterior");
    }

    const sql = "SELECT contrasenia FROM clients WHERE idCliente = ?";
    const values = [id];
    const result: any = await db.execute(sql, values);

    if (result[0].length > 0) {
      const user = result[0][0];
      const isPasswordValid = await bcrypt.compare(oldPassword, user.contrasenia);

      if (isPasswordValid) {
        const hashedPassword = await generateHash(newPassword);

        // Aquí se debe llamar al método updatePassword con los parámetros correctos
        await this.updatePassword(id, hashedPassword);

        return { message: "Contraseña cambiada exitosamente" };
      } else {
        throw new Error("Contraseña antigua incorrecta");
      }
    } else {
      throw new Error("Usuario no encontrado");
    }
  }

  // Método para actualizar la contraseña en la base de datos
  static async updatePassword(idCliente: number, newPassword: string) {
    const sql = "UPDATE clients SET contrasenia = ? WHERE idCliente = ?";
    const values = [newPassword, idCliente];
    return db.execute(sql, values);
  }

  static async delete(idCliente: number){
    const sql = "DELETE FROM clients WHERE idCliente = ?";
    const values = [idCliente];
    return db.execute(sql, values);
  }
}

export default UserRepository;
