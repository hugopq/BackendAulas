const arrayUtils = require('./4.ArrayUtils');

const array1 = [1,2,5,4,7,9,8,3,6,5];
const array2 = [2,5,4,7,3,6,5];
const array3 = [4,7,9,8,5];
const array4 = [5,4,7,9,3,6,5];

console.log(arrayUtils.max(array1));
console.log(arrayUtils.average(array1));
console.log(arrayUtils.min(array2));
console.log(arrayUtils.reverse(array3));
console.log(arrayUtils.concatenate(array4,array2));
console.log(arrayUtils.swap(array1,6,3));
console.log(arrayUtils.contains(array1,6));