import './App.css';
import PublicGallery from './components/pages/PublicGallery';
import UserPage from './components/pages/UserPage.js';
import TestMapRender from './components/reuseable/TestRender.js'; 

import {createContext, useContext, useState } from "react";

// These contexts expose setters for the page and 
// popup state of this root component. To do navigation
// elsewhere in the app you should useContext(navContext)
// and then invoke it with the page component you want to
// navigate to.
export const navContext = createContext();

// Popup is much the same idea.
export const popContext = createContext();

function App() {

  // These are the states for the root component that will
  // be set by the contexts above. They are what actually is
  // rendered by the root component thus what the user will
  // see. Yep, you can use JSX as state! A wonderful feature
  // of javascripts weak typing. OR terrible, depedning how you
  // want to look at it :)
  const [popup, setPopup] = useState(<></>);

  // Page State which contains TestMapRenderer.js file is adapted
  // to show test version of visualizing 5 map graphics for build#2
  const [page, setPage] = useState(<TestMapRender />)

  
  return (
    <>
      <navContext.Provider value={setPage}>
        <popContext.Provider value={setPopup}>
          {/* <Topbar></Topbar> Not yet implemented */}
          {popup}
        </popContext.Provider>
      </navContext.Provider>
      {page}
    </>
  );
}

export default App;
