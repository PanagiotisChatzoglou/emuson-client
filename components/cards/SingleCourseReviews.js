import { Button, List, Avatar } from "antd";
const { Item } = List;

const SingleCourseReviews = ({
  reviews,
  values,
  setValues,
  handleAddReview,
  uploading,
  uploadButtonText,
  setUploadButtonText,
  progress,
  setProgress,
}) => {
  return (
    <>
      <div>
        <h2>Reviews</h2>
        <p>Create A Review</p>
      </div>
      <div>
        <form onSubmit={handleAddReview}>
          <div className="form-group pt-3">
            <textarea
              name="body"
              cols="7"
              rows="10"
              value={values.body}
              className="form-control"
              onChange={(e) => setValues({ ...values, body: e.target.value })}
            ></textarea>
          </div>
          <div className="form-group">
            <input
              type="number"
              name="rating"
              min="1"
              max="5"
              step="1"
              required
              onChange={(e) => setValues({ ...values, rating: e.target.value })}
            />
          </div>
          <Button
            onClick={handleAddReview}
            disabled={values.uploading}
            className="btn btn-primary"
            type="primary"
            size="large"
            shape="round"
          >
            Create Review
            {/* {values.loading ? "Saving..." : "Save & Continue"} */}
          </Button>
        </form>
      </div>
      {reviews && (
        <div className="container">
          <div className="row">
            <div className="col lesson-list">
              {reviews && <h4>{reviews.length} reviews</h4>}
              <div></div>
              <hr />
              <List
                itemLayout="horizontal"
                dataSource={reviews}
                renderItem={(item, index) => (
                  <Item>
                    <Item.Meta
                      avatar={<Avatar>{index + 1}</Avatar>}
                      title={item.body}
                    />
                    {item.rating}
                    {item.name}
                  </Item>
                )}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SingleCourseReviews;
