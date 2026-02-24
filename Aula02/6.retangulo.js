function retagulo(largura, altura){
    for (let i = 0; i < altura; i++) {
        linha = "*".repeat(largura);
        // for (let j = 0; j < largura; j++) {
        //     linha += "*";            
        // }
        console.log(linha);
    }
}

retagulo(6,3);