import React from "react";
import { useHistory } from "react-router-dom";
import { PostInterface } from "../data/entities/Post";

interface Props {
  post: PostInterface;
}

const Post: React.FC<Props> = (props: Props) => {
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
                  {props.post.userName.charAt(0).toUpperCase()}
                </span>
              </a>
            </div>
            <h2 className="topicHeader">
              <a
                className="fs-5"
                href={`/posts/${props.post.id}`}
                style={{ textDecoration: "none", color: "#6c757d" }}
              >
                {props.post.title}
              </a>
              <br />
              {props.post.tags && props.post.tags.length > 0 ? (
                <span className="tag-list hidden-xs">
                  <a href="/tags/emojis">
                    <span className="tag tag-emojis">emojis</span>
                  </a>
                  <small>•</small>
                </span>
              ) : (
                ""
              )}
              <small
                className="hidden-xs miniFontSize"
                style={{
                  color: "#6c757d !important",
                  textDecoration: "none !important",
                }}
              >
                <span className="timeago" style={{ color: "#6c757d" }}>
                  {new Date(props.post.createdAt).toLocaleString()}
                </span>{" "}
                •{" "}
                <a
                  href="/user/admin"
                  style={{ color: "#6c757d", textDecoration: "none" }}
                >
                  {props.post.userName}
                </a>
              </small>
            </h2>
          </div>
          <div className="col-md-1 hidden-sm hidden-xs stats">
            <span className="human-readable-number">{props.post.votes}</span>
            <br />
            <small>Votes</small>
          </div>
          <div className="col-md-1 hidden-sm hidden-xs stats">
            <span className="human-readable-number">
              {props.post.commentsNumber}
            </span>
            <br />
            <small>posts</small>
          </div>
          <div className="col-md-1 hidden-sm hidden-xs stats">
            <span className="human-readable-number">{props.post.views}</span>
            <br />
            <small>views</small>
          </div>
          <div className="col-md-3 col-sm-3 teaser hidden-xs">
            <div className="card cardPost background-link-container">
              <a className="background-link" href="/topic/8/emoji-usage/1"></a>

              <p>
                <a href="/user/admin">
                  <span
                    className="avatar not-responsive avatar-rounded"
                  >
                    A
                  </span>
                </a>
                <a className="permalink" href="/topic/8/emoji-usage/1">
                  <span className="timeago">25 Jan 2018, 17:08</span>
                </a>
              </p>
              <div className="post-content">
                Did you know... ❓ 🌠
                <p dir="auto">
                  NodeBB comes with emoji packs built in? Choose from
                  Apple-style Emoji, Emoji One, or our favourite, Android Blob
                  Emojis! 😃 😂
                </p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </>
  );
};

export default Post;
