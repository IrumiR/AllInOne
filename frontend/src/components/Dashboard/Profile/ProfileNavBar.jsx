import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

function ProfileNavBar() {

  const user = useSelector((state) => state.user.user);
  // const [userData, setUserData] = useState(null);

  // console.log(user?.user);

  // useEffect(() => {

  //   if(user){
  //     setUserData(user);
  //   }
  // }, [user])

  return (
    <nav className="grid gap-4 text-sm text-muted-foreground">
      <Link to="/profile/" className={`font-semibold ${window.location.pathname === '/profile/' && 'text-primary'}`}>
        General
      </Link>
      {
        user?.role === "service-provider" && (
          <Link to="/profile/business-profile" className={`font-semibold ${window.location.pathname === '/profile/business-profile' && 'text-primary'}`}>Bussiness info</Link>
        )
      }

      {
        false && (
          <>
            <Link to="#">Orders</Link>
            <Link to="#">Bookings</Link>
            <Link to="#">Support</Link>
            <Link to="#">Advanced</Link>
          </>

        )
      }
    </nav>
  )
}

export default ProfileNavBar