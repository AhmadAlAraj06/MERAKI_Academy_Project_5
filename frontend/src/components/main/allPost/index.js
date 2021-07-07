import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../../../reducers/post";
import Comment from "../comment/index";
import Like from "../like/index";
import Save from "../save/index";
import MenuItem from "../postList";
import ShowComment from "../comment/show";
import IconButton from "@material-ui/core/IconButton";
import MailIcon from "@material-ui/icons/Mail";
import Badge from "@material-ui/core/Badge";
import "./allPost.css";

const AllPost = () => {
  const dispatch = useDispatch();
  const [_IdPost, set_IdPost] = useState("");
  const [userId, setUserId] = useState("");
  const [aref, setAref] = useState(false);
  const [idPost, setIdPost] = useState("");

  const state = useSelector((state) => {
    return {
      posts: state.posts.posts,
      user: state.login.user,
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post`)
      .then((res) => {
        dispatch(setPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // console.log(state.posts);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/post`)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  }, [state.posts]);

  return (
    <>
      {state.posts.length &&
        state.posts.map((post, i) => {
          return (
            <>
              <div className="div-post-comment" key={i}>
                <div className="post-div" key={i}>
                  <div className="user-information-list">
                    <div className="user-information">
                      <img
                        className="profile-picture"
                        src="https://www.attendit.net/images/easyblog_shared/July_2018/7-4-18/b2ap3_large_totw_network_profile_400.jpg"
                      />
                      <p className="user-post-name">{post.name}</p>
                    </div>
                    <div className="messege-post">
                      <IconButton color="inherit">
                        <Badge color="secondary">
                          <MailIcon />
                        </Badge>
                      </IconButton>
                    </div>
                    <div className="time">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        class="bi bi-clock-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                      </svg>
                    </div>
                    <div className="timeh">
                      <h5>3 min ago</h5>
                    </div>

                    <MenuItem
                      id={post._IdPost}
                      onClick={() => {
                        return set_IdPost(post._IdPost);
                      }}
                      userIdP={post.userId}
                      onClick={() => {
                        return setUserId(post.userId);
                      }}
                    />
                  </div>
                  <div className="post-td">
                    <p className="post-title">{post.title}</p>
                    <p className="post-description">{post.description}</p>
                  </div>
                  <div className="post-information">
                    <img className="post-image" src={post.url} />
                    <div className="post-information-2"></div>
                  </div>

                  <div className="post-reaction">
                    <div className="post-reaction-2">
                      <Like id={post._IdPost} i={i} />
                      <Comment
                        setIdPost={setIdPost}
                        setAref={setAref}
                        aref={aref}
                        id={post._IdPost}
                        i={i}
                      />
                    </div>
                    <Save id={post._IdPost} i={i} />
                  </div>
                </div>
                <div>
                  <ShowComment idPost={idPost} id={post._IdPost} aref={aref} />
                </div>
              </div>
            </>
          );
        })}
    </>
  );
};

export default AllPost;
