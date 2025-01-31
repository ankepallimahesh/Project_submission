import React, { useState } from "react";

const BorderProgress = () => {
  const [progress, setProgress] = useState(0);

  const getBorderStyle = (progress) => {
    let borderStyles = {
      borderTop: "5px solid white",
      borderRight: "5px solid white",
      borderBottom: "5px solid white",
      borderLeft: "5px solid white",
    };

    if (progress >= 25) borderStyles.borderRight = "5px solid green";
    if (progress >= 50) borderStyles.borderBottom = "5px solid green";
    if (progress >= 75) borderStyles.borderLeft = "5px solid green";
    if (progress === 100) borderStyles.borderTop = "5px solid green";

    return borderStyles;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <div
        style={{
          width: "200px",
          height: "200px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          fontWeight: "bold",
          ...getBorderStyle(progress),
        }}
      >
        {progress}%
      </div>
      <button
        onClick={() => setProgress((prev) => (prev < 100 ? prev + 25 : 0))}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Increase Progress
      </button>
    </div>
  );
};

export default BorderProgress;
