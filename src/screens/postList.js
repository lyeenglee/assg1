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

const PostList = () => {
  const dispatch = useDispatch();
  const { postList } = useSelector((state) => state.post);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const handleAddPost = (post) => {
    dispatch(addPost([post]));
    handleCloseModal();
  };

  const getPostData = async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const data = await response.json();
      dispatch(addPost(data));
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  React.useEffect(() => {
    console.log("PostList mounted");
    resetPost();
    getPostData();
  }, []);

  return (
    <div className="post-list">
      <NavBar />
      <ImageList cols={2}>
        {postList.map((item) => (
          <ImageListItem sx={{ alignItems: "center" }} key={item.id}>
            {item.img ? (
              <img
                srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=3 2x`}
                src={`${item.img}?w=248&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
              />
            ) : (
              <InsertPhotoIcon />
            )}
            <ImageListItemBar title={item.title} position="below" />
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
