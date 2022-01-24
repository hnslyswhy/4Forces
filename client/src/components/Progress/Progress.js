import React, { useState, useEffect } from "react";
import "./Progress.scss";

const Progress = ({ done, className }) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    setStyle({ opacity: 1, width: `${done}%` });
  }, [done]);

  return (
    <div className={`progress ${className}`}>
      <div className="progress-done" style={style}>
        {done}%
      </div>
    </div>
  );
};

export default Progress;
