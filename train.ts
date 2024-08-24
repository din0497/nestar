/* 
ZN-TASK:

Shunday function yozing, uni array va number parametri bolsin. Ikkinchi parametrda berilgan raqamli indexgacha arrayni orqasiga ogirib qaytarsin.
MASALAN: rotateArray([1, 2, 3, 4, 5, 6], 3) return [5, 6, 1, 2, 3, 4]


*/

import { log } from 'console';

// eslint-disable-next-line @typescript-eslint/no-unused-vars

const rotateArray = (arr: number[], index: number): number[] => {
	const slice = arr.splice(0, index + 1);
	return [...arr, ...slice];
};

log(rotateArray([1, 2, 3, 4, 5, 6], 3));
