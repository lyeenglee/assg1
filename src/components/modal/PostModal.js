import {
  Avatar,
  Box,
  Button,
  Card,
  Input,
  InputLabel,
  Modal,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";

const PostModal = ({
  header,
  isModalOpen,
  handleCloseModal,
  handleSubmit,
  postId,
}) => {
  const { user } = useSelector((state) => state.user);
  const { postList, commentList } = useSelector((state) => state.post);
  const post = postList.find((post) => post.id === Number(postId));
  const showComment = header !== "Add Post";

  const [title, setTitle] = React.useState(post ? post.title : "");
  const [body, setBody] = React.useState(post ? post.body : "");
  const [comments, setComments] = React.useState(commentList || []);

  const onClickPost = () => {
    handleSubmit({
      post: { title, body, id: Number(postId) },
      comment: comments,
    });
    setTitle("");
    setBody("");
    setComments([]);
  };

  const handleCommentChange = (index, value) => {
    setComments((prevComments) => {
      const newComments = [...prevComments];
      newComments[index] = { ...newComments[index], body: value };
      return newComments;
    });
  };

  const handleNewComment = () => {
    setComments((prevComments) => [
      ...prevComments,
      {
        name: user.username,
        email: user.email,
        body: "",
        id: comments.length + 1,
      },
    ]);
  };

  const handleDeleteComment = (index) => {
    setComments((prevComments) => {
      const newComments = [...prevComments];
      newComments.splice(index, 1);
      return newComments;
    });
  };

  useEffect(() => {
    if (!postId) {
      setComments([]);
    }
  }, [postId]);

  return (
    <Modal
      open={isModalOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#D9D9D9",
            padding: 3,
            borderRadius: 2,
            boxShadow: 24,
            textAlign: "center",
            width: "65%",
          }}
        >
          <div className="modal-container">
            <Typography
              sx={{
                fontSize: 32,
                marginBottom: "20px",
                textAlign: "left",
                color: "maroon",
                fontFamily: "Poppins, sans-serif",
                fontWeight: "bold",
              }}
              variant="h6"
            >
              {header}
            </Typography>
            <div className="modal-img-container">
              <Card
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  boxSizing: "border-box",
                }}
              >
                {post?.img ? (
                  <img
                    src={post?.img}
                    alt="Random"
                    loading="lazy"
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                ) : (
                  <InsertPhotoIcon
                    sx={{ width: "100%", height: "100%", color: "gray" }}
                  />
                )}
              </Card>
              <Card
                style={{
                  display: "flex",
                  flex: 1,
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  boxSizing: "border-box",
                  padding: "20px",
                }}
              >
                <div
                  style={{
                    textAlign: "left",
                    marginBottom: "20px",
                    width: "100%",
                  }}
                >
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Title"
                    value={title}
                    sx={{
                      "& .MuiInputBase-input::placeholder": {
                        color: "black",
                      },
                      width: "100%",
                    }}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "20px",
                    overflowY: "scroll",
                    minHeight: "calc(10vh + 100px)",
                    maxHeight: "calc(-200px + 60vh)",
                    flex: 1,
                  }}
                >
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <TextareaAutosize
                    onChange={(e) => setBody(e.target.value)}
                    id="description"
                    style={{
                      width: "100%",
                      resize: "none",
                      maxWidth: "calc(100% - (2vh))",
                    }}
                    placeholder="Enter Your Description"
                    value={body}
                  />

                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ paddingTop: "10px" }}
                  >
                    Comments
                  </Typography>
                  {comments.length > 0 ? (
                    comments.map((comment, i) => (
                      <>
                        <div key={comment.id} className="comment-item">
                          <div className="comment-item1">
                            <div className="comment-item2">
                              <div className="avatar-email">
                                <Avatar
                                  sx={{
                                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                                  }}
                                ></Avatar>
                                <div className="user-detail">
                                  <Typography
                                    variant="subtitle"
                                    component="div"
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
                              {Object.keys(user).length !== 0 && (
                                <Button
                                  onClick={() => handleDeleteComment(i)}
                                  variant="transparent"
                                >
                                  <DeleteIcon />
                                </Button>
                              )}
                            </div>
                          </div>

                          <TextareaAutosize
                            onChange={(e) =>
                              handleCommentChange(i, e.target.value)
                            }
                            id="comments"
                            placeholder="Comment"
                            value={comment?.body || ""}
                            fullWidth
                            style={{
                              resize: "none",
                              maxWidth: "calc(100% - (2vh))",
                              marginBottom: "10px",
                              marginTop: "10px",
                              paddingLeft: "10px",
                            }}
                            disabled={user?.email !== comment?.email}
                          />
                        </div>
                      </>
                    ))
                  ) : (
                    <>
                      <InputLabel
                        htmlFor="description"
                        style={{ textAlign: "left" }}
                      >
                        Comments
                      </InputLabel>
                      <p>No comments available</p>
                    </>
                  )}
                </div>
                {showComment && (
                  <Button
                    onClick={handleNewComment}
                    sx={{ width: 150, height: 30 }}
                    variant="contained"
                  >
                    New Comment
                  </Button>
                )}
              </Card>
            </div>
            <div className="modal-buttons">
              <Button
                onClick={handleCloseModal}
                sx={{ width: 100, bgcolor: "red" }}
                variant="contained"
              >
                Cancel
              </Button>
              <Button
                onClick={onClickPost}
                sx={{ width: 100, bgcolor: "black" }}
                variant="contained"
                disabled={title.trim() === "" || body.trim() === ""}
              >
                Post
              </Button>
            </div>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default PostModal;
