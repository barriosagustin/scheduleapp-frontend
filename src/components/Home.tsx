import Navbar from "./Navbar";
import UserForm from "./UserForm";
import "../styles/home.css";
import CourseComponent from "./CourseComponent";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <img
        src="https://echooling-react.vercel.app/static/media/1.ddb463a076b58bbe0ea3.jpg"
        style={{ width: "1589px", height: "476" }}
        alt=""
      />
      <CourseComponent></CourseComponent>
    </div>
  );
};

export default Home;
