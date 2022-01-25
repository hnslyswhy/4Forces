import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const baseUrl = process.env.REACT_APP_API_URL; // ?????

/********* auth ************/
export async function auth() {
  let response;
  let data;
  try {
    response = await axios.get(`${baseUrl}/auth/login/success`, {
      withCredentials: true,
    });
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/*********** update progress *************/
export async function updateProgress(questionId, userId, lastPage) {
  let response;
  let data;
  try {
    response = await axios.patch(
      `${baseUrl}/auth/user/${userId}/progress/${questionId}`,
      {
        page: lastPage,
        questionId: questionId,
      }
    );
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/*********** get progress *************/
export async function getProgress(userId) {
  let response;
  let data;
  try {
    response = await axios.get(`${baseUrl}/auth/user/${userId}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get sentence list ************/
export async function getSentencesList(endpoint) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/sentences/${endpoint}`);
    response = await axios.get(`${baseUrl}/sentences/${endpoint}`);
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
    //  console.log(`${baseUrl}/sentences/${endpoint}`);
    response = await axios.get(`${baseUrl}/sentences/${id}`);
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
      `${baseUrl}/listeningquestions/${endpoint}`
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
    //  console.log(`${baseUrl}/listeningquestions/${endpoint}`);
    response = await axios.get(
      `${baseUrl}/listeningquestions/${id}`
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
    //  console.log(`${baseUrl}/speakingquestions/${id}`);
    response = await axios.get(`${baseUrl}/speakingquestions/${id}`);
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
    response = await axios.get("${baseUrl}/speakingquestions");
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get resource list ************/
export async function getResourceList(endpoint) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${endpoint}`);
    response = await axios.get(`${baseUrl}/resource/${endpoint}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get a resource  by id ************/
export async function getAResource(id) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${id}`);
    response = await axios.get(`${baseUrl}/resource/${id}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* update resource like count by id ************/
export async function patchResourceLike(id, likes) {
  let response;
  let data;

  console.log(id, likes);
  try {
    //  response = await axios.get(`${baseUrl}/resource/${id}`);
    response = await axios.patch(
      `${baseUrl}/resource/${id}/likes`,
      {
        increment: likes,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* add a comment ************/
export async function addAComment(
  resourceId,
  userId,
  username,
  avatar,
  content,
  commentPage
) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${id}`);
    response = await axios.post(
      `${baseUrl}/resource/${resourceId}/comments`,
      {
        resourceId: resourceId,
        userId: userId,
        username: username,
        avatar: avatar,
        content: content,
        commentPage: commentPage,
      }
    );
    data = response.data;
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get all comments  by resourceId ************/
export async function getAResourceComments(resourceId) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${id}`);
    response = await axios.get(
      `${baseUrl}/resource/${resourceId}/comments`
    );
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get all comments  by userId ************/
export async function getAUserComments(userId) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${id}`);
    response = await axios.get(
      `${baseUrl}/auth/user/${userId}/comments`
    );
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* delete a resource comment by id ************/
export async function deleteComment(resourceId, commentId) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${id}`);
    response = await axios.delete(
      `${baseUrl}/resource/${resourceId}/comments/${commentId}`
    );
    data = response.data;
    console.log(data);
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
    //  console.log(`${baseUrl}/sentences/${endpoint}`);
    response = await axios.get(`${baseUrl}/sentences`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}
 */

//
