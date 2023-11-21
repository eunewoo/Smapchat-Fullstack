import React, { useState, useEffect } from "react";
import { Form, Spinner } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import { fetchUserMaps } from "../../../util/mapUtil";
import ScrollableGallery from "../../reuseable/ScrollableGallery";

const MyMapsPage = () => {
  const [isToggledDate, setIsToggledDate] = useState(false);

  const [isToggledRating, setIsToggledRating] = useState(false);

  const handleToggleDate = () => setIsToggledDate(!isToggledDate);

  const handleToggleRating = () => setIsToggledRating(!isToggledRating);

  //this function returns full list of users map
  const getUserMaps = async () => {
    console.log(maps);
  };
  const [maps, setMaps] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const exampleUserId = "6556b9cde82b7d9bd50261ff"; // relace this
        var maps = await fetchUserMaps(exampleUserId);
        setMaps(maps);
        console.log("fetch set true");
        setDataFetched(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (dataFetched) {
    return (
      <div className="container-fluid px-5 py-3 m-0">
        <div className="row px-0 py-0 m-0 mb-3">
          <div className="col text-white">Your Maps</div>
          <div className="col-auto justify-content-end">
            <div className="filter d-flex align-items-center">
              <div className="text-black me-3">Date</div>
              <Form className="me-4">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label=""
                  checked={isToggledDate}
                  onChange={handleToggleDate}
                />
              </Form>
              <div className="text-black me-3">Rating</div>
              <Form className="me-4">
                <Form.Check
                  type="switch"
                  id="custom-switch"
                  label=""
                  checked={isToggledRating}
                  onChange={handleToggleRating}
                />
              </Form>
              <div className="d-flex align-items-center">
                <button
                  className="btn rounded-circle me-2"
                  style={{
                    width: "28px",
                    height: "28px",
                    display: "flex",
                    backgroundColor: "#4ACEFF",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "7px",
                  }}
                  onClick={getUserMaps}
                >
                  <BsSearch color="white" />
                </button>
                <input
                  type="text"
                  className="form-control ml-2"
                  placeholder="Search for maps"
                  style={{
                    width: "220px",
                    borderRadius: "16px",
                    height: "28px",
                    padding: "0 12px",
                    display: "flex",
                    alignItems: "center",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <ScrollableGallery
          fetchFunction={async (row, numberOfColumns) => {
            const exampleUserId = "6556b9cde82b7d9bd50261ff"; // replace this with the actual user ID
            return await fetchUserMaps(exampleUserId, row, numberOfColumns);
          }}
          numberOfColumns={3}
          height={170}
        />
      </div>
    );
  } else {
    return (
      <div
        className="d-flex align-items-center justify-content-center"
        style={{ height: "100vh" }}
      >
        <div className="text-center">
          <Spinner animation="border" role="status" variant="primary">
            <span className="sr-only"></span>
          </Spinner>
          <p className="ml-2 mt-2">Loading...</p>
        </div>
      </div>
    );
  }
};

export default MyMapsPage;
