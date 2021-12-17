const valueArray = [
  1, 1.1, 1.2, 1.3, 1.5, 1.6, 1.8, 2, 2.2, 2.4, 2.7, 3, 3.3, 3.6, 3.9, 4.3, 4.7,
  5.1, 5.6, 6.2, 6.8, 7.5, 8.2, 9.1,
];

function comparando(atual, value) {
  return atual >= value;
}

function expoente(num) {
  let val = 1;
  while (num--) val /= 10;
  return val;
}

export default function getComercialL(Lvalue, step) {
  let count = 0;
  const stepE = expoente(step);
  while (Lvalue < 1) {
    count += step;
    Lvalue /= stepE;
  }
  const index = valueArray.findIndex((atual) => comparando(atual, Lvalue));
  if (index === 0) return valueArray[index];
  return (
    expoente(count) *
    ((valueArray[index] + valueArray[index - 1]) / 2 > Lvalue
      ? valueArray[index]
      : valueArray[index - 1])
  );
}
