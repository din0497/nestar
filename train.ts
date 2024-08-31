/* 
ZQ-TASK:

Shunday function yozing, u parametridagi array ichida 2 marta qaytarilgan sonlarni alohida araryda qaytarsin.
MASALAN: findDuplicates([1,2,3,4,5,4,3,4]) return [3, 4]


*/

import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const findDuplicates = (arr: number[]) => {
	const result = []
	for (const num of arr) {
		if (arr.filter(ele => ele === num).length > 1 && !result.includes(num)) {
			result.push(num)
		}
	}
	return result
}

log(findDuplicates([1, 2, 3, 4, 5, 4, 3, 4]))
