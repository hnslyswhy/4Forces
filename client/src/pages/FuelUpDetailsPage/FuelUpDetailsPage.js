import React, { useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import SentenceBlock from "../../components/SentenceBlock/SentenceBlock";
import Reference from "../../components/Reference/Reference";
import Translation from "../../components/Translation/Translation";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import back from "../../assets/icons/back.svg";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";
import { getASentence } from "../../utilities/api";
import useHttp from "../../utilities/useHttp";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";

const FuelUpDetailsPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const { data, status, sendRequest } = useHttp(getASentence, true);

  let _isMounted = useRef(true);
  useEffect(() => {
    sendRequest(id);
    return () => {
      _isMounted.current = false;
    };
  }, [id, sendRequest]);

  /*   useEffect(() => {
    sendRequest(id);
  }, [id, sendRequest]);
 */
  const handleGoBack = () => {
    history.push("/testprep/fuelup");
  };

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (status === "error") {
    return <NotFound />;
  }

  return (
    <main className="fuel-main">
      <div>
        <img src={back} alt="go-back" onClick={handleGoBack} />
      </div>
      <section className="fuel">
        <div className="fuel__card">
          <AudioPlayer audioArray={data.audio} />
          <SentenceBlock blockString={data["zh-cn"]} />
          <Reference referenceArray={data.audio} />
          <Translation translationString={data["zh-cn"]} />
        </div>
        <PreBackButtons
          previousId={parseInt(id) === 1000 ? "" : parseInt(id) - 1}
          nextId={parseInt(id) === 1899 ? "" : parseInt(id) + 1}
        />
        <SpeechToText />
      </section>
    </main>
  );
};

export default FuelUpDetailsPage;
