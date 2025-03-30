import {
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
import React from "react";
import { useSelector } from "react-redux";

const PostModal = ({
  header,
  isModalOpen,
  handleCloseModal,
  handleSubmit,
  postId,
}) => {
  const { user, isAdmin } = useSelector((state) => state.user);
  const { postList, commentList } = useSelector((state) => state.post);
  const post = postList.find((post) => post.id === Number(postId));

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
                fontSize: 24,
                marginBottom: "20px",
                textAlign: "left",
                color: "maroon",
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
                <InsertPhotoIcon
                  sx={{ width: "100%", height: "100%", color: "gray" }}
                />
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
                <div style={{ textAlign: "left", marginBottom: "20px" }}>
                  <Input
                    onChange={(e) => setTitle(e.target.value)}
                    id="title"
                    placeholder="Title"
                    value={title}
                  />
                </div>

                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    marginBottom: "20px",
                    overflowY: "scroll",
                    //  minHeight: "200px",
                    minHeight: "calc(10vh + 100px)",
                    maxHeight: "calc(-200px + 60vh)",
                    flex: 1,
                  }}
                >
                  <InputLabel htmlFor="description">Description</InputLabel>
                  <TextareaAutosize
                    onChange={(e) => setBody(e.target.value)}
                    id="description"
                    style={{ width: "100%", height: "150px", resize: "none" }}
                    placeholder="Enter Your Description"
                    value={body}
                  />

                  {comments.map((comment, i) => (
                    <div
                      key={comment.id}
                      style={{
                        // backgroundColor: "lightblue",
                        marginBottom: "20px",
                        gap: "20px",
                      }}
                    >
                      <div
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "normal",
                          outline: "1px solid black",
                        }}
                      >
                        <InputLabel
                          htmlFor="description"
                          style={{ textAlign: "left" }}
                        >
                          Name
                        </InputLabel>
                        <Input
                          id="title"
                          placeholder="Name"
                          value={comment.name}
                          style={{ marginBottom: "10px" }}
                          fullWidth
                          disabled={true}
                        />
                        <InputLabel
                          htmlFor="description"
                          style={{ textAlign: "left" }}
                        >
                          Email
                        </InputLabel>
                        <Input
                          id="title"
                          placeholder="Email"
                          value={comment.email}
                          fullWidth
                          style={{ marginBottom: "10px" }}
                          disabled={true}
                        />
                        <InputLabel
                          htmlFor="description"
                          style={{ textAlign: "left" }}
                        >
                          Comment
                        </InputLabel>
                        <Input
                          onChange={(e) =>
                            handleCommentChange(i, e.target.value)
                          }
                          id="comments"
                          placeholder="Comment"
                          value={comment?.body || ""}
                          fullWidth
                          style={{ marginBottom: "10px" }}
                        />
                        {isAdmin && (
                          <Button
                            onClick={() => handleDeleteComment(i)}
                            sx={{ width: 80, height: 30, marginBottom: "10px" }}
                            variant="contained"
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={handleNewComment}
                  sx={{ width: 150, height: 30 }}
                  variant="contained"
                >
                  New Comment
                </Button>
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
