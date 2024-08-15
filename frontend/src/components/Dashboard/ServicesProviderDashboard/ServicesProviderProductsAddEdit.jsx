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

import { productCategories } from "@/common/categoryNames"
import { createProduct,getProductById, updateProductById } from "@/services/products.service"
import { setIsLoading } from "@/store/loading.slice"
import { httpUpload } from "@/services/http.service"
import { cloudinaryConfig, cloudinaryUploadUrl } from "@/config/cloudinary.config"
import { toast } from "sonner"
import { getSignature } from "@/lib/utils"


import ServicesProviderNavbar from "./ServicesProviderNavbar"

const formSchema = z.object({
  productName: z.string().min(2, {
    message: "Product name is too short",
  }),
  productDescription: z.string().min(5, {
    message: "Product description is too short",
  }),
  productPrice: z.string().min(1, {
    message: "Product price is too short",
  }),
  productCategory: z.string().min(2, {
    message: "Product category is too short",
  }),
  productImage: z.union([
    z.instanceof(File).refine((file) => file.size < 3000000, {
      message: 'Your file must be less than 3MB.',
    }),
    z.string().url({ message: "Invalid URL" }).optional()
  ]).refine(value => value instanceof File || (typeof value === 'string' && value.length > 0), {
    message: 'A valid image is required.',
  }),
})


function ServicesProviderProductsAddEdit() {

  const { id } = useParams();
  const [productImgPreview, setProductImgPreview] = useState('https://placehold.co/400x400?text=Service+Image');
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);
  const [productTitle, setProductTitle] = useState("");


  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
      productPrice: "",
      productCategory: "",
      productImage: "",
    },
  })

  useEffect(() => {
    if(id) {
      // fetch product data
      const fetchProductsData = async () => {
        try {
          const response = await getProductById(id);
          const productData = response.data;
          console.log("productData: ", productData);

          form.setValue('productName', productData?.name);
          setProductTitle(productData?.name);
          form.setValue('productDescription', productData?.description);
          form.setValue('productPrice', productData?.price.toString());
          form.setValue('productCategory', productData?.category);
          form.setValue('productImage', productData?.image);
          setProductImgPreview(productData?.image);

        } catch (error) {
          console.log(error);
        }
      }

      fetchProductsData();

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

    cloudinaryData.append("file", values.productImage);
    cloudinaryData.append("api_key", cloudinaryConfig.apiKey);
    cloudinaryData.append("timestamp", timestamp);
    cloudinaryData.append("signature", signature);

    // cloudinaryData.append("upload_preset", cloudinaryConfig.uploadPreset);

    const cloudinaryResponse = await httpUpload(cloudinaryUploadUrl, cloudinaryData);
    // console.log("CR", cloudinaryResponse);

    if (cloudinaryResponse.status === 200) {
      const imageUrl = cloudinaryResponse.data.url;

      const productData = {
        name: values.productName,
        description: values.productDescription,
        price: values.productPrice,
        category: values.productCategory,
        image: imageUrl,
      }

      // console.log(serviceData);

      try {
        if(id) {
          // update product
          const response = await updateProductById(id, productData);
          const data = response.data;
          // console.log('Service updated successfully: ', data);

          toast.success("Product updated successfully");
        }
        else {
          const response = await createProduct(productData);
          const data = response.data;
          // console.log('Service created successfully: ', data);
  
          toast.success("Product created successfully");
        }
        form.reset();

        // @TODO: remove this and redirect to dashboard services page
        setTimeout(() => {
          window.location.reload();
        }, 3000);
        
      } catch (error) {
        console.log(error);
        toast.error("Error creating product, please try again");
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
              <h3 className="text-2xl font-bold">{id ? `Update The Service: ${productTitle}`: "Add a New Product" }</h3>
            </div>
            <Form {...form}>
              <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>

                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="productName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: Office Chair" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="productDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the product in detail"
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
                    name="productPrice"
                    render={({ field }) => (
                      <FormItem className="w-4/6">
                        <FormLabel>Product Price</FormLabel>
                        <FormControl>
                          <Input placeholder="Ex: 20.00" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {/* <FormField
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
                  /> */}
                </div>

                <div className="form-field">
                  <FormField
                    control={form.control}
                    name="productCategory"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Category</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value || ""}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a Product Category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {
                              productCategories.map((category) => (
                                <SelectItem key={category.productCategoryValue} value={category.productCategoryValue}>
                                  {category.productCategoryName}
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
                    name="productImage"
                    render={({ field: { value, onChange, ...fieldProps } }) => (
                      <FormItem>
                        <FormLabel>Product Image</FormLabel>
                        <FormControl>
                          <Input
                            {...fieldProps}
                            type="file"
                            // accept="image/*"
                            // {...field}
                            onChange={(event) =>
                              onChange(
                                event.target.files && event.target.files[0],
                                setProductImgPreview(event.target.files[0] && URL.createObjectURL(event.target.files[0]))
                              )

                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <img
                  src={productImgPreview}
                  alt="product image preview"
                  className="rounded overflow-hidden w-[400px] h-[400px] object-cover mt-4 cursor-pointer mx-auto"
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

export default ServicesProviderProductsAddEdit