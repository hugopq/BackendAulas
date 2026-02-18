// 7. 
// Implemente uma função que receba dois números e um 
// operador ( + , - , * , / ou ^) e imprima o resultado 
// da operação sobre os números.


function calcula(num1, num2, operacao){
    let res = 0;
    switch (operacao) {
        // operação +
        case "+":
            res = num1 + num2;
            break;   
        // operação - 
        case "-":
            res = num1 - num2;
            break;
        // operação * 
        case "*":
            res = num1 * num2;
            break;
        // operação / 
        case "/":
            res = num1 / num2;
            break;
        // operação potência
        case "^":
            res = num1 ** num2;
            break;
        default:
            console.log("A operação é inválida");
            return;
    }

    console.log("O resultado da operação " + num1 + " " + operacao 
        + " " + num2 + " é " + res);
}

calcula(34,56,"+");
calcula(34,56,"-");
calcula(34,56,"*");
calcula(34,56,"/");
calcula(34,56,"^");
calcula(34,56,"fd");