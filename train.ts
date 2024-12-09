/* 
ZU-TASK:

Shunday function yozing, u parametridagi array ichida takrorlanmagan raqamlar yig'indisini qaytarsin.
MASALAN: sumOfUnique([1,2,3,2]) return 4




*/

import { log } from 'console';

const sumOfUnique = (arr) => {
	const obj = {};
	let result = 0;

	for (const num of arr) {
		if (!obj[num]) {
			obj[num] = 1;
			result += num; 
		} else if (obj[num] === 1) {
			obj[num]++;
			result -= num;  
		}
	}

	return result;
};

console.log(sumOfUnique([1, 2, 3, 2]));
