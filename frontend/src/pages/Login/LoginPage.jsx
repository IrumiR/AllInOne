import { useState } from "react"
import { LOCAL_STORAGE_KEYS } from "@/common/constants"
import { decodeToken } from "react-jwt"
import { login, getCurrentUser } from "@/services/auth.service"
import { Navigate, useNavigate } from "react-router-dom"

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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = async (e) => {

    e.preventDefault();
    console.log(email, password);

    try {
  
      const {token} = await login(email, password);

      // set token to local storage
      localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, token);

      console.log("token:",token);
      
      
      // decode token to get user info
      const decodedToken = decodeToken(token);
      
      console.log("decoded:",decodedToken);
      if(decodedToken) {

       const userId = decodedToken.user.id;
       setUserId(userId);

      //  set user id to local storage
        localStorage.setItem(LOCAL_STORAGE_KEYS.USER_ID, userId);
      }

      // get current user by id
      const currentUser = await getCurrentUser(userId);
      // set user authenticated(true)
      // set user redux state

      setEmail('');
      setPassword('');

      navigate('/profile');
      
    } catch (error) {
      console.error("er: ", error);
    }
    

    

  }

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