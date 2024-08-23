/* 
ZM-TASK:

Shunday function yozing, u function parametrga berilgan raqamlarni orqasiga ogirib qaytarsin.
MASALAN: reverseInteger(123456789) return 987654321


*/

import { log } from "console";

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const reverseInteger = (num) => {
	let reversedNum = 0;
	while (num != 0) {
		let digit = num % 10;             
		reversedNum = reversedNum * 10 + digit;  
		num = Math.floor(num / 10);  
	}
	return reversedNum;

}


log(reverseInteger(123456789))
