import React from 'react'


import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"


function SingleServicePage() {
  return (
    <section className="mt-20 relative overflow-hidden">
        <div className="container grid grid-cols-1 sm:grid-cols-2">
            <div className="main-content w-2/3"></div>
            <div className="sidebar-content w-1/3"></div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr] lg:gap-12">
      <div className="grid gap-6 pl-4 md:pl-0">
        <img
          src="/placeholder.svg"
          alt="Service Banner"
          width={1200}
          height={400}
          className="rounded-lg object-cover w-full aspect-[3/1]"
        />
        <div className="grid gap-4">
          <h1 className="text-3xl font-bold">Premium Landscaping Services</h1>
          <div className="grid gap-2 text-muted-foreground">
            <p>
              Experience the ultimate in outdoor transformation with our premium landscaping services. Our team of
              skilled professionals will work closely with you to bring your vision to life, creating a stunning and
              functional outdoor oasis that will enhance the beauty of your property.
            </p>
            <p>
              From meticulously manicured gardens to intricate hardscaping features, we handle every aspect of your
              landscaping project with the utmost care and attention to detail. Our commitment to excellence ensures
              that you'll be thrilled with the final result.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-sm">
              <TagIcon className="w-4 h-4" />
              <span>Landscaping</span>
            </div>
            <div className="flex items-center gap-1 text-sm">
              <LocateIcon className="w-4 h-4" />
              <span>Los Angeles, CA</span>
            </div>
          </div>
        </div>
      </div>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
            <CardDescription>Fill out the form below to inquire about our landscaping services.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" placeholder="John Doe" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" rows={4} />
              </div>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
    </section>
  )
}

export default SingleServicePage