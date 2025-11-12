import readlinesync = require("readline-sync");
import { ContaCorrente } from './src/model/ContaCorrente';
import { ContaPoupanca } from './src/model/ContaPoupanca';
import { colors } from './src/util/Colors';
import { ContaController } from "./src/controller/ContaController";

export function main() {

    // Instancia da classe ContaController
    let contas: ContaController = new ContaController();

    // Variáveis Auxiliares
    let opcao, numero, agencia, tipo, saldo, limite, aniversario, valor, numeroDestino: number;
    let titular: string;
    const tiposContas = ['Conta Corrente', 'Conta Poupança'];

    // Objetos de Teste
    console.log("\nCriar Contas\n");

    let cc1: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 123, 1, "João da Silva", 1000, 100.0);
    contas.cadastrar(cc1);

    let cc2: ContaCorrente = new ContaCorrente(contas.gerarNumero(), 124, 1, "Maria da Silva", 2000, 100.0);
    contas.cadastrar(cc2);

    let cp1: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 125, 2, "Mariana dos Santos", 4000, 12);
    contas.cadastrar(cp1);

    let cp2: ContaPoupanca = new ContaPoupanca(contas.gerarNumero(), 126, 2, "Juliana Ramos", 8000, 15);
    contas.cadastrar(cp2);

    contas.listarTodas();

    while (true) {

        console.log(colors.bg.black, colors.fg.yellow,
            "*****************************************************");
        console.log("                                                     ");
        console.log("                BANCO DO BRAZIL COM Z                ");
        console.log("                                                     ");
        console.log("*****************************************************");
        console.log("            1 - Criar Conta                          ");
        console.log("            2 - Listar todas as Contas               ");
        console.log("            3 - Buscar Conta por Numero              ");
        console.log("            4 - Atualizar Dados da Conta             ");
        console.log("            5 - Apagar Conta                         ");
        console.log("            6 - Sacar                                ");
        console.log("            7 - Depositar                            ");
        console.log("            8 - Transferir valores entre Contas      ");
        console.log("            9 - Sair                                 ");
        console.log("*****************************************************");
        console.log("Entre com a opção desejada: ", colors.reset);

        opcao = readlinesync.questionInt("");

        if (opcao === 9) {
            console.log(colors.fg.greenstrong, "\nBanco do Brazil com Z - O seu Futuro começa aqui!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(colors.fg.whitestrong, "\n\nCriar Conta\n\n", colors.reset);

                console.log("Digite o número da agência: ");
                agencia = readlinesync.questionInt("");

                console.log("Digite o nome do Titular da conta: ");
                titular = readlinesync.question("");

                console.log("\nDigite o tipo da Conta: ");
                tipo = readlinesync.keyInSelect(tiposContas, "", { cancel: false }) + 1;

                console.log("\nDigite o Saldo da Conta (R$): ");
                saldo = readlinesync.questionFloat("");

                switch (tipo) {
                    case 1:
                        console.log("Digite o limite da Conta Corrente (R$): ");
                        let limite = readlinesync.questionFloat("");
                        contas.cadastrar(
                            new ContaCorrente(contas.gerarNumero(), agencia, tipo, titular, saldo, limite)
                        );
                        break;
                    case 2:
                        console.log("Digite o dia do aniversário da Conta Poupança: ");
                        aniversario = readlinesync.questionInt("");
                        contas.cadastrar(
                            new ContaPoupanca(contas.gerarNumero(), agencia, tipo, titular, saldo, aniversario)
                        );
                        break;
                }

                keyPress();
                break;

            case 2:
                console.log(colors.fg.whitestrong, "\n\nListar todas as Contas\n\n", colors.reset);
                contas.listarTodas();
                keyPress();
                break;

            case 3:
                console.log(colors.fg.whitestrong, "\n\nConsultar dados da Conta - por Número\n\n"
                    , colors.reset);
                    
                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");
                contas.procurarPorNumero(numero);

                keyPress();
                break;

            case 4:
    console.log(colors.fg.whitestrong, "\n\nAtualizar dados da Conta\n\n", colors.reset);

    console.log("Digite o número da conta: ");
    numero = readlinesync.questionInt("");

    // busca a conta pelo número
    let conta = contas.buscarNoArray(numero);

    if (conta != null) {

        console.log("Digite o número da Agência: ");
        agencia = readlinesync.questionInt("");

        console.log("Digite o nome do Titular da conta: ");
        titular = readlinesync.question("");

        tipo = conta.tipo;

        console.log("Digite o Saldo da Conta (R$): ");
        saldo = readlinesync.questionFloat("");

        switch (tipo) {
            case 1:
                console.log("Digite o limite da Conta (R$): ");
                limite = readlinesync.questionFloat("");

                contas.atualizar(
                    new ContaCorrente(numero, agencia, tipo, titular, saldo, limite)
                );
                break;

            case 2:
                console.log("Digite o dia do aniversário da Conta Poupança: ");
                aniversario = readlinesync.questionInt("");

                contas.atualizar(
                    new ContaPoupanca(numero, agencia, tipo, titular, saldo, aniversario)
                );
                break;
        }

    } else {
        console.log(
            colors.fg.red,
            "\nA conta número: " + numero + " não foi encontrada!",
            colors.reset
        );
    }

    keyPress();
    break;

            case 5:
                console.log(colors.fg.whitestrong, "\n\nApagar Conta\n\n", colors.reset);
                
                console.log("Digite o numero da Conta: ");
                numero = readlinesync.questionInt("");
                contas.deletar(numero);

                keyPress();
                break;

            case 6:
                console.log(colors.fg.whitestrong, "\n\nSaque\n\n", colors.reset);

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do saque (R$): ");
                saldo = readlinesync.questionFloat("");

                contas.sacar(numero, saldo);

                keyPress();
                break;

            case 7:
                console.log(colors.fg.whitestrong, "\n\nDepósito\n\n", colors.reset);

                console.log("Digite o número da conta: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o valor do depósito (R$): ");
                saldo = readlinesync.questionFloat("");

                contas.depositar(numero, saldo);

                keyPress();
                break;

            case 8:
                console.log(colors.fg.whitestrong, "\n\nTransferência entre Contas\n\n", colors.reset);

                console.log("Digite o número da conta de origem: ");
                numero = readlinesync.questionInt("");

                console.log("Digite o número da conta de destino: ");
                numeroDestino = readlinesync.questionInt("");

                console.log("Digite o valor da Deposito (R$): ");
                saldo = readlinesync.questionFloat("");

                contas.transferir(numero, numeroDestino, saldo);

                keyPress();
                break;

            default:
                console.log(colors.fg.redstrong, "\nOpção Inválida!\n", colors.reset);
                keyPress();
                break;
        }
    }
}

/* Função com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: ");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/conteudoGeneration");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione ENTER para continuar...");
    readlinesync.prompt();
}

main();
