import { useEffect, useStat, useState } from "react"
import { useParams } from "react-router"

import { useDispatch } from 'react-redux';
import { setIsLoading } from '@/store/loading.slice';
import { getProductById } from '@/services/products.service';
import { LOCAL_STORAGE_KEYS } from "@/common/constants";

import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MinusIcon, PlusIcon, Heart } from 'lucide-react'
import { Input } from "@/components/ui/input"
import ReviewForm from '@/components/ReviewForm/ReviewForm'
import { toast } from 'sonner';
import { addItem } from "@/store/cart.slice";

function ProductsSinglePage() {

    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQuntity = () => {
        if (quantity === 1) return
        setQuantity(quantity - 1)
    }

    // add to cart
    const addToCart = () => {
        const cart = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.CART)) || [];
        const existingProduct = cart.find(item => item._id === product._id);

        if (existingProduct) {
            existingProduct.quantity += quantity;
            existingProduct.totalPrice = existingProduct.price * existingProduct.quantity;
        } else {
            cart.push({ ...product, quantity: quantity, totalPrice: product.price * quantity });
        }

        localStorage.setItem(LOCAL_STORAGE_KEYS.CART, JSON.stringify(cart));
        toast.success("Product added to cart");

        // update redux cart state
        dispatch(addItem({ ...product, quantity: quantity, totalPrice: product.price * quantity }));


    }

    useEffect(() => {

        console.log('Product ID: ', id);

        const fetchProduct = async (id) => {
            try {
                dispatch(setIsLoading(true));
                const response = await getProductById(id);
                setProduct(response.data);
                // console.log(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                dispatch(setIsLoading(false));
            }
        }

        fetchProduct(id);


    }, [id, dispatch]);

    return (
        <>
            <section className="mt-20 overflow-hidden relative">
                <div className="max-w-[1200px] grid md:grid-cols-2 gap-6 lg:gap-12 items-start px-4 mx-auto py-6">
                    <div className="grid gap-4 md:gap-10 items-start">
                        <img
                            src={product?.image}
                            alt="Product Image"
                            width={600}
                            height={600}
                            className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
                        />
                    </div>
                    <div className="grid gap-4 md:gap-10 items-start">
                        <div className="grid gap-2">
                            <h1 className="font-bold text-3xl">{product?.name}</h1>
                            <div className="text-muted-foreground">{product?.category}</div>
                        </div>
                        <div className="grid gap-4 text-sm leading-loose">
                            {product?.description}
                        </div>

                        <div className="grid gap-4 text-sm leading-loose">
                            <span className="text-lg font-bold">Rs. {product?.price.toFixed(2)}</span>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="quantity" className="text-base">
                                Quantity
                            </Label>
                            <div className="flex items-center gap-2">
                                <Button variant="outline" size="icon" className="w-8 h-8">
                                    <MinusIcon onClick={decreaseQuntity} className="w-4 h-4" />
                                </Button>
                                <Input type="numaric" value={quantity} id="quantity" name="quantity" className="w-16 text-center" />
                                <Button variant="outline" size="icon" className="w-8 h-8">
                                    <PlusIcon className="w-4 h-4" onClick={increaseQuantity} />
                                </Button>
                            </div>
                        </div>
                        <div className="flex flex-row items-center gap-2">
                            <Button size="" className="w-[200px]" onClick={addToCart}>Add to cart</Button>
                            <Button size="icon" variant="outline" className="bg-blue-600 text-white">
                                <Heart />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            <section className="mb-4">
                <div className="container max-w-[1200px] mx-auto mt-20 px-4">
                    <ReviewForm />
                </div>
            </section>
        </>
    )
}

export default ProductsSinglePage