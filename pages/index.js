import { useState, useEffect } from "react";
import axios from "axios";
import CourseCard from "../components/cards/CourseCard";

const Index = ({ courses }) => {
  // const [courses, setCourses] = useState([]);
  // useEffect(() => {
  //   const fetchCourses = async () => {
  //     const { data } = await axios.get("/api/courses");
  //     setCourses(data);
  //   };
  //   fetchCourses();
  // }, []);

  return (
    <>
      <section className="section-1">
        {/* <img src={"home.jpg"} alt="home" /> */}
        <div className="color"></div>
        <div className="right-side">
          <div className="right-container above">
            <h1 className="emuson-title" style={{ color: "white" }}>
              EMUSON
            </h1>
            <p className="emuson-description">
              is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, bu
            </p>
            <p className="button-container">
              <a href="#all-courses" className="btnn btn-to-all-courses">
                Explore Our Courses
              </a>
            </p>
          </div>
          <div className="color-2"></div>
        </div>
      </section>

      <h2 className=" text-center title-2  jumbotron square ">
        Check Out Our Newest Courses
      </h2>
      <div></div>
      <div className="container-fluid" id="all-courses">
        <div className="row">
          {courses.map((course) => (
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(`${process.env.API}/courses`);
  return {
    props: {
      courses: data,
    },
  };
}

export default Index;
