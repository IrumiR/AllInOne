import { useEffect, useState } from "react";
import { headerMenuData } from "@/common/menuLinkData"
import { Link, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux";

import { logout } from "@/store/auth.slice";
import { LOCAL_STORAGE_KEYS } from "@/common/constants";
import { ShoppingCart, UserCircle } from "lucide-react";

import logo from '../../assets/images/all-in-one-logo.png'
import { buttonVariants, Button } from "../ui/button"

function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUserAuthenticated = useSelector((state) => state.auth.isUserAuthenticated);
    const user = useSelector((state) => state.user.user);
    const [noOfitems, setNoOfItems] = useState(0);
    const cartItems = useSelector((state) => state.cart.items);

    // console.log("cartItems", user);

    const [scrollClass, setScrollClass] = useState("bg-transparent");


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;

            // Check if the user has scrolled 120px and update the class accordingly
            if (scrollY >= 50) {
                setScrollClass("bg-white drop-shadow");
            } else {
                setScrollClass("bg-transparent ");
            }
        };

        // Add scroll event listener when the component mounts
        window.addEventListener("scroll", handleScroll);

        // Clean up
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (cartItems) {
            setNoOfItems(cartItems ? cartItems.length : 0);
        }
    }, [cartItems]);


    const handleLogout = () => {

        localStorage.removeItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEYS.USER_ID);

        dispatch(logout());

        navigate("/");
    }

    return (
        <header className={`fixed left-0 top-0 w-full z-50 ${scrollClass} transition-all`}>
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-teal-600" to="/">
                            <span className="sr-only">Home</span>
                            <img src={logo} className="w-[120px] md:w-full md:h-[70px]" alt="logo" />
                        </Link>
                    </div>

                    <div className="md:flex md:items-center md:gap-12">
                        <nav aria-label="Global" className="hidden md:block">
                            <ul className="flex items-center gap-6 text-sm">

                                {
                                    headerMenuData.map((item, index) => (
                                        <Link className="text-gray-500 transition hover:text-gray-500/75" to={item.menuLink} key={index}>{item.menuText}</Link>
                                    ))
                                }

                            </ul>
                        </nav>

                        <div className="icon-wrapper flex flex-row gap-8">
                            <Link to="/cart" className="relative">
                                <ShoppingCart size={24} />
                                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">{noOfitems}</span>
                            </Link>
                            <Link to="/dashboard" className="flex gap-2">
                                <UserCircle size={24} />
                                <span className="hidden md:block">{user?.role}</span>
                            </Link>
                        </div>

                        <div className="flex items-center gap-4">

                            {
                                isUserAuthenticated ? (
                                    <Button onClick={handleLogout}
                                        className={buttonVariants({ variant: "default" })}
                                    >
                                        Logout
                                    </Button>
                                ) : (
                                    <div className="sm:flex sm:gap-4">
                                        <Link
                                            className={buttonVariants({ variant: "default" })}
                                            to="/login"
                                        >
                                            Login
                                        </Link>

                                        <Link
                                            className={buttonVariants({ variant: "secondary" })}
                                            to="/register"
                                        >
                                            Register
                                        </Link>


                                    </div>
                                )
                            }



                            <div className="block md:hidden">
                                <button className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header >
    )
}

export default Header