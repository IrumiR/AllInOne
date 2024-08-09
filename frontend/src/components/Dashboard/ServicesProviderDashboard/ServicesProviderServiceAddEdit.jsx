import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useParams } from "react-router"

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

import { servicesCategories } from "@/common/servicesCategories"
import { createService } from "@/services/services.service"
import { setIsLoading } from "@/store/loading.slice"
import { httpUpload } from "@/services/http.service"
import { cloudinaryConfig, cloudinaryUploadUrl } from "@/config/cloudinary.config"
import { toast } from "sonner"

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
  serviceImage: z.instanceof(File).refine((file) => file.size < 3000000, {
    message: 'Your resume must be less than 7MB.',
  }),
})


function ServicesProviderServiceAddEdit() {

  const { id } = useParams();

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

  const onSubmit = async (values) => {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)

    // return;

    // upload image to cloudinary and get the url
    const cloudinaryData = new FormData();

    cloudinaryData.append("file", values.serviceImage);
    cloudinaryData.append("upload_preset", cloudinaryConfig.uploadPreset);
    cloudinaryData.append("api_key", cloudinaryConfig.apiKey);

    const cloudinaryResponse = await httpUpload(cloudinaryUploadUrl, cloudinaryData);
    // console.log(cloudinaryResponse);

    if (cloudinaryResponse.status === 200) {
      const imageUrl = cloudinaryResponse.data.url;

      const serviceData = {
        title: values.serviceName,
        description: values.serviceDescription,
        price: values.servicePrice,
        category: values.serviceCategory,
        image: imageUrl,
      }

      console.log(serviceData);

      try {
        const response = await createService(serviceData);
        const data = response.data;
        // console.log('Service created successfully: ', data);

        toast.success("Service created successfully");

        form.reset();

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.log(error);
        toast.error("Error creating service, please try again");
      }
    }

    else {
      console.log("Error uploading image to cloudinary");
      toast.error("Error uploading image to cloudinary, please relaod the page and try again");
    }

    setIsLoading(false);
  }


  return (
    <section className="mt-20">
      <div className="container">
        <h3>id: {id}</h3>
        <div className="form-wrapper max-w-[700px] px-4 py-8 border rounded-md mx-auto bg-muted/40">
          <div className="form-header mb-4">
            <h3 className="text-2xl font-bold">Add a New service</h3>
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
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
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
                            onChange(event.target.files && event.target.files[0])
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
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