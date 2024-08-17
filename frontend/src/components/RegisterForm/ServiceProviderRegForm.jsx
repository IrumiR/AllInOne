import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { districts, provinceData } from '@/common/displayOnlyData';
import { servicesCategories } from '@/common/categoryNames';
import { customerRegister } from '@/services/auth.service';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsUserAuthenticated } from "@/store/auth.slice";
import { LOCAL_STORAGE_KEYS } from "@/common/constants";
import { setIsLoading } from "@/store/loading.slice";

// components
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner";


const formSchema = z.object({
    firstName: z.string().min(3, { message: "First Name mustbe at least 3 characters" }),
    lastName: z.string().min(3, { message: "Last Name mustbe at least 3 characters" }),
    email: z.string().email("email should be a valid email").min(3, { message: "Email must be at least 3 characters" }),
    password: z.string().min(8, "Password must be at least 8 charactors"),
    confirmPassword: z.string().min(8, "Confirm password must be at least 8 charactors"),
    phone: z.string().length(10, { message: "Mobile number must be 10 characters" }),
    address_line_1: z.string().min(3, { message: "Address Line 1 mustbe at least 3 characters" }),
    address_line_2: z.string(),
    province: z.string(),
    district: z.string(),
    city: z.string().min(3, { message: "City mustbe at least 3 characters" }),
    postal_code: z.string().min(5, { message: "Postal Code mustbe at least 5 characters" }),
    businessName: z.string().min(3, { message: "Business Name mustbe at least 3 characters" }),
    businessAddress: z.string().min(3, { message: "Business Address mustbe at least 3 characters" }),
    businessPhone: z.string().length(10, { message: "Business Phone must be 10 characters" }),
    serviceCategory: z.string(),
    workingAreas: z.string(),
    businessEmail: z.string().email("email should be a valid email").min(3, { message: "Business Email must be at least 3 characters" }),
    businessWebsite: z.string().url("Website should be a valid URL"),
}).superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});


function ServiceProviderRegForm() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const isUserAuthenticated = useSelector(state => state.auth.isUserAuthenticated);

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            phone: "",
            address_line_1: "",
            address_line_2: "",
            province: "",
            district: "",
            city: "",
            postal_code: "0000",
            businessName: "",
            businessAddress: "",
            businessPhone: "",
            serviceCategory: "",
            workingAreas: "",
            businessEmail: "",
            businessWebsite: "",
        },
    })

    const onSubmit = async (values) => {
        try {
            dispatch(setIsLoading(true));
            const registerResponse = await customerRegister({ ...values, role: "service-provider", businessContactNumbers:{'WhatsApp' :values.businessPhone} });
            console.log(registerResponse);

            // return false;
            // set user authneicated true
            dispatch(setIsUserAuthenticated(true));

            // save token to local storage
            localStorage.setItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN, registerResponse.data.token);

            // sucess message
            toast.success(registerResponse.message);

            // redirect to profile page
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);

        } catch (error) {

            toast.error(error.message);
        }
        finally{
            dispatch(setIsLoading(false));
        }
    }

    return (
        <div className="mx-auto space-y-6 py-12">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Register as a Services Provider</h1>
                <p className="text-muted-foreground">Create your account to get started.</p>
            </div>
            <Form {...form}>
                <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="firstName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="lastName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is your public display name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="Last Name" {...field} />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" placeholder="Confirm Password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Mobile Number</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Mobile Number" {...field} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="address_line_1"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 1</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="address_line_2"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address Line 2</FormLabel>
                                    <FormControl>
                                        <Input type="text" placeholder="Address" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="province"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Province</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className="">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a Province" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    provinceData.map((province) => (
                                                        <SelectItem key={province.id} value={province.value}>{province.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="district"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>District</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className="">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a District" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    districts.map((district) => (
                                                        <SelectItem key={district.id} value={district.value}>{district.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="city"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>City</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="City" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="postal_code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Postal Code</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Postal Code" {...field} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>


                    <div className="sep mt-7">
                        <h4 className="text-lg font-medium leading">Bussiness Details</h4>
                        <p className=" text-muted-foreground">
                            Enter your business details bellow.
                        </p>
                        <Separator className="my-4" />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="businessName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Business Name</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Business Name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="businessAddress"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Address</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Business Address" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="businessPhone"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Phone</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Business Phone" {...field} className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="serviceCategory"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Category</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className="">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a service category" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    servicesCategories.map((cat) => (
                                                        <SelectItem key={cat.serviceCategoryValue} value={cat.serviceCategoryValue}>{cat.serviceCategoryName}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="workingAreas"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>District</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl className="">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a working area" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {
                                                    districts.map((district) => (
                                                        <SelectItem key={district.id} value={district.value}>{district.name}</SelectItem>
                                                    ))
                                                }
                                            </SelectContent>
                                        </Select>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="businessEmail"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="Business Email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="businessWebsite"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Business Webiste</FormLabel>
                                        <FormControl>
                                            <Input type="text" placeholder="Business Website" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <Button type="submit" className="w-full">
                        Register
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default ServiceProviderRegForm