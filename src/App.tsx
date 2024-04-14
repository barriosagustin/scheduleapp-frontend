import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Admin from "./components/Admin";
import CourseDetailComponent from "./components/CourseDetailComponent";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
// import About from "./components/About";
// import Contact from "./components/Contact";

const App = () => {
  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/course/:courseId" element={<CourseDetailComponent/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/SignUp" element={<SignUp/>} />
            {/* <Route path="/contact" element={<Contact />} /> */}
          </Routes>
        </div>
      </Router>
    </>
  );
};

export default App;
