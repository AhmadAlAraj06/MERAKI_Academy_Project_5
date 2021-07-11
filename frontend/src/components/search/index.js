import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../main/comment/index";
import Like from "../main/like/index";
import Save from "../main/save/index";
import MenuItem from "../main/postList";
import ShowComment from "../main/comment/show";
import "../main/allPost/allPost.css";
import MainPage from "../main/mainPage";
import { useHistory } from "react-router-dom";
import Divider from "@material-ui/core/Divider";

const SearchTitl = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [_IdPost, set_IdPost] = useState("");
  const [userId, setUserId] = useState("");
  const [aref, setAref] = useState(false);
  const [idPost, setIdPost] = useState("");
  const [posts, setPosts] = useState([]);
  const state = useSelector((state) => {
    return {
      title: state.searchTitle.search,

    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/title/${state.title}`)
      .then((res) => {
        console.log(res.data)
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state.title]);
  return (
    <>
      <div className="allpost">
        <div className="ads">
          <MainPage />
        </div>

        {posts &&
          posts.map((post, i) => {
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

                        <div className="post-tp">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="10"
                            height="10"
                            fill="currentColor"
                            class="bi bi-clock-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71V3.5z" />
                          </svg>
                        </div>

                        <div className="post-td">
                          <h5>3 min ago</h5>
                        </div>
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
                    <div className="post-informations">
                      <p className="post-title">{post.title}</p>
                      <p className="post-description">{post.description}</p>
                    </div>

                    <div className="post-information">
                      <img className="post-image" src={post.url} />
                      <div className="post-information-2"></div>
                    </div>
                    <br />
                    <Divider />

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
                    <ShowComment
                      idPost={idPost}
                      id={post._IdPost}
                      aref={aref}
                    />
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );


}

export default SearchTitl;