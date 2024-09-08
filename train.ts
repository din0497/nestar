/* 
ZR-TASK:

Shunday function yozing, u parametridagi string ichidagi raqam va sonlarni sonini sanasin.
MASALAN: countNumberAndLetters(“string152%\¥”) return {number:3, letter:6}

*/

import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const countNumberAndLetters = (str: string): any => {
	const result = { number: 0, letter: 0 };
	for (const char of str) {
		if (!isNaN(parseFloat(char)) && !/^[!@#$¥%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(char)) {
			result.number++;
		} else if (isNaN(parseFloat(char)) && !/^[!@#¥%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(char)) {
			result.letter++;
		}
	}
	return result;
};

console.log(countNumberAndLetters('string152%¥'));
