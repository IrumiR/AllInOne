import { useEffect, useState } from "react";
import { headerMenuData } from "@/common/menuLinkData"
import { Link } from "react-router-dom"
import { buttonVariants } from "../ui/button"
import logo from '../../assets/images/all-in-one-logo.png'

function Header() {

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

    return (
        <header className={`fixed left-0 top-0 w-full z-50 ${scrollClass} transition-all`}>
            <div className="mx-auto container px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <div className="md:flex md:items-center md:gap-12">
                        <Link className="block text-teal-600" to="/">
                            <span className="sr-only">Home</span>
                            <img src={logo} className="w-[120px] md:w-full md:h-[70px]" alt="logo"/>
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

                        <div className="flex items-center gap-4">
                            <div className="sm:flex sm:gap-4">
                                <Link
                                    className={buttonVariants({ variant: "default" })}
                                    to="/login"
                                >
                                    Login
                                </Link>

                                <div className="hidden sm:flex">
                                    <Link
                                        className={buttonVariants({ variant: "secondary" })}
                                        to="/register"
                                    >
                                        Register
                                    </Link>
                                </div>
                            </div>

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
        </header>
    )
}

export default Header