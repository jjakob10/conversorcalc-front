export default function inductorCalc(request) {
  const { type, L, med, ray, ray2, u } = request;
  // console.log("ok");
  let N = 0;
  const u0 = u * 4 * Math.PI * 0.0000001;
  if (type === "cilinder") {
    N = Math.sqrt((med * L) / (u0 * Math.PI * ray * ray * 10));
  } else if (type === "toroid") {
    const Area = med * (ray2 - ray);
    const comp = 2 * Math.PI * ((ray2 + ray) / 2);
    N = Math.sqrt((comp * L) / (u0 * Area * 10));
  }
  N = N.toFixed(0);
  const values = { N };

  return values;
}
