import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useParams } from "react-router"
import { useSelector, useDispatch } from "react-redux"

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
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { servicesCategories } from "@/common/categoryNames"
import { createService } from "@/services/services.service"
import { setIsLoading } from "@/store/loading.slice"
import { httpUpload } from "@/services/http.service"
import { cloudinaryConfig, cloudinaryUploadUrl } from "@/config/cloudinary.config"
import { toast } from "sonner"
import { getSignature } from "@/lib/utils"
import { getServiceById, updateServiceById } from "@/services/services.service"

import ServicesProviderNavbar from "./ServicesProviderNavbar"

const formSchema = z.object({
  serviceName: z.string().min(2, {
    message: "Service name is too short",
  }),
  serviceDescription: z.string().min(10, {
    message: "Service description is too short",
  }),
  servicePrice: z.string().min(1, {
    message: "Service price is too short",
  }),
  serviceCategory: z.string().min(2, {
    message: "Service category is too short",
  }),
  serviceImage: z.union([
    z.instanceof(File).refine((file) => file.size < 3000000, {
      message: 'Your file must be less than 3MB.',
    }),
    z.string().url({ message: "Invalid URL" }).optional()
  ]).refine(value => value instanceof File || (typeof value === 'string' && value.length > 0), {
    message: 'A valid image is required.',
  }),
})


function ServicesProviderServiceAddEdit() {

  const { id } = useParams();
  const [serviceImgPreview, setServiceImgPreview] = useState('https://placehold.co/800x400?text=Service+Image');
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [serviceTitle, setServiceTitle] = useState("");


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceName: "",
      serviceDescription: "",
      servicePrice: "",
      serviceCategory: "",
      serviceImage: "",
    },
  })

  useEffect(() => {
    if(id) {
      // fetch service data
      const fetchServiceData = async () => {
        try {
          const response = await getServiceById(id);
          const serviceData = response.data;
          console.log(serviceData);

          form.setValue('serviceName', serviceData.title);
          setServiceTitle(serviceData.title);
          form.setValue('serviceDescription', serviceData.description);
          form.setValue('servicePrice', serviceData.price);
          form.setValue('serviceCategory', serviceData.category);
          form.setValue('serviceImage', serviceData.image);
          setServiceImgPreview(serviceData.image);

        } catch (error) {
          console.log(error);
        }
      }

      fetchServiceData();

    }
  }, [id, form]);

  const onSubmit = async (values) => {
    dispatch(setIsLoading(true));
    // Do something with the form values.
    console.log(values)

    // get upload signature from cloudinary
    const { signature, timestamp } = await getSignature();

    // console.log("sign: ", signature);

    // return false;

    // upload image to cloudinary and get the url
    const cloudinaryData = new FormData();

    cloudinaryData.append("file", values.serviceImage);
    cloudinaryData.append("api_key", cloudinaryConfig.apiKey);
    cloudinaryData.append("timestamp", timestamp);
    cloudinaryData.append("signature", signature);

    // cloudinaryData.append("upload_preset", cloudinaryConfig.uploadPreset);

    const cloudinaryResponse = await httpUpload(cloudinaryUploadUrl, cloudinaryData);
    // console.log("CR", cloudinaryResponse);

    if (cloudinaryResponse.status === 200) {
      const imageUrl = cloudinaryResponse.data.url;

      const serviceData = {
        title: values.serviceName,
        description: values.serviceDescription,
        price: values.servicePrice,
        category: values.serviceCategory,
        image: imageUrl,
      }

      // console.log(serviceData);

      try {
        if(id) {
          // update service
          const response = await updateServiceById(id, serviceData);
          const data = response.data;
          // console.log('Service updated successfully: ', data);

          toast.success("Service updated successfully");
        }
        else {
          const response = await createService(serviceData);
          const data = response.data;
          // console.log('Service created successfully: ', data);
  
          toast.success("Service created successfully");
        }
        form.reset();

        // @TODO: remove this and redirect to dashboard services page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        
      } catch (error) {
        console.log(error);
        toast.error("Error creating service, please try again");
      }
    }

    else {
      console.log("Error uploading image to cloudinary");
      toast.error("Error uploading image to cloudinary, please relaod the page and try again");
    }

    dispatch(setIsLoading(false));
  }


  return (
    <section className="mt-20">
      <div className="container flex py-4 w-full flex-col relative border rounded-lg overflow-hidden">
        <ServicesProviderNavbar />
          <div className="form-wrapper w-full max-w-[700px] px-4 py-8 border rounded-md mx-auto bg-muted/40">
            <div className="form-header mb-4">
              <h3 className="text-2xl font-bold">{id ? `Update The Service: ${serviceTitle}`: "Add a New service" }</h3>
            </div>
            <Form {...form}>
              <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>

                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="serviceName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Plumbing Service" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="serviceDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the service in detail"
                            className="resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="form-field flex gap-3 w-full">
                  <FormField
                    control={form.control}
                    name="servicePrice"
                    render={({ field }) => (
                      <FormItem className="w-4/6">
                        <FormLabel>Service Price</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="servicePriceTerm"
                    render={({ field }) => (
                      <FormItem className="w-auto">
                        <FormLabel>Pricing Term</FormLabel>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a pricing term" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="hourly">Hourly</SelectItem>
                              <SelectItem value="fixed">Fixed</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="serviceCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Service Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Service Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                              servicesCategories.map((category) => (
                                <SelectItem key={category.serviceCategoryValue} value={category.serviceCategoryValue}>
                                  {category.serviceCategoryName}
                                </SelectItem>
                              ))
                            }
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="serviceImage"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Service Image</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            // accept="image/*"
                            // {...field}
                            onChange={(event) =>
                              onChange(
                                event.target.files && event.target.files[0],
                                setServiceImgPreview(event.target.files[0] && URL.createObjectURL(event.target.files[0]))
                              )

                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <img
                  src={serviceImgPreview}
                  alt="service image preview"
                  className="rounded overflow-hidden w-[700px] h-auto object-cover mt-4 cursor-pointer"
                  onClick={() => document.querySelector('input[type="file"]').click()}
                  />
                </div>
                <div className="form-submit">
                  <Button type="submit">
                    Submit
                  </Button>
                </div>
              </form>
            </Form>

          </div>

      </div>

    </section>
  )
}

export default ServicesProviderServiceAddEdit