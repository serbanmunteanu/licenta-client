import { useHistory } from "react-router";
import { CategoryResponse } from "../data/entities/Category";

interface Props {
  category: CategoryResponse;
}

const Category: React.FC<Props> = (props: Props) => {
  const history = useHistory();

  return (
    <>
      <div className="row ps-5 pb-4">
        <div className="col-md-1 d-flex justify-content-center">
          <span className={`bg-${props.category.color} bg-gradient rounded-circle px-3 py-2`}>
            <i
              className={`bi bi-${props.category.image}`}
              style={{ fontSize: "1.7rem", color: "white" }}
            ></i>
          </span>
        </div>
        <div className="col-md-6 row">
          <span
            onClick={() => {
              history.push(`/categories/${props.category.id}/posts`);
            }}
            className="link"
          >
            {props.category.name}
          </span>
          <span className="text-muted">{props.category.shortDescription}</span>
        </div>
        <div className={`col-md-2 border-end border-${props.category.color} border-4`}>
          <div className="d-flex justify-content-between">
            <div className="d-flex flex-column">
              <span className="text-center fs-5">
                {props.category.postsNumber}
              </span>
              <span className="text-center fw-light text-secondary fs-6">
                TOPICS
              </span>
            </div>
            <div className="d-flex flex-column">
              <span className="text-center fs-5">
                {props.category.commentsNumber}
              </span>
              <span className="text-center fw-light text-secondary fs-6">
                POSTS
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="d-flex flex-column">
            <div className="d-flex">
              <span className="text-left userIcon rounded-circle px-2 text-white d-flex justify-content-center mx-2">
                {props.category.lastPost.userName?.charAt(0).toUpperCase()}
              </span>
              <span className="fw-light text-secondary fs-6">
                {new Date(props.category.lastPost.updatedAt).toLocaleString()}{" "}
              </span>
            </div>
            <div>{props.category.lastPost?.text.substring(0, 30)}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Category;
