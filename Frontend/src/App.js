import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import './App.css';
import ElementDemo from './components/pages/ElementDemo';
import {createContext, useState } from "react";

// Popup is much the same idea.
export const popContext = createContext();

function App() {

  // These are the states for the root component that will
  // be set by the contexts above. They are what actually is
  // rendered by the root component thus what the user will
  // see. Yep, you can use JSX as state! A wonderful feature
  // of javascripts weak typing. OR terrible, depedning how you
  // want to look at it :)
  const [page, setPage] = useState(<ElementDemo/>);
  const [popup, setPopup] = useState(null);

  const fullPopup = popup == null ? <></> : ( 
    <div className='popupContainer'>
      {popup}
    </div>
  );

  return (
      <popContext.Provider value={setPopup}>

        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>

        {fullPopup}
      </popContext.Provider>
  );
}

export default App;
