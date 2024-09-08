/* 
ZS-TASK:

Shunday function yozing, u parametridagi arrayni ichidagi 1 marta kelgan elemnetni qaytarsin.
MASALAN: singleNumber([4, 2, 1, 2, 1]) return 4

*/

import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

function singleNumber(arr) {
	const numberFrequency = {};

	arr.forEach(num => {
		numberFrequency[num] = (numberFrequency[num] || 0) + 1;
	});


	for (let num in numberFrequency) {
		if (numberFrequency[num] === 1) {
			return Number(num); 
		}
	}

	return null; 
}

console.log(singleNumber([4, 2, 1, 2, 1]));
