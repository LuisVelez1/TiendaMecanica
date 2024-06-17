import User from "../../Dto/User/UserDto";
import ChangePassword from "../../Dto/User/changePasswordDto";
import generateHash from "../../helpers/generateHash";
import UserRepository from "../../repositories/User/UserRepository";
import bcrypt from 'bcryptjs';


//Creacion de la clase UserService
class UserService {
    static async register(user: User){ //Se encarga de hashear la contraseña y agregar el usuario a la base de datos
        user.contrasenia = await generateHash(user.contrasenia);
        return await UserRepository.add(user);
    }

    static async changePassword(changePassword: ChangePassword) {
        const [result]: any = await UserRepository.getPasswordById(changePassword.id);

        // Check if the user was found
        if (result.length === 0) {
            throw new Error("Usuario no encontrado");
        }

        const user = result[0];

        // Check if the password is defined
        if (!user.contrasenia) {
            throw new Error("Contraseña no encontrada para el usuario");
        }

        // Compare the old password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(changePassword.oldPassword, user.contrasenia);

        if (!isPasswordValid) {
            throw new Error("Contraseña antigua incorrecta");
        }

        // Hash the new password before updating
        const hashedPassword = await generateHash(changePassword.newPassword);
        await UserRepository.updatePassword(changePassword.id, hashedPassword);

        return { message: "Contraseña cambiada exitosamente" };
    }
}

export default UserService;