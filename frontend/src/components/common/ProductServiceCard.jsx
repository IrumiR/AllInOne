import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setIsUserAuthenticated } from '@/store/auth.slice';
import { LOCAL_STORAGE_KEYS } from '@/common/constants';
import { setIsLoading } from '@/store/loading.slice';

// components
import { Button, buttonVariants } from '@/components/ui/button';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
    DialogFooter,
} from "@/components/ui/dialog"


function ProductServiceCard(props) {

    const { classNames, title, description, price, banner, link, btnText, deleteAction, id } = props;

    const dispatch = useDispatch();
    const isUserAuthenticated = useSelector((state) => state.auth.isUserAuthenticated);

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        // check auth
        const checkAuth = async () => {
            const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
            if (!accessToken) {
                dispatch(setIsUserAuthenticated(false));
            } else {
                dispatch(setIsUserAuthenticated(true));
            }
        }

        checkAuth();
    }, [dispatch]);


    const handleDelete = async () => {
        dispatch(setIsLoading(true));
        try {
            setIsDialogOpen(true);
            await deleteAction(id);
            toast.success('Service deleted successfully');
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Failed to delete service', error);
        }
        dispatch(setIsLoading(false));

        window.location.reload();
    }

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    }


    return (
        <div className={`${classNames} group relative block overflow-hidden rounded-md`}>
            <button
                className="absolute end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
            >
                <span className="sr-only">Wishlist</span>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-4 w-4"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                </svg>
            </button>

            <img
                src={banner ? banner : 'https://placehold.co/800x800?text=Hello+World'}
                alt=""
                className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />

            <div className="relative border border-gray-100 bg-white p-6">
                <span className="whitespace-nowrap bg-yellow-400 px-3 py-1.5 text-xs font-medium"> New </span>

                <h3 className="mt-4 text-lg font-medium text-gray-900">{title}</h3>

                <p className="mt-1.5 text-sm text-gray-700">{price}</p>

                <div className="mt-4 flex gap-2">
                    <Link className={`${buttonVariants({ variant: "default" })} w-full transition hover:scale-105`} to={link}>
                        {btnText || 'More Details'}
                    </Link>

                    {
                        isUserAuthenticated && (

                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger onClick={handleOpenDialog} className={`${buttonVariants({ variant: "destructive" })}`}>

                                        <CrossCircledIcon className="h-[32px]" />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Delete</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>


                        )
                    }
                </div>
            </div>
            <Dialog open={isDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Are you absolutely sure?</DialogTitle>
                        <DialogDescription className="text-center">This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <div className="flex justify-center mt-2 gap-x-3">
                        <Button variant="destructive" onClick={handleDelete}>Yes, Delete</Button>
                        <Button variant="secondary" onClick={handleCloseDialog}>No</Button>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

// props validation
ProductServiceCard.propTypes = {
    classNames: PropTypes.string,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string.isRequired,
    banner: PropTypes.string,
    link: PropTypes.string.isRequired,
    btnText: PropTypes.string,
    deleteAction: PropTypes.func,
    id: PropTypes.string.isRequired,
};


export default ProductServiceCard