function caixa(lado){
    for (let i = 0; i < lado; i++) {
        // linha = "*".repeat(largura);
        linha = "";
        for (let j = 0; j < lado; j++) {
            if(i === 0 || i === lado-1 || j === 0 || j === lado -1)
                linha += "*";            
            else 
                linha += " ";
        }
        console.log(linha);
    }
}

function caixaRepeat(lado){
    for (let i = 0; i < lado; i++) {
        // linha = "*".repeat(largura);
        linha = "";
        if(i === 0 || i === lado-1 )
            linha = "*".repeat(lado);            
        else 
            linha = "*" + " ".repeat(lado - 2) + "*";            
    
        console.log(linha);
    }
}

caixa(6);
caixaRepeat(6);