import React, { useEffect, useState, useContext } from "react";
import AuthContext from "../../utilities/AuthContext";
import { useHistory } from "react-router-dom";
import { getProgress } from "../../utilities/api";
import Progress from "../../components/Progress/Progress";
import "./ProfilePage.scss";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";

const ProfilePage = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const [done, setDone] = useState(null);
  const [lastPage, setLastPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(async () => {
    try {
      let result = await getProgress("61ec896563e88078b4afebb6");
      setDone(result.progress);
      setLastPage(result.progress[0].lastPage);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setIsLoading(false);
    }
  }, []);

  const handleLogout = () => {
    window.open("http://localhost:8080/auth/logout", "_self");
  };

  const handleResume = () => {
    history.push(`${lastPage}`);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && hasError && <NotFound />}
      {!isLoading && !hasError && done && lastPage && (
        <main className="profile">
          <svg
            aria-hidden="true"
            onClick={handleLogout}
            className="profile__logout"
            focusable="false"
            data-prefix="fas"
            data-icon="sign-out-alt"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="#4696f7"
              d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
            ></path>
          </svg>
          <section className="profile__top">
            <h1 className="profile__greeting">
              Hello,
              <span className="profile__strong">
                {authCtx.user.name.givenName}
              </span>
            </h1>
            <div className="profile__container">
              <img
                src={authCtx.user.photos[0].value}
                alt="profile pic"
                className="profile__image"
              />
            </div>
          </section>

          <section className="profile__bottom">
            <h2 className="profile__progress-title">Your Progress</h2>
            {done ? (
              <Progress done={done.length} className="profile__progress" />
            ) : (
              ""
            )}
            <button onClick={handleResume}>Resume</button>
          </section>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
