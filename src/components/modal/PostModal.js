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

const PostModal = ({ isModalOpen, handleCloseModal, handleAddPost }) => {
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");

  const onClickPost = () => {
    handleAddPost({ title, body });
    setTitle("");
    setBody("");
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
              Add Post
            </Typography>
            <div className="post-detail-container">
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
                </div>
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
