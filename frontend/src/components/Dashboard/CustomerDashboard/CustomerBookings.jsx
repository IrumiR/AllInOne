import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { LOCAL_STORAGE_KEYS } from '@/common/constants'
import { getBookingsByUserId } from '@/services/booking.service'

import { Link } from 'react-router-dom'
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button, buttonVariants } from "@/components/ui/button"
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    ShoppingCart,
    Users2,
} from "lucide-react"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import CustomerDashboardNavbar from './CustomerDashboardNavbar'
import BookingItemComponent from '../MiniComponents/BookingListComponents/BookingItemComponent'

function CustomerBookings() {

    const [bookings, setBookings] = useState([]);
    const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID);

    console.log('userId', userId);

    // get order by user id

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await getBookingsByUserId(userId);
                console.log('response', response);
                setBookings(response);
            } catch (error) {
                console.error("Failed to fetch bookings", error);
            }
        }

        fetchBookings();
    }, [userId]);

    return (
        <section className="mt-20">
            <div className="container">
                <div className="flex min-h-screen w-full flex-col relative border rounded-lg overflow-hidden">
                    <CustomerDashboardNavbar />
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
                                    {
                                        bookings.length === 0 ? (
                                            <div className="flex flex-col items-center justify-center h-96">
                                                <h3 className="text-2xl font-bold">No bookings found</h3>
                                                <p className="text-lg text-muted-foreground mb-3">Please headover to services area.</p>
                                                <Link to="/services-list" className={buttonVariants({ variant: "default", size: "lg" })}>Visit Now</Link>
                                            </div>
                                        )
                                            :
                                            <Card x-chunk="dashboard-05-chunk-3">
                                                <CardHeader className="px-7">
                                                    <CardTitle>Bookings</CardTitle>
                                                    <CardDescription>
                                                        Recent bookings for you.
                                                    </CardDescription>
                                                </CardHeader>
                                                <CardContent>
                                                    <Table>
                                                        <TableHeader>
                                                            <TableRow>
                                                                <TableHead>Booking</TableHead>
                                                                {/* <TableHead className="hidden sm:table-cell">
                                                    Type
                                                </TableHead> */}
                                                                <TableHead className="hidden sm:table-cell">
                                                                    Status
                                                                </TableHead>
                                                                <TableHead className="hidden md:table-cell">
                                                                    Date
                                                                </TableHead>
                                                                <TableHead className="text-right">Amount</TableHead>
                                                                {/* <TableHead className="hidden sm:table-cell">
                                                            Action
                                                        </TableHead> */}
                                                            </TableRow>
                                                        </TableHeader>
                                                        <TableBody>
                                                            {
                                                        bookings.map((booking) => (
                                                            <BookingItemComponent key={booking._id} itemData={booking} />
                                                        ))
                                                    }
                                                        </TableBody>
                                                    </Table>
                                                </CardContent>
                                            </Card>
                                    }

                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CustomerBookings