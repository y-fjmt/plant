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
      <Sidebar>
        <div className="">
          <Edit onClick={handleEditClick} />
        </div>
      </Sidebar>
    </div>
  );
};

export default MyComponent;
