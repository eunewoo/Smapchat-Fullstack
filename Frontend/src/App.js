import './App.css';
import PublicGallery from './components/pages/PublicGallery';
import UserPage from './components/pages/UserPage.js';
import TestMapRenderer from './components/reuseable/TestRender.js'; // Adjust the import path as necessary

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

  const [page, setPage] = useState(<TestMapRenderer />)

  
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
