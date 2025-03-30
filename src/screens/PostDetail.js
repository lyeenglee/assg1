import { Avatar, Card, Typography } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import CloseIcon from "@mui/icons-material/Close";

import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import MoreActionList from "../components/list/MoreActionList";
import { useDispatch, useSelector } from "react-redux";
import { addComment, resetComment } from "../slices/postSlice";

const PostDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showMoreAction, setShowMoreAction] = useState(false);
  const [detail, setDetail] = useState({});

  const { user } = useSelector((state) => state.user);
  const { postList, commentList } = useSelector((state) => state.post);

  const getComments = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`
      );
      const data = await response.json();
      dispatch(addComment(data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    dispatch(resetComment());
    getComments(id);
  }, [id]);

  useEffect(() => {
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
        {detail?.img ? (
          <img
            src={detail?.img}
            alt="Random"
            loading="lazy"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "15px",
            }}
          />
        ) : (
          <InsertPhotoIcon
            sx={{ width: "100%", height: "100%", color: "gray", opacity: 0.2 }}
          />
        )}
      </Card>
      <Card
        sx={{
          flexBasis: "50%",
          marginTop: "65px",
          marginBottom: "65px",
          marginRight: "104px",
          display: "flex",
          flexDirection: "column",
          boxShadow: "0px 4px 4px rgba(5, 14, 14, 0.25)",
          minWidth: "800px",
          boxSizing: "border-box",
        }}
      >
        <div className="header-section">
          <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
            {detail?.title}
          </Typography>
          <div className="moreActionGrp">
            {Object.keys(user).length !== 0 && (
              <MoreHorizIcon
                sx={{ justifyContent: "center", height: "100%" }}
                onClick={() => {
                  setShowMoreAction(!showMoreAction);
                }}
              />
            )}

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

            {showMoreAction && <MoreActionList id={id} />}
          </div>
        </div>

        <div className="post-detail-content">
          <Typography variant="body1" component="div">
            {detail?.body}
          </Typography>

          <div className="comments-section">
            <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
              Comments
            </Typography>
            <div className="comments-list">
              {commentList.map((comment, idx) => (
                <div key={comment.id} className="comment-item">
                  <div className="comment-item1">
                    <div className="comment-item2">
                      <Avatar
                        sx={{
                          backgroundColor: "rgba(0, 0, 0, 0.5)",
                        }}
                      ></Avatar>
                      <div className="user-detail">
                        <Typography
                          variant="subtitle"
                          component="div"
                          sx={{ fontWeight: 500 }}
                        >
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
                    sx={{ paddingTop: "5px" }}
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
