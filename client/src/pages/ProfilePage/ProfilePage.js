import React, { useEffect, useState } from "react";
import { getProgress } from "../../utilities/api";
import Progress from "../../components/Progress/Progress";

const ProfilePage = (props) => {
  console.log(props.user);

  const [done, setDone] = useState(null);

  useEffect(async () => {
    let result = await getProgress("61ec896563e88078b4afebb6");
    setDone(result.progress);
  }, []);

  return (
    <main>
      <section>
        <h1>Hello, {props.user.name.givenName} </h1>
        <div>
          <img src={props.user.photos[0].value} alt="profile pic" />
        </div>
      </section>

      <section>
        <h2>Your Progress</h2>
        {done ? <Progress done={done.length} /> : ""}
      </section>
    </main>
  );
};

export default ProfilePage;
