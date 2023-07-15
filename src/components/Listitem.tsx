import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Button from "@mui/material/Button";

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
      <ListItem
        sx={{
          margin: "5px 5px 5px 10px", // 上下に8pxの余白を追加
        }}
      >
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={title} secondary={content} />
        <Button variant="contained" color="primary" sx={{ width: 100 }}>
          読む
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ width: 100, ml: 3, mr: 5 }}
        >
          編集する
        </Button>
      </ListItem>
    </List>
  );
};

export default FolderList;
