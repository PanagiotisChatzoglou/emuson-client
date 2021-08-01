import { currencyFormatter } from "../../utils/helpers";
import { Badge, Modal, Button } from "antd";
import ReactPlayer from "react-player";
import { LoadingOutLined, SafetyOutlined } from "@ant-design/icons";
const SingleCourseJumbotron = ({
  course,
  showModal,
  setShowModal,
  preview,
  setPreview,
  loading,
  user,
  handleFreeEnrollment,
  handlePaidEnrollment,
  enrolled,
  setEnrolled,
}) => {
  //destructure
  const {
    name,
    description,
    instructor,
    updatedAt,
    lessons,
    image,
    price,
    paid,
    category,
  } = course;

  return (
    <div className="jumbotron bg-primary h-100 square">
      <div className="col-md-8">
        <h1 className="text-light font-weight-bold">{name}</h1>
        <p className="lead">
          {description && description.substring(0, 160)}...
        </p>
        <Badge
          count={category}
          style={{ backgroundColor: "#03a9f4" }}
          className="pb-4 mr-2"
        />
        <p>Created By {instructor.name}</p>
        <p>Last Updated {new Date(updatedAt).toLocaleDateString()}</p>
        <h2 className="text-light">
          {paid
            ? currencyFormatter({
                amount: price,
                currency: "usd",
              })
            : "Free"}
        </h2>
        <h4>Reviews</h4>
      </div>
      <div className="col-md-4">
        {/* Show Video Preview or Course Image */}
        {lessons[0].video && lessons[0].video.Location ? (
          <div
            onClick={() => {
              setPreview(lessons[0].video.Location);
              setShowModal(!showModal);
            }}
          >
            <ReactPlayer
              className="react-player-div"
              url={lessons[0].video.Location}
              light={image.Location}
              width="100%"
              height="225px"
            />
          </div>
        ) : (
          <>
            <img src={image.Location} alt={name} className="img img-fluid" />
          </>
        )}
        {/* Enroll Burtton */}
        {loading ? (
          <div className="d-flex justify-content-center">
            <LoadingOutLined className="h1 text-danger" />
          </div>
        ) : (
          <Button
            className="mb-3 mt-3"
            type="danger"
            block
            shape="round"
            icon={<SafetyOutlined />}
            size="large"
            disabled={loading}
            onClick={paid ? handlePaidEnrollment : handleFreeEnrollment}
          >
            {user
              ? enrolled.status
                ? "Go to Course"
                : "Enroll"
              : "Login to Enroll"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SingleCourseJumbotron;
