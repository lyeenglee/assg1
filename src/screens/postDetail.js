import { Card, Typography } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CloseIcon from "@mui/icons-material/Close";

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MoreActionList from "../components/list/MoreActionList";
import { resetPost } from "../slices/postSlice";

const PostDetail = () => {
  const [showMoreAction, setShowMoreAction] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);
  const getPostDetail = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      const data = await response.json();
      setDetail(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const getComments = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  React.useEffect(() => {
    console.log("PostList mounted");
    resetPost();
    getPostDetail(id);
    getComments(id);
  }, []);

  return (
    <div className="post-detail-container">
      <Card
        sx={{
          flexBasis: "50%",
          marginTop: "65px",
          marginBottom: "65px",
          marginLeft: "104px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          filter: "drop-shadow(0px 4px 4px rgba(5, 14, 14, 0.25))",
          boxSizing: "border-box",
          backgroundColor: "rgba(203, 213, 225, 0.2)",
        }}
      >
        <InsertPhotoIcon
          sx={{ width: "100%", height: "100%", color: "gray", opacity: 0.2 }}
        />
      </Card>
      <Card
        sx={{
          flexBasis: "50%",
          marginTop: "65px",
          marginBottom: "65px",
          marginRight: "104px",
          display: "flex",
          flexDirection: "column",
          filter: "drop-shadow(0px 4px 4px rgba(5, 14, 14, 0.25))",
          boxSizing: "border-box",
        }}
      >
        <div className="header-section">
          <Typography variant="h5" component="div">
            {detail.title}
          </Typography>
          <div className="moreActionGrp">
            <MoreHorizIcon
              sx={{ justifyContent: "center", height: "100%" }}
              onClick={() => {
                setShowMoreAction(!showMoreAction);
              }}
            />
            <CloseIcon
              sx={{
                width: "25px",
                height: "25px",
                backgroundColor: "#d9d9d9",
                borderRadius: 50,
                padding: "5px",
              }}
              onClick={() => {
                console.log("close icon clicked");
                navigate("/postList");
              }}
            />
          </div>
        </div>

        {showMoreAction && <MoreActionList />}

        <div className="post-detail-content">
          {/*  <Typography variant="h6" component="div">
            Subtitle
          </Typography> */}
          <Typography variant="body1" component="div">
            {/*  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean
            commodo ligula eget dolor. Aenean massa. Cum sociis.Excepteur
            efficient emerging, minim veniam anim aute carefully curated Ginza
            conversation exquisite perfect nostrud nisi intricate Content. Qui
            international first-class nulla ut. Punctual adipisicing, essential
            lovely queen tempor eiusmod irure. Exclusive izakaya charming
            Scandinavian impeccable aute quality of life soft power pariatur
            Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter
            destination Toto remarkable officia Helsinki excepteur Basset hound.
            Zürich sleepy perfect consectetur. */}
            {detail.body}
          </Typography>

          <div className="comments-section">
            <Typography variant="h6" component="div">
              Comments
            </Typography>
            <div className="comments-list">
              {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                  <Typography
                    variant="body2"
                    component="div"
                    style={{ width: "30%" }}
                  >
                    {comment.name} - {comment.email}
                  </Typography>
                  <Typography
                    variant="body2"
                    component="div"
                    style={{ width: "70%" }}
                  >
                    {comment.body}
                  </Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PostDetail;
