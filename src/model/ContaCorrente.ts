import { Conta } from "./Conta";
import { ContaPoupanca } from "./ContaPoupanca";

export class ContaCorrente extends Conta {
    cadastrar(arg0: ContaPoupanca) {
        throw new Error("Method not implemented.");
    }

    private _limite: number;

    constructor(numero: number, agencia: number, tipo: number, titular: string, 
        saldo: number, limite: number) {
        super(numero, agencia, tipo, titular, saldo);
        this._limite = limite;
    }
    
    public get limite() {
        return this._limite;
    }

    public set limite(limite: number) {
        this._limite = limite;
    }

    public sacar(valor: number): boolean {

        if ((this.saldo + this._limite) < valor) {
            console.log("\n Saldo Insuficiente!");
            return false;
        }

        this.saldo = this.saldo - valor;
        return true;
    }



    visualizar(): void {
    super.visualizar();
    console.log("Limite de Crédito: " + this.limite);
}


}