import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import NavBar from "../components/topNavBar/NavBar";
import {
  Button,
  Fab,
  FormControl,
  FormHelperText,
  Input,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import PostModal from "../components/modal/PostModal";
import { useDispatch, useSelector } from "react-redux";
import { addPost, resetPost } from "../slices/postSlice";
import { useNavigate } from "react-router-dom";
import restaurantList from "../mockData/restaurantList.json";
import { VIEW_DETAILS } from "../constants/string";
const PostList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postList } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  let uniqueCategories = Array.from(
    new Set(restaurantList.map((item) => item.category))
  );
  const [category, setCategory] = React.useState(""); // To handle the value of the select

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
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
      // const response = await fetch(
      //   "https://jsonplaceholder.typicode.com/posts"
      // );
      // const data = await response.json();
      const updatedData = restaurantList.map((item) => {
        // const randomIndex = getRandomIndex();
        return {
          ...item,
          // img: `/assets/img/Gym${randomIndex}.jpg`,
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
      <div
        style={{
          marginTop: "85px",
          display: "flex",
          margin: 1,
          flexDirection: "column",
          width: "80%",
        }}
      >
        <TextField
          id="outlined-search"
          label="Search for a restaurant"
          type="search"
          style={{ marginTop: "85px", flex: "1" }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <FormControl sx={{ width: "100%", marginTop: "15px" }}>
            <Select
              value={category}
              onChange={handleChange}
              label="Category"
              displayEmpty
              sx={{ textAlign: "left", color: "black" }}
            >
              <MenuItem value="">
                <em>All Categories</em>
              </MenuItem>

              {uniqueCategories?.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            sx={{
              ml: "auto",
              textTransform: "none",
              marginLeft: "8px",
              // marginY: "8px",
            }}
            variant="outlined"
            onClick={() => {}}
          >
            {VIEW_DETAILS}
          </Button>
        </div>
      </div>

      <ImageList
        sx={{
          backgroundColor: "#ffffff",
          top: "70px",
          marginTop: "0",
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
              borderRadius: "15px",
            }}
            key={item.id}
            onClick={() => {}}
          >
            `
            <img
              src={item.picture}
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
              title={item.name}
              position="below"
              sx={{
                width: "280px",
                marginLeft: "15px",
                marginRight: "15px",
                textAlign: "left",
              }}
            />
            <ImageListItemBar
              title={item.totRating}
              position="below"
              sx={{
                width: "280px",
                marginLeft: "15px",
                marginRight: "15px",
                textAlign: "left",
              }}
            />
            <ImageListItemBar
              title={item.category}
              position="below"
              sx={{
                width: "280px",
                marginLeft: "15px",
                marginRight: "15px",
                textAlign: "left",
              }}
            />
            <Button
              sx={{
                ml: "auto",
                textTransform: "none",
                marginRight: "8px",
                marginY: "8px",
              }}
              variant="outlined"
              onClick={() => navigate(`/postDetail/${item.id}`)}
            >
              {VIEW_DETAILS}
            </Button>
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
