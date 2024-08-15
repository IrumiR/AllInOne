import { Toaster } from "@/components/ui/sonner"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"

function SucessAlert() {

    const showSucessAlert = () => {
        toast.success(<div>Login Successful!</div>);
    }

    const showFailedAlert = () => {
        toast.error(<div><b>Login Failed!!</b><br/> Incorrect Username or Password</div>)
    }

  return (
    <div className="my-20 h-80 flex justify-center items-center gap-2">
        <Button variant="default" onClick={showSucessAlert}>Show Sucess Alert</Button>
        <Button className="bg-red-500 hover:bg-red-700" onClick={showFailedAlert}>Show Failed Alert</Button>
        <Toaster
        position="top-right"
        richColors
        closeButton />
    </div>
  )
}

export default SucessAlert