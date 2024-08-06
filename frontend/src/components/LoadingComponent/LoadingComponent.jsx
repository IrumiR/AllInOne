import BounceLoader from "react-spinners/BounceLoader";


function LoadingComponent() {

    // disbalbe scrolling
    // document.body.style.overflow = "hidden"

  return (
    <div className="fixed bg-white bg-opacity-50 left-0 top-0 z-50 w-screen h-screen grid place-items-center place-content-center backdrop-blur">
        <BounceLoader color="#2563eb" />
        <div className="text-primary mt-2">Loading, Please wait...</div>
    </div>
  )
}

export default LoadingComponent