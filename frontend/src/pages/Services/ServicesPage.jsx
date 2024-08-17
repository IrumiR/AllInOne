import React, { useEffect } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDispatch, useSelector } from 'react-redux';

import coverBG from '@images/cover-bg-img.jpg';
import { fetchServices } from '@/store/services.slice';
import { fetchFilteredServices } from '@/store/filteredServices.slice';
import { setIsLoading } from '@/store/loading.slice';

// Components
import ProductServiceCard from '@/components/common/ProductServiceCard';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { districts, serviceCategories } from '@/common/displayOnlyData';
import { servicesCategories } from '@/common/categoryNames';

const formSchema = z.object({
  serviceName: z.string().optional(),
  serviceType: z.string().optional(),
  districtName: z.string().optional(),
});

export default function ServicesPage() {
  const dispatch = useDispatch();
  const { data: filteredServices, loading, error } = useSelector((state) => state.filteredServices);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      serviceType: "",
      districtName: "",
    },
  });

  function onSubmit(values) {
    console.log("Form Submitted: ", values);
    dispatch(fetchFilteredServices({
      searchTerm: values.serviceName || "",
      category: values.serviceType || "",
      district: values.districtName || "",
    }));
  }

  useEffect(() => {
    const loadServices = async () => {
      dispatch(setIsLoading(true));
      await dispatch(fetchServices());
      dispatch(setIsLoading(false));
    };

    loadServices();
  }, [dispatch]);

  useEffect(() => {
    console.log("Filtered Services Updated: ", filteredServices);
  }, [filteredServices]);

  return (
    <>
      <section className="mt-[70px] md:mt-20 relative overflow-hidden">
        <img src={coverBG} alt="cover image" className="absolute top-0 left-0 w-full z-[10]" />
        <div className="bg-slate-950/80 py-10 px-2 md:px-0 lg:px-8 grid place-content-center min-h-[40vh] z-20 relative">
          <h1 className="text-4xl font-bold text-center text-white w-full mb-3">Our Services</h1>
          <div className="text-slate-100 text-center font-light max-w-[550px] mx-auto mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eget sem a sollicitudin.
          </div>
          <div className="search-wrapper">
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
                          {servicesCategories.map((category) => (
                            <SelectItem key={category.serviceCategoryValue} value={category.serviceCategoryValue}>{category.serviceCategoryName}</SelectItem>
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
        </div>
      </section>

      <section className="mt-20 space-y-4">
        <div className='container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 place-content-between gap-x-2 gap-y-8 px-2 md:px-0 lg:px-8'>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <ProductServiceCard
                key={service?._id}
                classNames=""
                title={service?.title}
                description={service?.description}
                price={service?.price}
                banner={service?.image}
                link={`/services/${service._id}`}
                id={service._id}
              />
            ))
          ) : (
            <div className="col-span-4 text-center text-gray-500">No services found.</div>
          )}
        </div>
      </section>
    </>
  );
}
