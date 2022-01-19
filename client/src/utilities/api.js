import axios from "axios";
const baseUrl = process.env.REACT_APP_API_URL; // ?????

/********* get sentence list ************/
export async function getSentencesList(endpoint) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/sentences/${endpoint}`);
    response = await axios.get(`http://localhost:8080/sentences/${endpoint}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get a sentence by id ************/
export async function getASentence(id) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/sentences`);
    //  console.log(`http://localhost:8080/sentences/${endpoint}`);
    response = await axios.get(`http://localhost:8080/sentences/${id}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get listening questions list ************/
export async function getQuestionsList(endpoint) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/listeningquestions/${endpoint}`);
    response = await axios.get(
      `http://localhost:8080/listeningquestions/${endpoint}`
    );
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get a listening question by id ************/
export async function getAQuestion(id) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/listeningquestions/${endpoint}`);
    //  console.log(`http://localhost:8080/listeningquestions/${endpoint}`);
    response = await axios.get(
      `http://localhost:8080/listeningquestions/${id}`
    );
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get a speaking question by id ************/
export async function getASpeakingQuestion(id) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/speakingquestions/${id}`);
    //  console.log(`http://localhost:8080/speakingquestions/${id}`);
    response = await axios.get(`http://localhost:8080/speakingquestions/${id}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get speaking questions list ************/
export async function getSpeakingQuestionsList() {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/speakingquestions`);
    response = await axios.get("http://localhost:8080/speakingquestions");
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get all sentences ************/
/* export async function getAllSentences() {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/sentences`);
    //  console.log(`http://localhost:8080/sentences/${endpoint}`);
    response = await axios.get(`http://localhost:8080/sentences`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}
 */

//
