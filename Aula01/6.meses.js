// 6.
// Implemente uma função que receba como argumento 
// o número do mês e imprima o nome por extenso.

function nomeDoMes(numero)
{
    if(numero < 1 || numero > 12){
        console.log('O número deve estar entre 1 e 12');
        return;
    }

    let nomes = ['','Janeiro', 'Fevereiro', 'Março', 
        'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 
        'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    
    console.log(nomes[numero]);
}

nomeDoMes(16);
nomeDoMes(1);
nomeDoMes(7);
nomeDoMes(4);
nomeDoMes(98);
nomeDoMes(2);
nomeDoMes(4);