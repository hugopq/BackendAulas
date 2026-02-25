module.exports = {
    isEmpty: (array) => {    
        return array.length === 0;        
    },

    max: (array) => {
        let max = array[0];
        for (let i = 1; i < array.length; i++){
            if(array[i] > max)
                max = array[i];       
        }
        return max;
    },

    min:(array) => {
        let min = array[0];
        for (let i = 1; i < array.length; i++){
            if(array[i] < min)
                min = array[i];       
        }
        return min;
    },
    
    average: (array) => {
        let sum = 0;
        for (let i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum / array.length;
    },

    indexOf: (array, value) => {
        for (let i = 0; i < array.length; i++) {
            if(array[i] === value)        
                return i;
        }
        return -1;
    },

    subArray: (array, start, end) => {
        let subArray = [];
        for (let i = start; i <= end; i++) {
            subArray.push(array[i]);
        }
        return subArray;
    },

    isSameLength: (arr1, arr2) => {
        return arr1.length === arr2.length;
    },

    reverse: (array) => {
        let arrayRev = [];
        for (let i = array.length-1; i >= 0; i--) {
            arrayRev.push(array[i]); 
        }
        return arrayRev;
    },
    
    swap: (array, index1, index2) => {
        let array2 = [];
        for (let i = 0; i < array.length; i++) {
            array2.push(array[i]);
        }
        // alterar arry original
        let int = array2[index1];
        array2[index1] = array2[index2];
        array2[index2] = int;

        return array2;
    },
    
    contains: (array, value) => {
        for (let i = 0; i < array.length; i++) {
            if(array[i] === value)        
                return true
        }
        return false;
    },
    
    concatenate: (a1, a2) => {
        let array = [];
        for (let i = 0; i < a1.length; i++) {
            array.push(a1[i]);
        }

        for (let i = 0; i < a2.length; i++) {
            array.push(a2[i]);        
        }
        return array
    }
}





