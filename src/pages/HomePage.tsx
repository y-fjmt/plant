import React from "react";
import ResponsiveDrawer from "@/components/Sidebar";
import HomeComponents from "@/components/Home";

const App = () => {
  return (
    <div>
      <ResponsiveDrawer />
      <HomeComponents />
    </div>
  );
};

export default App;
