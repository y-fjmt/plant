import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";

interface FolderListProps {
  title: string;
  content: string;
}
const FolderList: React.FC<FolderListProps> = ({ title, content }) => {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 888,
        bgcolor: "background.paper",
        ml: 30,
        mt: 10,
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={content} />
      </ListItem>
    </List>
  );
};

export default FolderList;
