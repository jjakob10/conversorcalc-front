import getComercialL from "./getComercialL";

export default function buckboost(request) {
  const { Vin, Vout, Iout, Freq, _DeltaV, _DeltaI, _DeltaVin, _DeltaIin } =
    request;

  const DeltaV = _DeltaV / 100;
  const DeltaI = _DeltaI / 100;
  const DeltaVin = _DeltaVin / 100;
  const DeltaIin = _DeltaIin / 100;
  let dutyCicle = 0;
  let Lo = 0;
  let Co = 0;
  let Ce = 0;
  let Le = 0;
  let resFreq = 0;
  let comLe = 0;
  let comCe = 0;
  let type;
  if (Vin >= Vout) {
    type = "Buck";
    dutyCicle = Vout / Vin;
    const Iin = (Vout * Iout) / Vin;
    Lo = Vin / (4 * Freq * DeltaI * Iout);
    Co = Vin / (31 * Lo * Freq * Freq * DeltaV * Vout);
    Ce = Iout / (4 * Freq * DeltaVin * Vin);
    Le = Iout / (31 * Freq * Freq * Ce * DeltaIin * Iin);
    resFreq = 1 / (2 * Math.PI * Math.sqrt(Ce * Le));
    comLe = getComercialL(Le, 1) * 1000;
    comCe = getComercialL(Ce, 1) * 1000000;
    Le = 1000 * Le;
    Ce = 1000000 * Ce;
    Ce = Ce.toFixed(2);
    Le = Le.toFixed(2);
    comCe = comCe.toFixed(2);
    comLe = comLe.toFixed(2);
    resFreq = resFreq.toFixed(2);
  } else {
    type = "Boost";
    dutyCicle = 1 - Vin / Vout;
    Lo = (Vin * dutyCicle) / (Freq * DeltaI * Iout);
    Co = (Iout * (Vout - Vin)) / (Vout * Freq * DeltaV * Vout);
    // console.log(dutyCicle, Lo, Co);
  }
  let comLo = getComercialL(Lo, 1) * 1000;
  let comCo = getComercialL(Co, 1) * 1000000;
  Lo = 1000 * Lo;
  Co = 1000000 * Co;

  comLo = comLo.toFixed(2);
  comCo = comCo.toFixed(2);

  Co = Co.toFixed(2);
  Lo = Lo.toFixed(2);

  dutyCicle = dutyCicle.toFixed(4);

  const values = {
    dutyCicle,
    Lo,
    Co,
    Le,
    Ce,
    comLo,
    comCo,
    comLe,
    comCe,
    resFreq,
    type,
  };
  // console.log(values);
  return values;
}
