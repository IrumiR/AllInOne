import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'


import { Badge } from "@/components/ui/badge"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

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
    Calendar,
    PanelLeft
  } from "lucide-react"



import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"


import { LOCAL_STORAGE_KEYS } from '@/common/constants'

import { getOrdersByUserId, getAllOrders } from '@/services/orders.service'

import OrderItemCompoent from '@components/Dashboard/MiniComponents/OrdersListComponents/OrderItemCompoent'
import DeliveryListItem from './DeliveryListItem'

function DeliveryDashboard() {

    const [orders, setOrders] = useState([]);
    const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);
    const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE);

    // console.log('userId', userId);

    // get order by user id

    useEffect(() => {
            const fetchOrders = async () => {
                try {
                    const response = await getAllOrders();
                    console.log('response', response.data);
                    setOrders(response.data);
                } catch (error) {
                    console.error("Failed to fetch orders", error);
                }
            }
    
            fetchOrders();
        } , [userId]);

    

    return (

        <section className="mt-20">
            <div className="container">
                <div className="flex min-h-screen w-full flex-col relative border rounded-lg overflow-hidden">
                <aside className=" absolute inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
            <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                <a
                    href="#"
                    className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
                >
                    <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
                    <span className="sr-only">Acme Inc</span>
                </a>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href="#"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Home className="h-5 w-5" />
                                <span className="sr-only">Dashboard</span>
                            </a>
                        </TooltipTrigger>
                        <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link
                                to="/dashboard/orders"
                                className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <ShoppingCart className="h-5 w-5" />
                                <span className="sr-only">Orders</span>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">Orders</TooltipContent>
                    </Tooltip>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <a
                                href="/dashboard/bookings"
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                            >
                                <Calendar className="h-5 w-5" />
                                <span className="sr-only">Bookings</span>
                            </a>
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
                    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button size="icon" variant="outline" className="sm:hidden">
                                        <PanelLeft className="h-5 w-5" />
                                        <span className="sr-only">Toggle Menu</span>
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="sm:max-w-xs">
                                    <nav className="grid gap-6 text-lg font-medium">
                                        <a
                                            href="#"
                                            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                        >
                                            <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                            <span className="sr-only">Acme Inc</span>
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            <Home className="h-5 w-5" />
                                            Dashboard
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-foreground"
                                        >
                                            <ShoppingCart className="h-5 w-5" />
                                            Orders
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            <Package className="h-5 w-5" />
                                            Products
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            <Users2 className="h-5 w-5" />
                                            Customers
                                        </a>
                                        <a
                                            href="#"
                                            className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                        >
                                            <LineChart className="h-5 w-5" />
                                            Settings
                                        </a>
                                    </nav>
                                </SheetContent>
                            </Sheet>

                            <div className="header-menu-wrapper w-full flex flex-row justify-between">

                                <div>
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/components">Dashboard</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/components">Orders</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>

                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            className="overflow-hidden rounded-full"
                                        >
                                            <img
                                                src="/placeholder-user.jpg"
                                                width={36}
                                                height={36}
                                                alt="Avatar"
                                                className="overflow-hidden rounded-full"
                                            />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            My Profile
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link to="/profile">About</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Logout</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                        </header>
                        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-1 xl:grid-cols-1">
                            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                                
                                <div>
                                    <Card x-chunk="dashboard-05-chunk-3">
                                        <CardHeader className="px-7">
                                            <CardTitle>Your Orders</CardTitle>
                                            <CardDescription>
                                                Your orders to Deliver.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent>
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Customer</TableHead>
                                                        {/* <TableHead className="hidden sm:table-cell">
                                                            Type
                                                        </TableHead> */}
                                                        <TableHead className="hidden sm:table-cell">
                                                            Status
                                                        </TableHead>
                                                        <TableHead className="hidden md:table-cell">
                                                            Date
                                                        </TableHead>
                                                        <TableHead className="text-left">Amount</TableHead>
                                                        <TableHead className="hidden sm:table-cell">
                                                            Action
                                                        </TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {
                                                        orders.map((order) => (
                                                            <DeliveryListItem key={order._id} itemData={order} userRole={userRole} />
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </CardContent>
                                    </Card>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default DeliveryDashboard