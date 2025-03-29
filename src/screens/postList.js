import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import NavBar from "../components/topNavBar/NavBar";
import { Fab, Pagination } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostModal from "../components/modal/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { addPost, resetPost } from "../slices/postSlice";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postList } = useSelector((state) => state.post);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const handleAddPost = (post) => {
    dispatch(addPost([post]));
    handleCloseModal();
  };

  const getPostData = React.useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      dispatch(addPost(data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }, [dispatch]);

  React.useEffect(() => {
    dispatch(resetPost());
    getPostData();
  }, [dispatch, getPostData]);

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
              margin: "10px",
              backgroundColor: "rgba(203, 213, 225, 0.2)",
            }}
            key={item.id}
            onClick={() => {
              navigate(`/postDetail/${item.id}`);
            }}
          >
            {item.img ? (
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=3 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                style={{
                  width: "280px",
                  height: "280px",
                  color: "gray",
                  opacity: 0.2,
                }}
              />
            ) : (
              <InsertPhotoIcon
                sx={{
                  color: "gray",
                  opacity: 0.2,
                  width: "280px",
                  height: "280px",
                  borderRadius: "20px",
                  zIndex: 4,
                }}
              />
            )}
            <ImageListItemBar
              title={item.title}
              position="below"
              sx={{ width: "280px", marginLeft: "15px", marginRight: "15px" }}
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Pagination className="pagination" count={10} />
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

      <PostModal
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleAddPost={handleAddPost}
      />
    </div>
  );
};

export default PostList;
