
import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { format, fromUnixTime, set } from "date-fns"
import { cn } from "@/lib/utils"
import { useDispatch } from "react-redux"
import { PropTypes } from "prop-types"
import { loadStripe } from "@stripe/stripe-js"
import { STRIPE_PUBLISHABLE_KEY } from '@/config/app.config';
import axios from "axios"

import { createBooking, getBookingById } from "@/services/booking.service"
import { setIsLoading } from "@/store/loading.slice"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DatePicker from "@/components/DatePicker/DatePicker"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarIcon, Phone } from "lucide-react"
import { toast } from "sonner"


import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import './BookingForm.css';

const formSchema = z.object({
  clientName: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email(),
  date: z.date({
    message: "Please select a valid date.",
  }),
  additionalInfo: z.string(),
  phone: z.number().min(10, {
    message: "Phone number must be at least 10 characters.",
  }),

})


export default function BookingForm(props) {

  const { serviceInfo, userInfo } = props;

  // console.log("Service Info: ", serviceInfo);

  const [date, setDate] = useState()
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [blockedDates, setBlockedDates] = useState([]);

  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      clientName: "",
      email: "",
      date: "",
      additionalInfo: "",
      phone: "",
    },
  })


  async function onSubmit(values) {
    // console.log(values);

    // create booking
    const bookingData = {
      clientId: userInfo._id,
      serviceProviderId: "66925f17cf3fc80ff4d0e777",
      serviceId: serviceInfo._id,
      date: format(values.date, "t"), // "1723782470",
      price: serviceInfo.price,
      bookingStatus: "pending",
      paymentType: "on-site",
      isPaid: "false"
    }

    try {
      dispatch(setIsLoading(true));
      const newBooking = await createBooking(bookingData);
      const { data } = newBooking;

      // console.log("New Booking: ", data);

      // return false;
      // toast.success("Booking created successfully!");
      // setIsFormVisible(false);

      form.reset();

      // stripe data payload
      const stripePayloadData = {
        clientId: {
          _id: data._id,
        },
        serviceProviderId: data.serviceProviderId,
        date: data.date, //1724178600,
        price: 2000, //"77USD hr",
        bookingStatus: data.bookingStatus,
        paymentType: data.paymentType,
        isPaid: false,
        serviceId:data.serviceId,
        serviceName: data.serviceName,
      }

      // redirect to stripe
      const stripePromise = await loadStripe(STRIPE_PUBLISHABLE_KEY);

      const { sessionId } = await axios.post('http://localhost:3999/api/v1/create-booking-checkout-session', {
        ...stripePayloadData
      }).then((response) => response.data);

      // console.log("Session ID: ", sessionId);

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId });

    }
    catch (error) {
      console.log("Error: ", error);
      toast.error("Error creating booking!");
    }
    finally {
      dispatch(setIsLoading(false));
    }

  }

  useEffect(() => {
    // prefill user data in form, if user is logged in
    if (userInfo) {
      form.setValue("clientName", `${userInfo?.firstName} ${userInfo?.lastName}`);
      form.setValue("email", userInfo?.email);
      form.setValue("phone", userInfo?.phone);

    }
  }, [userInfo, form]);

  useEffect(() => {
    // block dates in calendar using booking data in serviceInfo
    if (serviceInfo && Object.keys(serviceInfo).length !== 0) {
      // console.log("Service Info in effect: ", serviceInfo);
      const bookingData = serviceInfo?.bookings.map((booking) => booking);
      // console.log("Blocked Dates: ", blockedDates);

      bookingData?.map(async (booking) => {

        // get booking by id
        const { date } = await getBookingById(booking);
        
        // console.log("Blocked Date: ", date);

        setBlockedDates((prevDates) => [...prevDates, date]);
        // setBlockedDates((prevDates) => [...prevDates, format(fromUnixTime(date), "yyyy MM dd")]);

        // remove duplicate dates
        setBlockedDates((prevDates) => [...new Set(prevDates)]);

        // convert dates to unix timestamp
        setBlockedDates((prevDates) => [...prevDates, fromUnixTime(date)]);
        


      });
      // console.log("Blocked Dates: ", blockedDates.includes(new Date(date)));

  }
  }, [serviceInfo]);



  return (
    isFormVisible ? (
      <Card className="w-full mx-auto">
        <CardHeader>
          <CardTitle>Book a Service</CardTitle>
          <CardDescription>Fill out the form to schedule an appointment.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Your email" {...field} />
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
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Phone No.</FormLabel>
                        <FormControl>
                          <Input placeholder="Your Phone" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                // disabled={(date) =>
                                //   date < new Date() || date < new Date("1900-01-01")
                                // }
                                disabled={blockedDates}
                              
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
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
                  name="additionalInfo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Additional Detials</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about yourself"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can <span>@mention</span> other users and organizations.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button disabled={!serviceInfo && !userInfo} type="submit" className="w-full">
                Book Now
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    )
      : (
        <div className="text-center">
          <Card>
            <CardHeader>
              <CardTitle>Book a Service</CardTitle>
              <CardDescription>Fill out the form to schedule an appointment.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4">Thank you for booking the service. The serices provider will contact you. </p>
              <Button onClick={() => setIsFormVisible(true)} className="w-full"> Book Another Service </Button>
            </CardContent>
          </Card>
        </div>
      )
  )
}

// prop validation
BookingForm.propTypes = {
  serviceInfo: PropTypes.object,
  userInfo: PropTypes.object,
}