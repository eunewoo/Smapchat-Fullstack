import React, { useContext } from "react";
import { useState } from "react";
import "./MyMaps.css";
import ScrollableGallery from "../../reuseable/ScrollableGallery";
import SearchWidget from "../../reuseable/SearchWidget";
import AuthContext from "../../../contexts/AuthContext";

import { fetchUserMaps, fetchUserSearchMaps } from "../../../util/mapUtil";
import { useNavigate, useParams } from "react-router-dom";

const MyMapsPage = () => {
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  var params = useParams();

  const isLoggedIn = auth.loggedIn;

  const fetchData = async (page, limit) => {
    try {
      if (!searchTerm) {
        return await fetchUserMaps(sortTerm, page, limit, params.userId);
      } else {
        return await fetchUserSearchMaps(
          searchTerm,
          sortTerm,
          page,
          limit,
          params.userId
        );
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [sortTerm, setSortTerm] = useState("date");

  const setSearch = (value) => {
    if (value !== searchTerm) {
      setSearchTerm(value);
    }
  };

  const setSort = (value) => {
    console.log(value);
    if (value !== sortTerm) {
      setSortTerm(value);
    }
  };

  const handleNavigateToLogin = () => navigate("/login-page");

  return (
    <div className="container-fluid mt-4">
      {/* remove height and color from the css when you add components */}
      {isLoggedIn ? (
        <>
          <div className="row justify-content-center">
            <div className="left">
              <ScrollableGallery
                numberOfColumns={8}
                height={125}
                fetchFunction={fetchData}
                lastSearch={searchTerm}
                lastSort={sortTerm}
              />
            </div>
            <div className="right">
              <SearchWidget setSearchTerm={setSearch} setSortTerm={setSort} />
            </div>
          </div>
        </>
      ) : (
        <div className="text-center mt-5">
          <p>Please log in to access the My Maps feature.</p>
          <button onClick={handleNavigateToLogin} className="btn btn-primary">
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default MyMapsPage;
