function horario_De_trabalho(entrada, saida){
    const inicioMin = 8*60;
    const fimMin = 18*60;
    
    let [entradaH, entradaM] = entrada.split(":").map(Number);
    let [saidaH, saidaM] = saida.split(":").map(Number);

    let entradaMin = entradaH * 60 + entradaM;
    let saidaMin = saidaH * 60 + saidaM;
    
    if(entradaMin < inicioMin || saidaMin > fimMin){
        console.log("Os valores estão fora do horário permitido");
        return;
    }

    if(entradaMin > saidaMin) {
        console.log("A hora de entrada tem que ser anterior à saída");
        return;
    }

    let tempoMin = saidaMin - entradaMin;
    horas = Math.floor(tempoMin / 60);
    min = tempoMin % 60;

    console.log(`O horário de trabalho foi de ${horas}:${min}`);    
}

horario_De_trabalho("9:39", "12:50");