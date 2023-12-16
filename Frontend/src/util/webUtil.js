/// Helper function to perform a GET request with error handling.
/// Will perform a GET to the backend on the provided route, which
/// should start with a /. Logs an error and throws null if the
/// server responds with a non-200 response code.
export async function webFetch(route) {
  console.log("all fetches:", route);
  return await fetch(`${process.env.REACT_APP_URL}${route}`, {
    withCredentials: true,
    mode: "cors",
    credentials: "include",
  }).then(async (res) => {
    if (res.status === 200 || res.status === 201) {
      const data = res.json().then((val) => {
        if (val != null) {
          return val;
        } else {
          console.log("Response body was null!");
          alert("Server responded with empty contents...");
        }
      });
      return data;
    } else {
      console.log(`Error from server when requesting ${route}: ` + res.status);

      alert(`Error from server when requesting ${route}: ` + res.status);
    }
  });
}

export async function webPut(route, data) {
  return await bodiedRequest(route, data, "PUT");
}

/// Helper function to perform a POST request with error handling.
/// will perofrm a POST request to the backend on the provided route,
/// should start with a /. Logs an error and throws null if the
/// server responds with a non-200 response code.
export async function webPost(route, data) {
  return await bodiedRequest(route, data, "POST");
}

/// Helper function to perform a DELETE request with error handling.
/// will perofrm a DELETE request to the backend on the provided route,
/// should start with a /. Logs an error and throws null if the
/// server responds with a non-200 response code.
export async function webDelete(route, data) {
  return await bodiedRequest(route, data, "DELETE");
}

/// Generic function for a bodied request of various methods. Called by the
/// exported functions above
async function bodiedRequest(route, data, method) {
  console.log(data);
  return fetch(`${process.env.REACT_APP_URL}${route}`, {
    method: method,
    withCredentials: true,
    mode: "cors",
    credentials: "include",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status === 200 || res.status === 201) {
      return await res.json().then((val) => {
        console.log(val);
        if (val != null) {
          return val;
        } else {
          console.log("Response body was null!");
          alert("Response body was null");
        }
      });
    } else {
      console.log(
        `Error from server when ${method}ing ${route}: ` + res.status
      );
      const data = await res.json({
        error: "Something went wrong while fetching",
      });
      alert(data.errorMessage);
    }
  });
}
