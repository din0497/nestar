/* 
ZK-TASK:

Shunday function yozing, u har soniyada bir marta consolega 1 dan 5 gacha bolgan raqamlarni chop etsin va 5 soniyadan keyin ishini toxtatsin.
MASALAN: printNumbers()
*/

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const printNumbers = () => {
  let count = 1;
  const intervalId = setInterval(() => {
    console.log(count);
    count++;

    if (count > 5) {
      clearInterval(intervalId);
    }
  }, 1000);
};

printNumbers();
