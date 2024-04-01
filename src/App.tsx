import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
// import About from "./components/About";
// import Contact from "./components/Contact";

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;