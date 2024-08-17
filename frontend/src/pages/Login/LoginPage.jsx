import { useState, useEffect } from "react"
import { LOCAL_STORAGE_KEYS } from "@/common/constants"
import { decodeToken } from "react-jwt"
import { login, getCurrentUser } from "@/services/auth.service"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { setIsUserAuthenticated } from "@/store/auth.slice"
import { useDispatch, useSelector } from "react-redux"
import { setUser, setUserRole } from "@/store/user.slice"
import { setIsLoading } from "@/store/loading.slice"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


function LoginPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = async (e) => {

    e.preventDefault();
    try {

      dispatch(setIsLoading(true));

      const { token } = await login(email, password);

      // set token to local storage
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);

      // decode token to get user info
      const decodedToken = decodeToken(token);

      // console.log("decoded:", decodedToken);
      if (decodedToken) {

        const userId = decodedToken.user.id;
        const userRole = decodedToken.user.role;
        setUserId(userId);

        //  save userid, access token to local storage
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, userId);
        localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ROLE, userRole);
      }

      // get current user by id
      const currentUser = await getCurrentUser(userId);

      // set user is authenticated
      dispatch(setIsUserAuthenticated(true));

      // set user in redux state
      dispatch(setUser(currentUser?.data));
      dispatch(setUserRole(currentUser?.data?.role));

      console.log("currentUser:", currentUser.data.role);

      // return false;

      // reset the login form
      setEmail('');
      setPassword('');

      // show success message
      toast.success("You have successfully logged in!");

      //  navigate to dashboard page
      if (currentUser.data.role === 'delivery-person') {
        navigate('/delivery-dashboard');
      } else {
        navigate('/dashboard');
      }

      // console.log("currentUser:", currentUser);

    } catch (error) {
      console.error("er: ", error);
    }
    finally {
      dispatch(setIsLoading(false));
    }

  }


  useEffect(() => {
    
    // check if user is authneticated
    const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
    const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE);

    if (accessToken && userId && userRole) {

      dispatch(setIsUserAuthenticated(true));
      setUserId(userId);

      toast.success("You are already logged in!");

      // redirect to profile page
      navigate('/profile');

    }

  }, []);


  return (
    <section className="mt-20">
      <div className="container py-10">
        <form action="" onSubmit={handleLogin}>
          <Card className="w-full max-w-sm mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
              </div>
            </CardContent>
            <CardFooter>
              <Button type='submit' className="w-full">Sign in</Button>
            </CardFooter>
          </Card>
        </form>
      </div>

    </section>

  )
}

export default LoginPage