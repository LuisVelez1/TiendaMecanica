class User {
    _nombres: string;
    _apellidos: string;
    _email: string;
    _contrasenia: string

    constructor(
        nombres: string,
        apellidos: string,
        email: string, 
        contrasenia: string,
    ) {
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._email = email;
        this._contrasenia = contrasenia;
    }

    //Getters
    
    get nombres(): string {
        return this._nombres;
    }
        
    get apellidos(): string {
        return this._apellidos;
    }
        
    get email(): string {
        return this._email;
    }

    get contrasenia(): string {
        return this._contrasenia;
    }
            
            //Setters

            
    set nombres(nombres: string) {
        this._nombres = nombres;
        }
    
    set apellidos(apellidos: string) {
        this._apellidos = apellidos;
}
    set email(email: string) {
        this._email = email;
    }

    set contrasenia(contrasenia: string) {
        this._contrasenia = contrasenia;
    }
}

export default User;