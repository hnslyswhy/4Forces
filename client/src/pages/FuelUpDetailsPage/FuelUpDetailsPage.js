import React, { useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { getASentence } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import SentenceBlock from "../../components/SentenceBlock/SentenceBlock";
import Reference from "../../components/Reference/Reference";
import Translation from "../../components/Translation/Translation";
import SpeechToText from "../../components/SpeechToText/SpeechToText";
import back from "../../assets/icons/back.svg";
import PreBackButtons from "../../components/PreBackButtons/PreBackButtons";

const FuelUpDetailsPage = (props) => {
  const history = useHistory();
  const { id } = useParams();
  const [sentence, setSentence] = useState(null);
  const [navIds, setNavIds] = useState({});

  useEffect(async () => {
    let res = await getASentence(id);
    setSentence(res);

    setNavIds({
      previousId: res.previousId,
      nextId: res.nextId,
    });
  }, [id]);

  const handleGoBack = () => {
    history.push("/testprep/fuelup");
  };

  return (
    <>
      {!sentence && <LoadingSpinner />}
      {sentence && (
        <main className="fuel-main">
          <div>
            <img src={back} alt="go-back" onClick={handleGoBack} />
          </div>
          <section className="fuel">
            <div className="fuel__card">
              <AudioPlayer audioArray={sentence.audio} />
              <SentenceBlock blockString={sentence.audio[0].en} />
              <Reference referenceArray={sentence.audio} />
              <Translation translationString={sentence["zh-cn"]} />
            </div>
            <PreBackButtons
              previousId={navIds.previousId}
              nextId={navIds.nextId}
              cat="sentences"
            />
            <SpeechToText />
          </section>
        </main>
      )}
    </>
  );
};

export default FuelUpDetailsPage;
