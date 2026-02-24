function criarAluno(num,nome, nota) {
    return {
        numero: num,
        nome: nome,
        nota: nota
    };
}

const array_alunos = [
    criarAluno(1,'joão',15),
    criarAluno(2,'manuel',14),
    criarAluno(3,'ana',9),
    criarAluno(4,'francisco',18),
    criarAluno(5,'helder',16),
    criarAluno(6,'joaquim',12),
    criarAluno(7,'fernanda',13),
    criarAluno(8,'diana',7),
];

function lista(alunos){
    alunos.forEach(aluno => {
        console.log(`Aluno nº${aluno.numero} - ${aluno.nome} - nota: ${aluno.nota}`);
    });
}

function melhorNota(alunos){
    let melhorAluno = alunos[0];

    for (let i = 1; i < alunos.length; i++) {
        if(alunos[i].nota > melhorAluno.nota){
            melhorAluno = alunos[i];
        }        
    }

    console.log(`O aluno com melhor nota (${melhorAluno.nota}) `
        + `é ${melhorAluno.numero} - ${melhorAluno.nome}`);
}

function piorNota(alunos){
    let piorAluno = alunos[0];

    for (let i = 1; i < alunos.length; i++) {
        if(alunos[i].nota < piorAluno.nota){
            piorAluno = alunos[i];
        }        
    }

    console.log(`O aluno com pior nota (${piorAluno.nota}) `
        + `é ${piorAluno.numero} - ${piorAluno.nome}`);
}

function mediaNota(alunos){
    media = 0;
    alunos.forEach(aluno => {
        media += aluno.nota;
    });

    media = media / alunos.length;

    alunoMedia = alunos[0];
    diferencaAluno = Math.abs(media - alunoMedia.nota);

    for (let i = 1; i < alunos.length; i++) {
        diferenca = Math.abs(media - alunos[i].nota);
        if(diferenca < diferencaAluno){
            alunoMedia = alunos[i];
            diferencaAluno = diferenca;
        }        
    }

    console.log(`O aluno mais próximo da média (${media}) é `
        + `é ${alunoMedia.numero} - ${alunoMedia.nome} com a`
        + `nota ${alunoMedia.nota}`);
}

function notasNegativas(alunos){
    contador = 0;
    alunos.forEach(aluno => {
        if(aluno.nota < 10)
            contador++
    });
    console.log(`número de negativas: ${contador}`);
}

function notasPositivas(alunos){
    contador = 0;
    alunos.forEach(aluno => {
        if(aluno.nota >= 10)
            contador++
    });
    console.log(`número de positivas: ${contador}`);
}

console.log(array_alunos);

// lista(array_alunos);
melhorNota(array_alunos);
piorNota(array_alunos);
mediaNota(array_alunos);
notasNegativas(array_alunos);
notasPositivas(array_alunos);