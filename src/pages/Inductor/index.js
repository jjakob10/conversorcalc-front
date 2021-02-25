import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

export default function Register() {
  const [hid, setHid] = useState({});
  const [L, setL] = useState("");
  const [ray, setRay] = useState("");
  const [ray2, setRay2] = useState("");
  const [u, setU] = useState("");
  const [med, setMed] = useState("");
  const [type, setType] = useState("toroid");
  const [N, setN] = useState("");
  const [medText, setMedText] = useState("Espessura (cm)");

  function handleChange(e) {
    setType(e.target.value);
    if (e.target.value === "cilinder") {
      setHid({ visibility: "hidden" });
      setMedText("Comprimento (cm)");
    } else {
      setHid({ visibility: "visible" });
      setMedText("Espessura (cm)");
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const data = {
      type,
      L: Number(L),
      ray: Number(ray),
      ray2: Number(ray2),
      u: Number(u),
      med: Number(med),
    };
    console.log(data);
    try {
      Object.keys(data).forEach((item) => {
        if ((data[item] === 0 || data[item] === null) && item !== "ray2") {
          throw "Preencha corretamente todos os campos com números diferentes de '0'";
        }
      });
      try {
        const response = await api.post("inductor", data);

        const { N } = response.data;
        setN(N);
      } catch (err) {
        alert("Erro de comunicação");
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
            <h1>Calculo de numero de volta de indutor</h1>
            <b>Entre com os dados para calcular</b>
          </div>
          <div>
            <h2>Numero de voltas: {N}</h2>
          </div>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <label>
            Escolha o tipo de indutor:
            <div class="custom-select" style={{ width: "200px" }}>
              <select value={type} onChange={handleChange}>
                <option value="toroid">Toroidal</option>
                <option value="cilinder">Cilindrico</option>
              </select>
            </div>
          </label>

          <input
            type="number"
            step="any"
            placeholder="Indutancia (mH)"
            value={L}
            onChange={(e) => setL(e.target.value)}
          />
          <input
            type="number"
            step="any"
            placeholder={medText}
            value={med}
            onChange={(e) => setMed(e.target.value)}
          />
          <input
            type="number"
            step="any"
            placeholder="permeabilidade relativa (H/m)"
            value={u}
            onChange={(e) => setU(e.target.value)}
          />

          <div className="input-group">
            <input
              type="number"
              step="any"
              min="0"
              placeholder="Inner Radius(cm)"
              value={ray}
              onChange={(e) => setRay(e.target.value)}
            />
            <input
              type="number"
              style={hid}
              step="any"
              min="0"
              placeholder="Extern Radius(cm)"
              value={ray2}
              onChange={(e) => setRay2(e.target.value)}
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
