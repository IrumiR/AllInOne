import React, { useEffect } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// components
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useDispatch } from 'react-redux'
import { fetchFilteredServices } from '@/store/filteredServices.slice'

import { Search } from 'lucide-react'

// data
import { districts, serviceCategories } from '@/common/displayOnlyData';

const formSchema = z.object({
  serviceName: z.string().optional(),
  serviceType: z.string().optional(),
  districtName: z.string().optional(),
})

function SearchForm() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [category, setCategory] = React.useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      serviceType: "",
      districtName: "",
    },
  })

  function onSubmit(values) {
    setSearchTerm(values.serviceName || "");
    setCategory(values.serviceType || "");
    // Dispatch the action to fetch filtered services
    dispatch(fetchFilteredServices({ searchTerm: values.serviceName, category: values.serviceType }));
  }

  // Fetch services when the search term or category changes
  useEffect(() => {
    if (searchTerm || category) {
      dispatch(fetchFilteredServices({ searchTerm, category }));
    }
  }, [dispatch, searchTerm, category]);

  return (
    <div className="form-wrapper px-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col md:flex-row space-y-2 md:space-y-0">
          <FormField
            control={form.control}
            name="serviceName"
            render={({ field }) => (
              <FormItem>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="md:rounded-none min-w-[200px] focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 h-12">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {serviceCategories.map((category) => (
                      <SelectItem key={category.id} value={category.value}>{category.name}</SelectItem>
                    ))}
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl className="md:rounded-none min-w-[200px] focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:ring-0 h-12">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a District" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.id} value={district.value}>{district.name}</SelectItem>
                    ))}
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
