import { useState, useEffect, useRef } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import useHeight from '@/hooks/useHeight'


import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge'
import { MapPinIcon } from 'lucide-react'
import BookingForm from '@/components/BookingForm/BookingForm'
import ReviewForm from '@/components/ReviewForm/ReviewForm'


function ServicesSinglePage() {

    const scrollPosition = useScrollPosition();
    const [contentHeight, divRef] = useHeight();
    const formWrapperRef = useRef(null);

    useEffect(() => {
        if (formWrapperRef.current) {
            if (scrollPosition.y > contentHeight) {
                formWrapperRef.current.classList.remove('lg:fixed');
                formWrapperRef.current.classList.remove('lg:max-w-[350px]');
            } else {
                formWrapperRef.current.classList.add('lg:fixed');
                formWrapperRef.current.classList.add('lg:max-w-[350px]');
            }
        }
    }, [scrollPosition.y, contentHeight]);


    return (
        <>
            <section ref={divRef} className="mt-20 relative overflow-hidden mb-10 service-content-col">
                <div className="container grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr] lg:gap-12 items-start">
                    <div className="grid gap-6 pl-0">
                        <img
                            src="https://images.pexels.com/photos/9029162/pexels-photo-9029162.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
                            alt="Service Banner"
                            width={1200}
                            height={600}
                            className="rounded-lg object-cover w-full aspect-[2/1]"
                        />
                        <div className="flex items-center gap-1 text-sm">
                            {/* <TagIcon className="w-4 h-4" /> */}
                            <Badge variant="secondary" className="py-2 px-4">Landscaping</Badge>
                        </div>
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
                                    <MapPinIcon className="w-4" />
                                    <span>Colombo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={formWrapperRef} className={`service-booking-form-wrapper relative lg:fixed transition-all grid gap-6 sm:right-[1vw] md:right-[4vw] xl:right-0 2xl:right-[10vw] lg:max-w-[350px] xl:max-w-[450px]`}>
                        <BookingForm />
                    </div>
                </div>
            </section>

            <section className="mb-4">
                <div className="container">
                    <ReviewForm />
                </div>
            </section>
        </>
    )
}

export default ServicesSinglePage