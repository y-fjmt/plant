import React from "react";
// import ResponsiveDrawer from "@/components/Sidebar";
import { List, ListItem, ListItemText } from "@mui/material";

const View = () => {
  return (
    <div>
      <style>{`
        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
          background-color: #ffffff;
        }
      `}</style>
      <div
        style={{
          display: "flex",
          marginLeft: 770,
          marginTop: "100px",
          marginBottom: "50px",
        }}
      >
        <h1>Plant</h1>
      </div>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>{/* <ResponsiveDrawer /> */}</div>
        <div style={{ flex: 2, marginTop: 50, marginLeft: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <h2 style={{ marginLeft: "-100px" }}>Your Works</h2>
            <List>
              {[
                { title: "Folder 1", content: "Folder content 1" },
                { title: "Folder 2", content: "Folder content 2" },
                { title: "Folder 3", content: "Folder content 3" },
              ].map((item, index) => (
                <ListItem key={index} style={{ marginLeft: "-100px" }}>
                  <ListItemText primary={item.title} secondary={item.content} />
                </ListItem>
              ))}
            </List>
          </div>
          <div style={{ marginTop: 50, marginBottom: 100 }}>
            <h2 style={{ marginLeft: "-100px" }}>Your Favorite Works</h2>
            <List>
              {[
                { title: "Folder 1", content: "Folder content 1" },
                { title: "Folder 2", content: "Folder content 2" },
                { title: "Folder 3", content: "Folder content 3" },
              ].map((item, index) => (
                <ListItem key={index} style={{ marginLeft: "-100px" }}>
                  <ListItemText primary={item.title} secondary={item.content} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
