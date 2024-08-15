import React from 'react'
import { Link } from 'react-router-dom'

import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider,
  } from "@/components/ui/tooltip";

  import {
    Home,
    LineChart,
    Package,
    Package2,
    Settings,
    ShoppingCart,
    Users2,
    FileVolume2,
    CalendarClock,
  } from "lucide-react"

function ServicesProviderNavbar() {
    return (
        <aside className=" absolute inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/dashboard/"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${window.location.pathname === '/dashboard/' ? 'bg-primary text-white hover:text-white' : 'text-muted-foreground'}`}
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/dashboard/orders/"
                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8 ${window.location.pathname === '/dashboard/orders/' ? 'bg-primary text-white hover:text-white' : 'text-muted-foreground'}`}
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/dashboard/products/"
                                className={`${window.location.pathname === '/dashboard/products/' ? 'bg-primary text-white hover:text-white' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                            >
                                <Package className="h-5 w-5" />
                                <span className="sr-only">Products</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Products</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/dashboard/services/"
                                className={`${window.location.pathname === '/dashboard/services/' ? 'bg-primary text-white hover:text-white' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                            >
                                <FileVolume2  className="h-5 w-5" />
                                <span className="sr-only">Services</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Servcies</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/dashboard/bookings/"
                                className={`${window.location.pathname === '/dashboard/bookings/' ? 'bg-primary text-white hover:text-white' : 'text-muted-foreground'} flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8`}
                            >
                                <CalendarClock className="h-5 w-5" />
                                <span className="sr-only">Bookings</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Bookings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
            <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Settings className="h-5 w-5" />
                                <span className="sr-only">Settings</span>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="right">Settings</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </nav>
        </aside>
    )
}

export default ServicesProviderNavbar