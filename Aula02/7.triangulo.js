function triangulo(altura) {
    for (let i = 0; i < altura; i++) {
        // linha = "";
        // for (let j = 0; j < i+1; j++) {
        //     linha += "*";            
        // }
        linha = "*".repeat(i+1);
        
        console.log(linha);
    }
}

triangulo(10);