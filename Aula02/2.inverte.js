function inverteString(string){    
    // let arrayDeStrings = string.split("");
    // let arrayInvertido = arrayDeStrings.reverse();
    // let stringFinal = arrayInvertido.join("");

    let stringFinal = string.split("").reverse().join("");
    console.log(stringFinal);
}

function invertePalavrasDaString(string){
    let stringFinal = string.split(" ").map(
        (palavra) => palavra.split("").reverse().join("")
    ).join(" ");
    console.log(stringFinal);
}

inverteString("Hoje é Domingo");
invertePalavrasDaString("Hoje é Domingo");