// igual ao arrayUtils mas com validações.

module.exports = {

    isEmpty: (array) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        return array.length === 0;
    },

    max: (array) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        if (array.length === 0) 
            throw new RangeError("O array não pode estar vazio.");

        let max = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] > max) max = array[i];
        }
        return max;
    },

    min: (array) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        if (array.length === 0) 
            throw new RangeError("O array não pode estar vazio.");

        let min = array[0];
        for (let i = 1; i < array.length; i++) {
            if (array[i] < min) min = array[i];
        }
        return min;
    },

    average: (array) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        if (array.length === 0) 
            throw new RangeError("O array não pode estar vazio.");

        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            if (typeof array[i] !== "number") 
                throw new TypeError(`O elemento no índice ${i} não é um número.`);
            sum += array[i];
        }
        return sum / array.length;
    },

    indexOf: (array, value) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        if (value === undefined) 
            throw new Error("O parâmetro 'value' é obrigatório.");

        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) return i;
        }
        return -1;
    },

    subArray: (array, start, end) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        if (typeof start !== "number" || typeof end !== "number") 
            throw new TypeError("'start' e 'end' devem ser números.");

        if (start < 0 || end >= array.length) 
            throw new RangeError(`Índices fora dos limites. O array tem ${array.length} elementos (0 a ${array.length - 1}).`);

        if (start > end) 
            throw new RangeError("'start' não pode ser maior do que 'end'.");

        const subArray = [];
        for (let i = start; i <= end; i++) {
            subArray.push(array[i]);
        }
        return subArray;
    },

    isSameLength: (arr1, arr2) => {
        if (!Array.isArray(arr1) 
            || !Array.isArray(arr2)) 
            throw new TypeError("Ambos os parâmetros devem ser arrays.");

        return arr1.length === arr2.length;
    },

    reverse: (array) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        const arrayRev = [];
        for (let i = array.length - 1; i >= 0; i--) {
            arrayRev.push(array[i]);
        }
        return arrayRev;
    },

    swap: (array, index1, index2) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        if (typeof index1 !== "number" 
            || typeof index2 !== "number") 
            throw new TypeError("'index1' e 'index2' devem ser números.");

        if (index1 < 0 
            || index1 >= array.length 
            || index2 < 0 
            || index2 >= array.length) 
            throw new RangeError(`Índices fora dos limites. O array tem ${array.length} elementos (0 a ${array.length - 1}).`);

        const array2 = [];
        for (let i = 0; i < array.length; i++) {
            array2.push(array[i]);
        }
        const temp = array2[index1];
        array2[index1] = array2[index2];
        array2[index2] = temp;
        return array2;
    },

    contains: (array, value) => {
        if (!Array.isArray(array)) 
            throw new TypeError("'array' deve ser um array.");

        if (value === undefined) 
            throw new Error("O parâmetro 'value' é obrigatório.");

        for (let i = 0; i < array.length; i++) {
            if (array[i] === value) return true;
        }
        return false;
    },

    concatenate: (a1, a2) => {
        if (!Array.isArray(a1) 
            || !Array.isArray(a2)) 
            throw new TypeError("Ambos os parâmetros devem ser arrays.");

        const array = [];
        for (let i = 0; i < a1.length; i++) {
            array.push(a1[i]);
        }
        for (let i = 0; i < a2.length; i++) {
            array.push(a2[i]);
        }
        return array;
    }
};