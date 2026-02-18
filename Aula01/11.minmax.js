function min(array)
{
    let min = array[0];
    for (let i = 1; i < array.length; i++) {
        if(array[i] < min){
            min = array[i];        
        }
    }
    return min;
}

function max(array)
{
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
        if(array[i] > max){
            max = array[i];        
        }
    }
    return max;
}

function media(array){
    let soma = 0;
    for (let i = 0; i < array.length; i++) {
        soma += array[i];        
    }
    return soma / array.length;
}


array = [1,4,3,6,8,12,5,34,2,67,23];
console.log("Para o array:")
console.log(array);
console.log("O valor mínimo é:" + min(array));
console.log("O valor máximo é:" + max(array));
console.log("O valor médio é:" + media(array));