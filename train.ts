/* 
ZL-TASK:

Shunday function yozing, u parametrda berilgan stringni kebab casega otkazib qaytarsin. Bosh harflarni kichik harflarga ham otkazsin.
MASALAN: stringToKebab(“I love Kebab”) return “i-love-kebab”
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const stringToKebab = (str) => {
	return str.toLowerCase().split(' ').join('-');
};

console.log(stringToKebab('I love Kebab'));
