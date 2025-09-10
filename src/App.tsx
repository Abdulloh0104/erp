import { Outlet } from "react-router-dom";
// import MyTitle from "./components/test";
// import { useState } from "react";

const App = () => {

  // const [open,setOpen]=useState(false)
  return <Outlet />;

  // const toogle=()=>{
  //   setOpen(!open)
  // }

  // return (
  //   <>
  //     <MyTitle
  //       open={open}
  //       arr={"OPENED"}
  //       toogle={toogle}
  //             />
  //     <button onClick={() => toogle}>Open</button>
  //   </>
  // );

};

export default App;
