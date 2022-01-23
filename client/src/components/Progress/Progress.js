import React, { useState, useEffect } from "react";
import "./Progress.scss";

const Progress = ({ done }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({ opacity: 1, width: `${done}%` });
  }, [done]);

  return (
    <div className="progress">
      <div className="progress-done" style={style}>
        {done}%
      </div>
    </div>
  );
};

export default Progress;
