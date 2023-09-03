import { Layout } from "./components/Layout.jsx";
import { CategoriesMenu } from "./components/CategoriesMenu.jsx";
import { useState } from "react";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Layout changeOpen={setOpen}/>
      <CategoriesMenu isOpened={open} handleClose={() => setOpen(false)}/>
    </>
  );
}

export default App;
