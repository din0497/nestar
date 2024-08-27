/* 
ZO-TASK:

Shunday function yozing, u parametrdagi string ichidagi qavslar miqdori balansda ekanligini aniqlasin. Ya'ni ochish("(") va yopish(")") qavslar soni bir xil bolishi kerak.
MASALAN: areParenthesesBalanced("string()ichida(qavslar)soni()balansda") return true


*/

import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-unused-vars


const areParenthesesBalanced = (str: string): boolean => {
	let balance = 0
	for (const ele of str) {
		if (ele === "(") {
			balance++
		} else if (ele === ")") {
			balance--
		}
	}
	return balance === 0
}

log(areParenthesesBalanced("string()ichida(qavslar)soni()balansda"));
