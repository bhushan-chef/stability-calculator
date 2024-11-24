import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InputForm from "./components/InputForm";
import PhugoidGraph from "./components/PhugoidGraph";
import RootLocusGraph from "./components/RootLocusGraph";
import BodeGraph from "./components/BodeGraph";
import NicholsGraph from "./components/NicholsGraph";
import NyquistGraph from "./components/NyquistGraph";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<InputForm />} />
        <Route path="/phugoid" element={<PhugoidGraph />} />
        <Route path="/root-locus" element={<RootLocusGraph />} />
        <Route path="/bode" element={<BodeGraph />} />
        <Route path="/nichols" element={<NicholsGraph />} />
        <Route path="/nyquist" element={<NyquistGraph />} />
      </Routes>
    </Router>
  );
}

export default App;
