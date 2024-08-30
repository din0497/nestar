/* 
ZP-TASK:

shunday function yozing, u 2 ta array parametr qabul qilsin. Siz bu ikki arrayning qiymatlari o'xshash bo'lishini (ya'ni, ularning barcha elementlari bir xil bo'lishini) tekshirishingiz kerak.

MASALAN: 
areArraysEqual([1, 2, 3], [3, 1, 2]) // true
areArraysEqual([1, 2, 3], [3, 1, 2, 1]) // true
areArraysEqual([1, 2, 3], [4, 1, 2]) // false


*/

import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const areArraysEqual = (arr1: number[], arr2: number[]): boolean => {

	for (const num of new Set(arr1)) {
		if (!new Set(arr2).has(num)) {
			return false
		}
	}
	return true
}

log(areArraysEqual([1, 2, 3], [3, 1, 2]));
log(areArraysEqual([1, 2, 3], [3, 1, 2, 1]));
log(areArraysEqual([1, 2, 3], [4, 1, 2]));
