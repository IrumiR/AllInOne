
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import DatePicker from "@/components/DatePicker/DatePicker"
import './BookingForm.css';

export default function BookingForm() {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Book a Service</CardTitle>
        <CardDescription>Fill out the form to schedule an appointment.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Booking Date</Label>
              {/* <Input id="date" type="date" /> */}
              <DatePicker />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Additional Message</Label>
            <Textarea id="message" placeholder="Enter any additional details" className="min-h-[100px]" />
          </div>
          <Button type="submit" className="w-full">
            Book Now
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}