import NotifyList from "../components/NotifyList";
import Sidebar from "../components/Sidebar";
import React from "react";
import Edit from "@/components/Edit";

const MyComponent = () => {
  const handleEditClick = () => {
    // Editボタンがクリックされた時の処理
    console.log("Edit button clicked");
  };

  return (
    <div>
      {/* <h1>My Component</h1> */}
      {/* <Edit onClick={handleEditClick} /> */}
      <Sidebar>
        <div className="">
          {/* <NotifyList /> */}
          <Edit onClick={handleEditClick} />
        </div>
      </Sidebar>
    </div>
  );
};

export default MyComponent;
