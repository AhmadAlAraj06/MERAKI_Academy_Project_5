import React, { useState } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import uploadd from "./upload.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useHistory } from "react-router-dom";

const Upload = () => {
  const history = useHistory();
  const [fileInputState, setFileInputState] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [previewSource, setPreviewSource] = useState();
  const [message, setMessage] = useState("");
  const [post, setPost] = useState({ userId: localStorage.getItem("_IdUser") });

  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      posts: state.posts.posts,
    };
  });
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };
  const handleSubmitFile = async (e) => {
    e.preventDefault();
    if (!previewSource) {
      setMessage("Cant create post , please try again later")
    }else{
    await uploadImage(previewSource);
    history.push("/main");
  }};

  const uploadImage = async (base64EncodedImage) => {
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_SERVER}/post/api/upload`, {
        method: "post",
        body: JSON.stringify({ data: base64EncodedImage, post: post }),
        headers: { "Content-type": "application/json" },
      }).then((result) => {
        console.log("result", result);
        setMessage(result.data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div className="createPostStyle">
        <form>
          <div className="typePost">
            <FormControl>
              <InputLabel id="demo-simple-select-label">Type</InputLabel>
              <Select
                className="postType"
                name="type"
                onChange={handleChange}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              >
                <MenuItem value="programming">programming</MenuItem>
                <MenuItem value="sport">sport</MenuItem>
                <MenuItem value="english">english</MenuItem>
                <MenuItem value="cook">cook</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="TitlePost">
            <TextField
              id="outlined-textarea"
              label="Title"
              placeholder="Placeholder"
              multiline
              variant="outlined"
              onChange={handleChange}
              name="title"
            />
          </div>

          <div className="descriptionPost">
            <TextField
              onChange={handleChange}
              className="MuiOutlinedInput-multiline-d"
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="outlined"
              name="description"
            />
          </div>
        </form>
      </div>
      <div className="div-upload-pictures">
        <input
          type="file"
          name="image"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        {previewSource && (
          <img
            className="img-upload"
            src={previewSource}
            alt="chosen"
            style={{ height: "300px" }}
          />
        )}
        {message && <p className="msg">{message}</p>}

        <button className="buttonSubmits" onClick={handleSubmitFile}>Post</button>

      </div>
    </div>
  );
};
export default Upload;
