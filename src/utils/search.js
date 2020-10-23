import axios from 'axios';

// https://www.digitalocean.com/community/tutorials/react-live-search-with-axios

const makeRequestCreator = () => {
  let token;

  return async (query) => {
    // Check if we made a request
    if (token) {
      // Cancel the previous request before making a new request
      token.cancel();
    }
    // Create a new CancelToken
    token = axios.CancelToken.source()
    try {
      const response = await axios(query, { cancelToken: token.token })
      const result = response.data;
      return result;
    } catch (error) {
      if (axios.isCancel(error)) {
        // Handle if request was cancelled
        // console.log('Request canceled', error.message);
        return;
      } else {
        // Handle usual errors
        console.log('Something went wrong: ', error.message)
      }
    }
  }
}

export const search = makeRequestCreator()