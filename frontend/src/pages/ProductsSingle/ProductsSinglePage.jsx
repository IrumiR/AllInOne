import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { MinusIcon, PlusIcon, Heart } from 'lucide-react'
import { Input } from "@/components/ui/input"
import ReviewForm from '@/components/ReviewForm/ReviewForm'

function ProductsSinglePage() {

    const [quantity, setQuantity] = useState(1)

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const decreaseQuntity = () => {
        if (quantity === 1) return
        setQuantity(quantity - 1)
    }

    return (
        <>
            <section className="mt-20 overflow-hidden relative">
                <div className="max-w-[1200px] grid md:grid-cols-2 gap-6 lg:gap-12 items-start px-4 mx-auto py-6">
                    <div className="grid gap-4 md:gap-10 items-start">
                        <img
                            src="https://images.unsplash.com/photo-1714479124820-8aaa9c7722af?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt="Product Image"
                            width={600}
                            height={600}
                            className="aspect-square object-cover border w-full rounded-lg overflow-hidden"
                        />
                    </div>
                    <div className="grid gap-4 md:gap-10 items-start">
                        <div className="grid gap-2">
                            <h1 className="font-bold text-3xl">Acme Circles T-Shirt</h1>
                            <div className="text-muted-foreground">Clothing</div>
                        </div>
                        <div className="grid gap-4 text-sm leading-loose">
                            <p>
                                60% combed ringspun cotton/40% polyester jersey tee. Soft, lightweight, and comfortable for everyday wear.
                            </p>
                            <p>
                                The Acme Circles T-Shirt features a bold, graphic design with a playful pattern of circles in various sizes
                                and colors. This versatile top can be dressed up or down, making it a wardrobe staple.
                            </p>
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
                            <Button size="" className="w-[200px]">Add to cart</Button>
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