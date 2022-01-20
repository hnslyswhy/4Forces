export function createDate(num) {
  let postDate = new Date(num);
  let postMonth = postDate.getUTCMonth();
  let postDay = postDate.getUTCDate();
  let postYear = postDate.getUTCFullYear();
  postMonth = (postMonth + 1).toString().padStart(2, "0");
  postDay = postDay.toString().padStart(2, "0"); //str.padStart(targetLength, padString)
  postDate = `${postMonth}/${postDay}/${postYear}`;
  return postDate;
}

export function getTimeDifference(num) {
  let currentTime = new Date().toUTCString();
  let differenceInTime = new Date(currentTime) - new Date(num);
  let differenceInDays = parseInt(
    Math.floor(differenceInTime / (1000 * 3600 * 24))
  );
  if (differenceInDays < 1) {
    return "today";
  } else if (differenceInDays === 1) {
    return "1 day ago";
  } else {
    return ` ${differenceInDays} days ago`;
  }
}
