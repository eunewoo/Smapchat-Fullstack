/// Helper function to perform a GET request with error handling.
/// Will perform a GET to the backend on the provided route, which
/// should start with a /. Logs an error and throws null if the
/// server responds with a non-200 response code.
export async function webFetch(route) {
  return await fetch(`${process.env.REACT_APP_URL}${route}`).then(
    async (res) => {
      if (res.status === 200 || res.status === 201) {
        const data = res.json().then((val) => {
          if (val != null) {
            console.log("webFetch", val);
            return val;
          } else {
            console.log("Response body was null!");
            throw new Error("Response body was null");
          }
        });
        return data;
      } else {
        console.log(
          `Error from server when requesting ${route}: ` + res.status
        );

        throw new Error("Server responded with non-200 code");
      }
    }
  );
}

/// Helper function to perform a PUT request with error handling.
/// will perofrm a PUT request to the backend on the provided route,
/// should start with a /. Logs an error and throws null if the
/// server responds with a non-200 response code.
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
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    if (res.status === 200 || res.status == 201) {
      return await res.json().then((val) => {
        console.log(val);
        if (val != null) {
          return val;
        } else {
          console.log("Response body was null!");
          throw new Error("Response body was null");
        }
      });
    } else {
      console.log(
        `Error from server when ${method}ing ${route}: ` + res.status
      );
      const data = await res.json();
      throw new Error(data.errorMessage);
    }
  });
}
