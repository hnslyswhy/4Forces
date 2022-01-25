import axios from "axios";

const baseUrl = process.env.REACT_APP_API_URL; // ?????

/********* auth ************/
export async function auth() {
  let response;
  let data;
  try {
    response = await axios.get(`http://localhost:8080/auth/login/success`, {
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
      `http://localhost:8080/auth/user/${userId}/progress/${questionId}`,
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
    response = await axios.get(`http://localhost:8080/auth/user/${userId}`);
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

/********* get resource list ************/
export async function getResourceList(endpoint) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${endpoint}`);
    response = await axios.get(`http://localhost:8080/resource/${endpoint}`);
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/********* get a resource  by id ************/
export async function getAResource(id, isFirstTimeVisit) {
  let response;
  let data;
  try {
    //  response = await axios.get(`${baseUrl}/resource/${id}`);
    response = await axios.get(`http://localhost:8080/resource/${id}`, {
      headers: {
        isFirstTimeVisit: isFirstTimeVisit,
      },
    });
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

  try {
    response = await axios.patch(
      `http://localhost:8080/resource/${id}/likes`,
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
    response = await axios.post(
      `http://localhost:8080/resource/${resourceId}/comments`,
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
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

/****************** edit a comment by id *******************/
export async function editAComment(resourceId, commentId, content) {
  let data;
  try {
    let response = await axios.patch(
      `http://localhost:8080/resource/${resourceId}/comments/${commentId}`,
      { content: content }
    );
    data = response.data;
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
      `http://localhost:8080/resource/${resourceId}/comments`
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
      `http://localhost:8080/auth/user/${userId}/comments`
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
      `http://localhost:8080/resource/${resourceId}/comments/${commentId}`
    );
    data = response.data;
  } catch (e) {
    console.error(e.message);
  }
  return data;
}

//
