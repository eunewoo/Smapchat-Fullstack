import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { AuthProvider } from "./contexts/AuthContext";
import "./App.css";

import { createContext, useState } from "react";

// Popup is much the same idea.
export const popContext = createContext();

function App() {
  const [popup, setPopup] = useState(null);

  const fullPopup =
    popup == null ? <></> : <div className="popupContainer">{popup}</div>;

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
