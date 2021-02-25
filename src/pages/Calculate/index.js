import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

export default function Register() {
  const [Vin, setVin] = useState("");
  const [Vout, setVout] = useState("");
  const [Iout, setIout] = useState("");
  const [Freq, setFreq] = useState("");
  const [DeltaV, setDeltaV] = useState("");
  const [DeltaI, setDeltaI] = useState("");
  const [DutyCicle, setDutyCicle] = useState("");
  const [Lo, setLo] = useState("");
  const [Co, setCo] = useState("");
  const [Le, setLe] = useState("");
  const [Ce, setCe] = useState("");
  const [resFreq, setResFreq] = useState("");
  const [deltaVin, setDeltaVin] = useState("");
  const [comCo, comsetCo] = useState("");
  const [deltaIin, setDeltaIin] = useState("");
  const [comCe, comsetCe] = useState("");
  const [type, setType] = useState("Buck ou Boost");
  const [hid, setHid] = useState({});

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      Vin: Number(Vin),
      Vout: Number(Vout),
      Iout: Number(Iout),
      Freq: Number(Freq),
      _DeltaV: Number(DeltaV),
      _DeltaI: Number(DeltaI),
      _DeltaIin: Number(deltaIin),
      _DeltaVin: Number(deltaVin),
    };

    try {
      Object.keys(data).forEach((item) => {
        if (data[item] === 0 || data[item] === null) {
          throw "Preencha corretamente todos os campos com números diferentes de '0'";
        }
      });
      try {
        const response = await api.post("buck", data);

        const {
          dutyCicle,
          comCo,
          comCe,
          Lo,
          Co,
          Le,
          Ce,
          resFreq,
          type,
        } = response.data;
        setDutyCicle(dutyCicle);
        setLo(Lo);
        setCo(Co);
        setLe(Le);
        setCe(Ce);
        setResFreq(resFreq);
        comsetCo(comCo);
        comsetCe(comCe);
        setType(type);
        if (Le == "0") {
          setHid({ visibility: "hidden" });
        } else {
          setHid({ visibility: "visible" });
        }
      } catch (err) {
        alert("Erro na comunicação com o servidor");
      }
    } catch (err) {
      alert(err);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <div>
            <h1>Calculo de conversor {type}</h1>
            {/* <h2>Tipo: {type}</h2> */}
            <h2>DutyCicle: {DutyCicle}</h2>
            <h2 style={hid}>Freq. de res.: {resFreq}Hz</h2>
          </div>
          <div>
            <b>Valores comerciais:</b>
            <h2>Co: {comCo}uF</h2>
            <h2 style={hid}>Ce: {comCe}uF</h2>
          </div>
          <div>
            <b>Valores reais:</b>
            <h2>Lo: {Lo}mH</h2>
            <h2>Co: {Co}uF</h2>
            <h2 style={hid}>Le: {Le}mH</h2>
            <h2 style={hid}>Ce: {Ce}uF</h2>
          </div>
          <Link
            className="back-link"
            to={{ pathname: "/inductor", state: { Lo, Le } }}
          >
            Ir para o calculo do indutor
            <FiArrowRight size={16} color="#E02041" />
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <p>Entre com os dados para calcular os valores:</p>
          <input
            type="number"
            step="any"
            placeholder="Tensão de entrada"
            value={Vin}
            onChange={(e) => setVin(e.target.value)}
          />
          <input
            type="number"
            step="any"
            placeholder="Tensão de saida"
            value={Vout}
            onChange={(e) => setVout(e.target.value)}
          />
          <input
            type="number"
            step="any"
            placeholder="Corrente de saida"
            value={Iout}
            onChange={(e) => setIout(e.target.value)}
          />

          <input
            type="number"
            step="any"
            placeholder="Frequência"
            value={Freq}
            onChange={(e) => setFreq(e.target.value)}
          />
          <div className="input-group">
            <input
              type="number"
              step="any"
              max="100"
              min="0"
              placeholder="Delta Vin (%)"
              value={deltaVin}
              onChange={(e) => setDeltaVin(e.target.value)}
            />
            <input
              type="number"
              step="any"
              max="100"
              min="0"
              placeholder="Delta Iin (%)"
              value={deltaIin}
              onChange={(e) => setDeltaIin(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input
              type="number"
              step="any"
              max="100"
              min="0"
              placeholder="Delta Vout (%)"
              value={DeltaV}
              onChange={(e) => setDeltaV(e.target.value)}
            />
            <input
              type="number"
              step="any"
              max="100"
              min="0"
              placeholder="Delta Iout (%)"
              value={DeltaI}
              onChange={(e) => setDeltaI(e.target.value)}
            />
          </div>

          <button className="button" type="submit">
            Calcular
          </button>
        </form>
      </div>
    </div>
  );
}
