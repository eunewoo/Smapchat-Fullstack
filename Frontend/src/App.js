import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

import { createContext, useState } from "react";
import { StoreProvider } from "./contexts/GlobalStoreContext";

// Popup is much the same idea.
export const popContext = createContext();

function App() {
  const [popup, setPopup] = useState(null);

  const fullPopup =
    popup == null ? <></> : <div className="popupContainer">{popup}</div>;

  return (
    <popContext.Provider value={setPopup}>
      <StoreProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </StoreProvider>
      {fullPopup}
    </popContext.Provider>
  );
}

export default App;
