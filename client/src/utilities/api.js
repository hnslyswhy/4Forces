import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL; // ?????

export async function getSentencesList(endpoint) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/sentences`);
    console.log(`http://localhost:8080/sentences/${endpoint}`);
    response = await axios.get(`http://localhost:8080/sentences/${endpoint}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
    throw new Error(e.message);
  }
  return data;
}
