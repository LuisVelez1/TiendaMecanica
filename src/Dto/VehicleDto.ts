class Vehicle {
    private _clienteid: number;
    private _marca: string;
    private _modelo: number;
    private _placa: string;
    private _kilometraje: number;

    constructor(
        clienteid: number,
        marca: string,
        modelo: number,
        placa: string,
        kilometraje: number
    ) {
        this._clienteid = clienteid;
        this._marca = marca;
        this._modelo = modelo;
        this._placa = placa;
        this._kilometraje = kilometraje;
    }

    get clienteid(): number {
        return this._clienteid;
    }

    set clienteid(value: number) {
        this._clienteid = value;
    }

    get marca(): string {
        return this._marca;
    }

    set marca(value: string) {
        this._marca = value;
    }

    get modelo(): number {
        return this._modelo;
    }

    set modelo(value: number) {
        this._modelo = value;
    }

    get placa(): string {
        return this._placa;
    }

    set placa(value: string) {
        this._placa = value;
    }

    get kilometraje(): number {
        return this._kilometraje;
    }

    set kilometraje(value: number) {
        this._kilometraje = value;
    }
}

export default Vehicle;
