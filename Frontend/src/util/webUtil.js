
/// Helper function to perform a GET request with error handling.
/// Will perform a GET to the backend on the provided route, which
/// should start with a /. Logs an error and throws null if the
/// server responds with a non-200 response code.
export async function webFetch(route)
{
    fetch(`${process.env.REACT_APP_URL}${route}`).then((res) => 
    {
        if (res.status === 200)
        {
            res.json().then((val) => 
            {
                if (val != null)
                {
                    return val;
                }
                else
                {
                    console.log("Response body was null!");
                    throw null;
                }
            });
        }
        else
        {
            console.log(`Error from server when requesting ${route}: `
             + res.status);
          
            throw null;
        }
    })
}