import { useState, useEffect, useRef } from 'react'
import useScrollPosition from '@/hooks/useScrollPosition'
import useHeight from '@/hooks/useHeight'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { VITE_SERVICE_PROVIDER_EMAIL } from '@/config/app.config'

import { getCategoryNameByValue } from '@/lib/utils'
import { getServiceById } from '@/services/services.service'
import { setIsLoading } from '@/store/loading.slice'
import { servicesCategories } from '@/common/categoryNames'
import { LOCAL_STORAGE_KEYS } from '@/common/constants'
import { getCurrentUser } from '@/services/auth.service'
import { setUser } from '@/store/user.slice'

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button, buttonVariants } from "@/components/ui/button"
import { Badge } from '@/components/ui/badge'
import { MapPinIcon, DollarSign, Mail } from 'lucide-react'
import BookingForm from '@/components/BookingForm/BookingForm'
import ReviewForm from '@/components/ReviewForm/ReviewForm'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"


function ServicesSinglePage() {

    const scrollPosition = useScrollPosition();
    const [contentHeight, divRef] = useHeight();
    const formWrapperRef = useRef(null);
    const dispatch = useDispatch();
    const [serviceData, setServiceData] = useState({});
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const navigate = useNavigate();

    const user = useSelector(state => state.user.user);

    const { id } = useParams();

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

    useEffect(() => {
        console.log("ID: ", id);

        // fecthc service data
        const fetchServiceDetails = async () => {
            try {
                dispatch(setIsLoading(true));
                const service = await getServiceById(id);
                console.log("Service: ", service.data);
                setServiceData(service.data);
            } catch (error) {
                console.log("Error: ", error);
            } finally {
                dispatch(setIsLoading(false));
            }
        }

        fetchServiceDetails();

    }, [id, dispatch]);

    // get currnt user
    useEffect(() => {
        // get current user
        const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);

        const fetchCurrentUser = async () => {
            try {
                dispatch(setIsLoading(true));
                const user = await getCurrentUser(userId);
                console.log("User: ", user.data);

                dispatch(setUser(user.data));
            } catch (error) {
                console.log("Error: ", error);
            }
            finally {
                dispatch(setIsLoading(false));
            }
        }

        fetchCurrentUser();

    }, [dispatch]);

    const handleChatWindow = () => {
        setIsPopupOpen(true);
        const url = window.location.href;
        
    }


    return (
        <>
            <section ref={divRef} className="mt-20 relative overflow-hidden mb-10 service-content-col">
                <div className="container grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr] lg:gap-12 items-start">
                    <div className="grid gap-6 pl-0">
                        <img
                            src={serviceData?.image}
                            alt="Service Banner"
                            width={1200}
                            height={600}
                            className="rounded-lg object-cover w-full aspect-[2/1]"
                        />
                        <div className="flex items-center gap-1 text-sm">
                            {/* <TagIcon className="w-4 h-4" /> */}
                            <Badge variant="secondary" className="py-2 px-4">{getCategoryNameByValue(serviceData?.category, servicesCategories)}</Badge>
                        </div>
                        <div className="grid gap-4">
                            <h1 className="text-3xl font-bold">{serviceData?.title}</h1>
                            <h3 className="text-xl font-semibold flex">
                                <DollarSign className="w-5" />
                                <span>{serviceData?.price}</span>
                            </h3>
                            <div className="grid gap-2 text-muted-foreground">
                                <p>
                                    {serviceData?.description}
                                </p>
                            </div>
                            <div className="flex flex-col items-start gap-4">

                                <div className="flex items-center gap-1 text-sm">
                                    <MapPinIcon className="w-4" />
                                    <span>Colombo</span>
                                </div>

                                <div className="chat-wrapper ">
                                    <Button size="lg" className="flex gap-2" onClick={handleChatWindow}>
                                        <Mail />
                                        <span>Start a Chat</span></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div ref={formWrapperRef} className={`service-booking-form-wrapper relative lg:fixed transition-all grid gap-6 sm:right-[1vw] md:right-[4vw] xl:right-0 2xl:right-[10vw] lg:max-w-[350px] xl:max-w-[450px]`}>
                        <BookingForm
                            serviceInfo={serviceData ?? serviceData}
                            userInfo={user ?? user}
                        />
                    </div>
                </div>
            </section>

            <section className="mb-4">
                <div className="container">
                    <ReviewForm />
                </div>
            </section>
            <Dialog open={isPopupOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Need to know more about our servies?</DialogTitle>
                        <DialogDescription className="text-center">
                            Please click the button bellow and send an inquiry to our team. We will get back to you as soon as possible.
                        </DialogDescription>
                    </DialogHeader>
                    <div className={`text-center w-full gap-2 flex justify-center`}>
                        <Link className={`${buttonVariants({ variant: 'default' })}`} to={`mailto:${VITE_SERVICE_PROVIDER_EMAIL}`}> Send Now </Link>
                        <Button onClick={() => setIsPopupOpen(false)} className={`${buttonVariants({ variant: 'secondary' })}`}>Close</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ServicesSinglePage