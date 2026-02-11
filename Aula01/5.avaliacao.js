// 5. 
// Implemente uma função que calcule a nota final da 
// disciplina dada a sua nota prática e teórica e imprima 
// se o aluno está aprovado ou reprovado.

function avalia(teorica, pratica){
    let media = (teorica + pratica) / 2;
    if(media >= 9.5)
        console.log("Aprovado - " + media);
    else
        console.log("Reprovado- " + media);
}

avalia(12,15);
avalia(7,10);
avalia(8,16);
avalia(10,9);
avalia(14,9);


