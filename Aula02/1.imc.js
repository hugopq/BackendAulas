function imc(peso, altura)
{
    let valor = peso / (altura * altura);
    console.log("IMC - " + valor)

    if(valor < 18.5){
        console.log("abaixo do peso");
    } else if(valor < 25){
        console.log("peso normal");
    } else if(valor < 30){
        console.log("acima do peso");
    } else {
        console.log("obesidade");
    }
}
imc(45,1.9);
imc(48,1.6);
imc(76,1.7);
imc(100,1.75);