import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import NavBar from "../components/topNavBar/NavBar";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostModal from "../components/modal/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { addPost, resetPost } from "../slices/postSlice";
import { useNavigate } from "react-router-dom";
const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postList } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleAddPost = (item) => {
    const randomIndex = getRandomIndex();
    dispatch(
      addPost([
        {
          ...item.post,
          id: postList.length + 1,
          img: `/assets/img/Gym${randomIndex}.jpg`,
        },
      ])
    );
    handleCloseModal();
  };

  const getRandomIndex = () => Math.floor(Math.random() * 6) + 1;

  const getPostData = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      const updatedData = data.map((item) => {
        const randomIndex = getRandomIndex();
        return {
          ...item,
          img: `/assets/img/Gym${randomIndex}.jpg`,
        };
      });
      dispatch(addPost(updatedData));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (postList.length > 0) {
      return;
    }
    dispatch(resetPost());
    getPostData();
  }, [dispatch, getPostData, postList.length]);

  return (
    <div className="post-list">
      <NavBar />
      <ImageList
        sx={{
          backgroundColor: "#ffffff",
          top: "70px",
          marginTop: "100px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {postList.map((item, idx) => (
          <ImageListItem
            sx={{
              alignItems: "center",
              display: "flex",
              margin: "20px",
              backgroundColor: "rgba(203, 213, 225, 0.2)",
              boxShadow: "0px 4px 4px rgba(5, 14, 14, 0.25)",
              boxSizing: "border-box",
            }}
            key={item.id}
            onClick={() => {
              navigate(`/postDetail/${item.id}`);
            }}
          >
            `
            <img
              src={item.img}
              alt="Random"
              loading="lazy"
              style={{
                width: "280px",
                height: "280px",
                color: "gray",
                margin: "15px",
                borderRadius: "15px",
              }}
            />
            <ImageListItemBar
              title={item.title}
              position="below"
              sx={{ width: "280px", marginLeft: "15px", marginRight: "15px" }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      {Object.keys(user).length !== 0 && (
        <Fab
          sx={{
            position: "fixed",
            bottom: 16,
            right: 16,
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
          onClick={handleOpenModal}
        >
          <AddIcon />
        </Fab>
      )}

      <PostModal
        header={"Add Post"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleAddPost}
      />
    </div>
  );
};

export default PostList;
