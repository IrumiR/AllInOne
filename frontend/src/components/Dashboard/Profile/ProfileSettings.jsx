import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSelector } from "react-redux"

import { districts, provinceData } from "@/common/displayOnlyData"
import { updateUserById } from "@/services/users.services"
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

import ProfileNavBar from "./ProfileNavBar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  phone: z.number().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),
  address_line_1: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  address_line_2: z.string().optional(),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  district: z.string(),
  province: z.string(),
  postal_code: z.number().min(5, {
    message: "Postal code must be at least 5 characters.",
  }),

})


function ProfileSettings() {

  const user = useSelector((state) => state.user.user)


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address_line_1: "",
      address_line_2: "",
      city: "",
      district: "",
      province: "",
      postal_code: "",
    },
  })

  const onSubmit = async (values) => {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // console.log(values)



    try {
      setIsLoading(true)
      const respose = await updateUserById(user._id, values)
      const data = respose.data
      // console.log("update data: ", data)
    } catch (error) {
      console.log("Error updating user: ", error)
    } finally {
      setIsLoading(false)
    }

  }

  useEffect(() => {

    if (user !== null && user !== undefined) {
      // console.log("user", user)
      // setFormValues
      const setFormValues = async () => {
        form.setValue('firstName', user.firstName)
        form.setValue('lastName', user.lastName)
        form.setValue('email', user.email)
        form.setValue('phone', user.phone)
        form.setValue('address_line_1', user.address_line_1)
        form.setValue('address_line_2', user.address_line_2)
        form.setValue('city', user.city)
        form.setValue('district', user.district)
        form.setValue('province', user.province)
        form.setValue('postal_code', user.postal_code)
      }

      setFormValues();
    }

  }, [form, user])

  return (
    <div className="flex w-full flex-col">
      <header className="sticky top-0 flex items-center gap-4 border-none bg-background px-4 md:px-6">
        {/* <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Dashboard
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Orders
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Customers
          </Link>
          <Link
            href="#"
            className="text-foreground transition-colors hover:text-foreground"
          >
            Settings
          </Link>
        </nav> */}
        {/* <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Dashboard
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Orders
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Products
              </Link>
              <Link
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                Customers
              </Link>
              <Link href="#" className="hover:text-foreground">
                Settings
              </Link>
            </nav>
          </SheetContent>
        </Sheet> */}
        {/* <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
      </header>
      <div className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 border rounded-md">
        <div className="mx-auto grid w-full max-w-6xl gap-4">
          <div className="flex content-center items-center gap-4 ">
            <Link to={'/dashboard/'} className="flex content-center items-center gap-4">
              <ChevronLeft className="border p-1 w-[32px] h-[32px] rounded-lg" />
              <span>To Dashboard</span>
            </Link>
          </div>
          <h1 className="text-3xl font-semibold">Profile Settings</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <ProfileNavBar />
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Personal Details</CardTitle>
                <CardDescription>
                  Edit your personal details from here.
                </CardDescription>
              </CardHeader>
              <Form  {...form}>
                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                  <CardContent>

                    <div className="form-row grid grid-cols-2 gap-x-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="First Name" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Last Name" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="form-row grid grid-cols-2 gap-x-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your Email" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Phone</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="Your Phone" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="form-row grid grid-cols-2 gap-x-4">
                      <FormField
                        control={form.control}
                        name="address_line_1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 1</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Address Line 1" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="address_line_2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Address Line 2 <span className="text-slate-400">(optional)</span></FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Address Line 2" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="form-row grid grid-cols-2 gap-x-4">

                      <FormField
                        control={form.control}
                        name="province"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Province</FormLabel>
                            <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Select a Province" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Provinces</SelectLabel>
                                  {
                                    provinceData?.map((provice) => (
                                      <SelectItem key={provice.value} value={provice.value}>{provice.name}</SelectItem>
                                    ))
                                  }
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="district"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>District<span className="text-slate-400">(optional)</span></FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="">
                                  <SelectValue placeholder="Select a District" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectGroup>
                                  <SelectLabel>Districts</SelectLabel>
                                  {
                                    districts.map((district) => (
                                      <SelectItem key={district.value} value={district.value}>{district.name}</SelectItem>
                                    ))
                                  }
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="form-row grid grid-cols-2 gap-x-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="City" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="postal_code"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Postal Code</FormLabel>
                            <FormControl>
                              <Input type="text" placeholder="Postal Code" {...field} />
                            </FormControl>
                            <FormDescription />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="border-t px-6 py-4">
                    <Button type="submit" >Save Details</Button>
                  </CardFooter>
                </form>
              </Form>

            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ProfileSettings