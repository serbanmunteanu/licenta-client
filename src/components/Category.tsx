import { useHistory } from "react-router";
import { CategoryResponse } from "../data/entities/Category";

interface Props {
  category: CategoryResponse;
}

const Category: React.FC<Props> = (props: Props) => {
  const history = useHistory();

  return (
    <>
         <li
        style={{
          paddingLeft: "-15px",
          paddingRight: "-15px",
          listStyleType: "none",
        }}
      >
        <div className="row clearfix category-item">
          <div className="col-md-6 col-sm-9 col-xs-10 content">
            <div className="avatar pull-left">
              <a href="/user/admin" className="pull-left">
                <span className="avatar not-responsive avatar-rounded postIcon fs-3">
                  {props.category.image}
                </span>
              </a>
            </div>
            <h2 className="topicHeader">
              <a
                className="fs-5"
                href={`/categories/${props.category.id}/posts`}
                style={{ textDecoration: "none", color: "#6c757d" }}
              >
                {props.category.name}
              </a>
              <br />
              <small
                className="hidden-xs miniFontSize"
                style={{
                  color: "#6c757d !important",
                  textDecoration: "none !important",
                }}
              >
                <span className="timeago" style={{ color: "#6c757d" }}>
                  {props.category.shortDescription}
                </span>
              </small>
            </h2>
          </div>
          <div className="col-md-1 hidden-sm hidden-xs stats">
            <span className="human-readable-number">
              {props.category.postsNumber}
            </span>
            <br />
            <small>TOPICS</small>
          </div>
          <div className="col-md-1 hidden-sm hidden-xs stats">
            <span className="human-readable-number">{props.category.commentsNumber}</span>
            <br />
            <small>POSTS</small>
          </div>
          <div className="col-md-3 col-sm-3 teaser hidden-xs">
            <div className="card cardPost background-link-container">
              <a className="background-link" href="/topic/8/emoji-usage/1"></a>
              <p>
                <a href="/user/admin">
                  <span
                    className="avatar not-responsive avatar-rounded"
                  >
                    {props.category.lastPost.userName.charAt(0).toUpperCase()}
                  </span>
                </a>
                <a className="permalink" href="/topic/8/emoji-usage/1">
                  <span className="timeago">{new Date(props.category.lastPost.updatedAt).toLocaleString()}</span>
                </a>
              </p>
              <div className="post-content">
                {props.category.lastPost.text}
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Category;
