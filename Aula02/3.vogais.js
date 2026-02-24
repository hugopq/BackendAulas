function contaVogais(frase){
    let vogais = "aeiouAEIOUáéíóúÁÉÍÓÚàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛãõÃÕ";
    let contador = 0;

    for (let letra of frase) {
        if(vogais.includes(letra))
            contador++;
    }

    return contador;
}

let frase = "Hoje é domingo";
console.log("A frase: " + frase);
console.log("contém " + contaVogais(frase) + " vogais");