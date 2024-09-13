/* 
ZT-TASK:

Shunday function yozing, u parametridagi string ichida 1 martadan ortiq qaytarilmagan birinchi harf indeksini qaytarsin.
MASALAN: firstUniqueCharIndex(“stamp”) return 0


*/

import { log } from 'console';

function firstUniqueCharIndex(str) {
	const charCount = {};

	for (let char of str) {
		charCount[char] = (charCount[char] || 0) + 1;
	}

	for (let i = 0; i < str.length; i++) {
		if (charCount[str[i]] === 1) {
			return i;
		}
	}

	return -1;
}

log(firstUniqueCharIndex('stamp'));
