import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import likes from "../img/like.png";
import { setPost } from "../../../reducers/post";
import "./like.css";

const ar = [];

const Like = ({ id, i }) => {
  const [like, setLike] = useState([]);
  const dispatch = useDispatch();


  const state = useSelector((state) => {
    return {
      posts: state.posts.posts,
      user: state.login.user,
      comments: state.comments.comments,
    };
  });

  useEffect(() => {

    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/post`)
      .then((res) => {
        res.data.reverse().forEach((post, i) => {

          ar.push(post.likes);
        });
        // dispatch(setPost(res.data));
      })
      .catch((err) => {
        console.log(err);
      });

  }, [state.posts]);

  useEffect(() => {
    setLike(ar);
  }, []);

  const likesFunction = (id, index) => {
    console.log("ar.reverse()",ar)
    let value;

    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}/user/like/${localStorage.getItem("_IdUser")}/${id}`, {
        userId: localStorage.getItem("_IdUser"),
        postId: id
      }).then((result) => {
        console.log("result", result.data)
        if (result.data.length == 0) {
          axios
            .post(`${process.env.REACT_APP_BACKEND_SERVER}/create/like`, {
              userId: localStorage.getItem("_IdUser"),
              postId: id
            }).then((result) => {
              setLike(
                like.map((post, i) => {
                  if (i === index) {
                    value = post + 1;
                    return post + 1;
                  }
                  return post;
                })
              );
              axios
                .put(`${process.env.REACT_APP_BACKEND_SERVER}/post/editLike/${id}`, { likes: value })
                .then((res) => { })
                .catch((err) => {
                  console.log(err);
                });
            })
        }
        else {
          axios
            .delete(`${process.env.REACT_APP_BACKEND_SERVER}/user/like/${localStorage.getItem("_IdUser")}/${id}`, {
            }).then((result) => {
              setLike(
                like.map((post, i) => {
                  if (i === index) {
                    value = post - 1;
                    return post - 1;
                  }
                  return post;
                })
              );
              axios
                .put(`${process.env.REACT_APP_BACKEND_SERVER}/post/editLike/${id}`, { likes: value })
                .then((res) => { })
                .catch((err) => {
                  console.log(err);
                });
            })
        }
      })
      .catch((err) => {
        console.log(err)
      })
    console.log("ae ashe")
  }

  return (
    <>
      <div className="like-div">
        <img
          onClick={() => {
            likesFunction(id, i);

          }}
          className="like-icon"
          src={likes}
        />
        {like[i] !== 0 && <p className="post-title">{like[i]}</p>}

      </div>
    </>
  );
};

export default Like;
