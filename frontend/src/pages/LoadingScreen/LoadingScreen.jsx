import { useState, CSSProperties } from "react";
import BounceLoader from "react-spinners/BounceLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#2563eb",
  };

function LoadingScreen() {
    let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#ffffff");

  return (
    <div className="mt-20 w-screen h-screen grid place-items-center place-content-center backdrop-blur">
        <BounceLoader color="#2563eb" />
        <div className="text-primary mt-2">Loading, Please wait...</div>
    </div>
  )
}

export default LoadingScreen