import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function InputForm() {
  const [inputs, setInputs] = useState({
    g: 9.81,
    V: 100,
    L: 10,
    zeta: 0.1,
    tEnd: 200,
    dt: 0.1,
    A0: 50,
    phi: 0,
  });

  const [stability, setStability] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: parseFloat(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { g, V, L, zeta, tEnd, dt, A0, phi } = inputs;
    const omega = (2 * Math.PI * V) / L;
    const omegaDamped = omega * Math.sqrt(1 - zeta ** 2);
    const time = Array.from({ length: Math.ceil(tEnd / dt) }, (_, i) => i * dt);
    const altitude = time.map(
      (t) => A0 * Math.exp(-zeta * omega * t) * Math.cos(omegaDamped * t + phi)
    );

    if (time.length === 0 || altitude.length === 0) {
      alert("Error: Unable to calculate graph data");
      return;
    }

    navigate("/phugoid", { state: { time, altitude } });
    navigate("/root-locus", { state: { g, V, L, zeta, tEnd, dt, A0, phi, time, altitude } });
  };

  const handleCheckStability = () => {
    const zeta = inputs.zeta;
    if (zeta < 0 || zeta > 1) {
      setStability("Invalid Zeta Value");
      return;
    }
    const stabilityPercentage = 100 - zeta * 100;
    setStability(stabilityPercentage.toFixed(2));
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-4 bg-gray-200">
      <div className="form bg-white p-10 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Simulate Phugoid Motion</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Gravitational Acceleration (g)</label>
            <input
              type="number"
              name="g"
              value={inputs.g}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter g (m/s²)"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Velocity (V)</label>
            <input
              type="number"
              name="V"
              value={inputs.V}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter V (m/s)"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Length (L)</label>
            <input
              type="number"
              name="L"
              value={inputs.L}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter L (m)"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Damping Ratio (ζ)</label>
            <input
              type="number"
              name="zeta"
              value={inputs.zeta}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter ζ (unitless)"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Time End (t<sub>end</sub>)</label>
            <input
              type="number"
              name="tEnd"
              value={inputs.tEnd}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter t<sub>end</sub> (s)"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Time Step (Δt)</label>
            <input
              type="number"
              name="dt"
              value={inputs.dt}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter Δt (s)"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Initial Amplitude (A₀)</label>
            <input
              type="number"
              name="A0"
              value={inputs.A0}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter A₀ (m)"
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-lg font-semibold text-gray-700 mb-2">Phase (φ)</label>
            <input
              type="number"
              name="phi"
              value={inputs.phi}
              onChange={handleChange}
              className="p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter φ (rad)"
            />
          </div>

          {stability !== null && (
            <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg">
              <p className="text-lg font-medium">Stability: {stability}%</p>
            </div>
          )}

          <div className="flex space-x-4 mt-4">
            <button
              type="button"
              onClick={handleCheckStability}
              className="w-full py-3 bg-yellow-500 text-white font-bold rounded-lg hover:bg-yellow-600"
            >
              Check Stability
            </button>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700"
            >
              Simulate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InputForm;
