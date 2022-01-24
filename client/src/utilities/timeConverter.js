export function getTimeDifference(num) {
  let currentTime = Date.now();
  let differenceInTime = Math.abs(currentTime - num);
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
