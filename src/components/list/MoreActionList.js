import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import {
  addComment,
  deletePost,
  editPost,
  resetComment,
} from "../../slices/postSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import PostModal from "../modal/PostModal";

const MoreActionList = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenModal = () => setIsModalOpen(true);

  const onClickDelete = () => {
    dispatch(deletePost(id));
    navigate("/postList");
  };

  const onClickEdit = () => {
    handleOpenModal();
  };

  const handleEditPost = ({ post, comment }) => {
    dispatch(editPost(post));
    if (comment) {
      dispatch(resetComment());
      dispatch(addComment(comment));
    }
    handleCloseModal();
  };

  return (
    <div className="action-list">
      <Box
        sx={{
          maxWidth: 360,
          bgcolor: "background.paper",
          marginTop: "65px",
          marginLeft: "-135px",
        }}
      >
        <nav aria-label="main mailbox folders">
          <List
            sx={{
              backgroundColor: "rgba(203, 213, 225, 0.2)",
              borderColor: "rgba(203, 213, 225, 0.8)",
            }}
          >
            <ListItem disablePadding>
              <ListItemButton onClick={onClickEdit}>
                <ListItemIcon>
                  <EditIcon />
                </ListItemIcon>
                <ListItemText primary="Edit" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={onClickDelete}>
                <ListItemIcon>
                  <DeleteIcon />
                </ListItemIcon>
                <ListItemText primary="Delete" />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>

      <PostModal
        header={"Edit Post"}
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        handleSubmit={handleEditPost}
        postId={id}
      />
    </div>
  );
};

export default MoreActionList;
