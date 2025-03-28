import { Avatar, Card, Typography } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CloseIcon from "@mui/icons-material/Close";

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MoreActionList from "../components/list/MoreActionList";
import { resetPost } from "../slices/postSlice";
import { useSelector } from "react-redux";

const PostDetail = () => {
  const [showMoreAction, setShowMoreAction] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState({});
  const [comments, setComments] = useState([]);
  const { postList } = useSelector((state) => state.post);

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
    getComments(id);
  }, []);

  React.useEffect(() => {
    setDetail(postList.find((post) => post.id === Number(id)));
    setShowMoreAction(false);
  }, [postList]);

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
            {detail?.title}
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
                navigate("/postList");
              }}
            />
          </div>
        </div>

        {showMoreAction && <MoreActionList id={id} />}

        <div className="post-detail-content">
          <Typography variant="body1" component="div">
            {detail?.body}
          </Typography>

          <div className="comments-section">
            <Typography variant="h6" component="div">
              Comments
            </Typography>
            <div className="comments-list">
              {comments.map((comment, idx) => (
                <div key={comment.id} className="comment-item">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      justifyContent: "flex-start",
                      width: "30%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "10px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Avatar
                        sx={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                      ></Avatar>
                      <div
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                        }}
                      >
                        <Typography variant="subtitle" component="div">
                          {comment.name}
                        </Typography>

                        <Typography
                          variant="caption"
                          component="div"
                          style={{
                            fontStyle: "italic",
                          }}
                        >
                          {comment.email}
                        </Typography>
                      </div>
                    </div>
                  </div>

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
