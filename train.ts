/* 
ZJ-TASK:

Shunday function yozing, u berilgan arrayni ichidagi numberlarni qiymatini hisoblab qaytarsin.
MASALAN: reduceNestedArray([1, [1, 2, [4]]]) return 8
*/

const reduceNestedArray = (arr: any): number => {
  return (arr.flat(Infinity) as number[]).reduce((a, b) => a + b, 0);
};

console.log(reduceNestedArray([1, [1, 2, [4]]]));
