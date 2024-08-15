import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { districts, provinceData } from "@/common/displayOnlyData"
import { servicesCategories } from "@/common/categoryNames"
import { updateServiceProviderByUserId } from "@/services/serviceproviders.service"
import { getServiceProviderByUserId } from "@/services/serviceproviders.service"
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
import { toast } from "sonner"

const formSchema = z.object({
    businessName: z.string().min(2, {
        message: "Business Name must be at least 2 characters.",
    }),
    businessAddress: z.string().min(2, {
        message: "Business Address must be at least 2 characters.",
    }),
    businessEmail: z.string().email(),
    businessWhatsApp: z.string(),
    workingAreas: z.string().min(2, {
        message: "Working Area must be at least 2 characters.",
    }),
    serviceCategories: z.string(),
    businessWebsite: z.string(),

})

function BusinessProfileSettings() {

    const user = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            businessName: "",
            businessAddress: "",
            // businessLogo: "",
            workingAreas: "",
            serviceCategories: "",
            businessWhatsApp: "",
            businessEmail: "",
            businessWebsite: "",
        },
    })

    const onSubmit = async (values) => {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // console.log(values)

        const serviceProviderData = {
            serviceProvider: {...values} 
        }

        try {
            dispatch(setIsLoading(true))
            // setIsLoading(true)
            const respose = await updateServiceProviderByUserId(user._id, serviceProviderData)
            const data = respose.data
            // console.log("update data: ", data)

            toast.success("Profile updated successfully");

            // @TODO: Update the service provider in the redux store
        } catch (error) {
            console.log("Error updating user: ", error)

            toast.error("Error updating user")
        } finally {
            dispatch(setIsLoading(false))
            // setIsLoading(false)
        }

    }

    useEffect(() => {


        const fetchServiceProviderData = async () => {
            try {
                dispatch(setIsLoading(true))
                const response = await getServiceProviderByUserId(user._id)
                const data = response.data
                return data;

                // setServiceProvider(data)
            } catch (error) {
                console.log("Error fetching service provider data: ", error)
            } 
            finally{
                dispatch(setIsLoading(false))
            }
        }

        if (user !== null && user !== undefined) {
            // console.log("user", user)
            // setFormValues

            
            const setFormValues = async () => {
                const serviceProvider = await fetchServiceProviderData();

                // console.log("service provider", serviceProvider)

                form.setValue('businessName', serviceProvider.businessName)
                form.setValue('businessAddress', serviceProvider.businessAddress)
                form.setValue('businessEmail', serviceProvider.businessEmail)   
                form.setValue('businessWhatsApp', serviceProvider.businessContactNumbers['WhatsApp'])
                form.setValue('workingAreas', serviceProvider.workingAreas[0])
                form.setValue('serviceCategories', serviceProvider.serviceCategories[0])
                form.setValue('businessWebsite', serviceProvider.businessWebsite)

            }
              setFormValues();

        }



    }, [form, user])


    return (
        <section className="mt-20">
            <div className="container">
                <div className="flex w-full flex-col">
                    <header className="sticky top-0 flex items-center gap-4 border-none bg-background px-4 md:px-6">

                    </header>
                    <div className="flex flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 border rounded-md">
                        <div className="mx-auto grid w-full max-w-6xl gap-2">
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
                                        <CardTitle>Business Details</CardTitle>
                                        <CardDescription>
                                            Edit your business details from here.
                                        </CardDescription>
                                    </CardHeader>
                                    <Form  {...form}>
                                        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                                            <CardContent>

                                                <div className="form-row grid grid-cols-1 gap-x-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="businessName"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Business Name</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" placeholder="Business Name" {...field} />
                                                                </FormControl>
                                                                <FormDescription />
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />

                                                </div>


                                                <div className="form-row grid grid-cols-1 gap-x-4">
                                                    <FormField
                                                        control={form.control}
                                                        name="businessAddress"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Address</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" placeholder="Business Address" {...field} />
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
                                                        name="businessEmail"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Email</FormLabel>
                                                                <FormControl>
                                                                    <Input type="email" placeholder="Email" {...field} />
                                                                </FormControl>
                                                                <FormDescription />
                                                                <FormMessage />
                                                            </FormItem>
                                                        )}
                                                    />
                                                    <FormField
                                                        control={form.control}
                                                        name="businessWhatsApp"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Business Phone</FormLabel>
                                                                <FormControl>
                                                                    <Input type="number" placeholder="Phone" {...field} />
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
                                                        name="workingAreas"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Working Area</FormLabel>
                                                                <Select onValueChange={(value) => field.onChange(value)} value={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="">
                                                                            <SelectValue placeholder="Select a Business District" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Provinces</SelectLabel>
                                                                            {
                                                                                districts?.map((provice) => (
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
                                                        name="serviceCategories"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Service Category</FormLabel>
                                                                <Select onValueChange={field.onChange} value={field.value}>
                                                                    <FormControl>
                                                                        <SelectTrigger className="">
                                                                            <SelectValue placeholder="Select an option" />
                                                                        </SelectTrigger>
                                                                    </FormControl>
                                                                    <SelectContent>
                                                                        <SelectGroup>
                                                                            <SelectLabel>Districts</SelectLabel>
                                                                            {
                                                                                servicesCategories?.map((district) => (
                                                                                    <SelectItem key={district.serviceCategoryValue} value={district.serviceCategoryValue}>{district.serviceCategoryName}</SelectItem>
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
                                                        name="businessWebsite"
                                                        render={({ field }) => (
                                                            <FormItem>
                                                                <FormLabel>Business Website</FormLabel>
                                                                <FormControl>
                                                                    <Input type="text" placeholder="www.businessname.com" {...field} />
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
            </div>
        </section>
    )
}

export default BusinessProfileSettings