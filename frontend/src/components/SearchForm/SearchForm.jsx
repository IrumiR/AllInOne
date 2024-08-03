import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Search } from 'lucide-react'

// data
import { districts, serviceCategories } from '@/common/displayOnlyData';

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

function onSubmit(values) {
  // Do something with the form values.
  // ✅ This will be type-safe and validated.
  console.log(values)
}

function SearchForm() {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  return (
    <div className="form-wrapper px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name="serviceName"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Service Name</FormLabel> */}
                <FormControl className="focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 h-12 md:rounded-r-none min-w-[250px]">
                  <Input placeholder="Type a service" {...field} className="" />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="serviceType"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="md:rounded-none min-w-[200px] focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 h-12">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {
                      serviceCategories.map((category) => (
                        <SelectItem key={category.id} value={category.value}>{category.name}</SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="districtName"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Email</FormLabel> */}
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="md:rounded-none min-w-[200px] focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 h-12">
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
          <Button type="submit" className="md:rounded-l-none h-12 flex gap-2 mb-2">
            <span>Search Now</span>
            <Search className="w-[16px]" />
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default SearchForm