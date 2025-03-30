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

  let comments = [
    {
      postId: 1,
      id: 1,
      name: "id labore ex et quam laborum",
      email: "Eliseo@gardner.biz",
      body: "laudantium enim quasi est quidem magnam voluptate ipsam eos\ntempora quo necessitatibus\ndolor quam autem quasi\nreiciendis et nam sapiente accusantium",
    },
    {
      postId: 1,
      id: 2,
      name: "quo vero reiciendis velit similique earum",
      email: "Jayne_Kuhic@sydney.com",
      body: "est natus enim nihil est dolore omnis voluptatem numquam\net omnis occaecati quod ullam at\nvoluptatem error expedita pariatur\nnihil sint nostrum voluptatem reiciendis et",
    },
    {
      postId: 1,
      id: 3,
      name: "odio adipisci rerum aut animi",
      email: "Nikita@garfield.biz",
      body: "quia molestiae reprehenderit quasi aspernatur\naut expedita occaecati aliquam eveniet laudantium\nomnis quibusdam delectus saepe quia accusamus maiores nam est\ncum et ducimus et vero voluptates excepturi deleniti ratione",
    },
    {
      postId: 1,
      id: 4,
      name: "alias odio sit",
      email: "Lew@alysha.tv",
      body: "non et atque\noccaecati deserunt quas accusantium unde odit nobis qui voluptatem\nquia voluptas consequuntur itaque dolor\net qui rerum deleniti ut occaecati",
    },
    {
      postId: 1,
      id: 5,
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
    },
    {
      postId: 1,
      id: 5,
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
    },
    {
      postId: 1,
      id: 5,
      name: "vero eaque aliquid doloribus et culpa",
      email: "Hayden@althea.biz",
      body: "harum non quasi et ratione\ntempore iure ex voluptates in ratione\nharum architecto fugit inventore cupiditate\nvoluptates magni quo et",
    },
  ];

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
            height: "70%",
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
                    backgroundColor: "pink",
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

                  {comments.map((comment, idx) => (
                    <div
                      key={comment.id}
                      style={{
                        backgroundColor: "lightblue",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{
                          wordWrap: "break-word",
                          whiteSpace: "normal",
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
                        />
                        <InputLabel
                          htmlFor="description"
                          style={{ textAlign: "left" }}
                        >
                          Comment
                        </InputLabel>
                        <Input
                          id="title"
                          placeholder="Comment"
                          value={comment.body}
                          fullWidth
                          style={{ marginBottom: "10px" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Button
                  onClick={() => {}}
                  sx={{
                    width: 80,
                    bgcolor: "blue",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                  }}
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
