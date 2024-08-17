import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { format, set } from 'date-fns'
import { useDispatch } from 'react-redux'

import { getUserById } from "@/services/users.services"
import { updateBookingById } from "@/services/booking.service"
import { setIsLoading } from '@/store/loading.slice'
import { toast } from 'sonner'

import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

function BookingItemComponent(props) {

    const { itemData, userRole } = props;
    const [customerInfo, setCustomerInfo] = React.useState(null);
    const [bookingStatus, setBookingStatus] = useState();
    const dispatch = useDispatch();

    console.log("Booking Item", userRole);


    const handleChange = async (value) => {
        // console.log("Selected value", value);
        // if (value === 'completed') {
        //     setBookingStatus('pending');
        // }
        // setBookingStatus(value);

        try {
            dispatch(setIsLoading(true));
            const response = await updateBookingById(itemData?._id, { bookingStatus: value, isPaid: true });
            setBookingStatus(response.data.bookingStatus);
            toast.success("Booking updated successfully");

            // console.log("Updated booking status", response);
        } catch (error) {
            console.error("Failed to update booking status", error);

        } finally {
            dispatch(setIsLoading(false));
        }
    }

    useEffect(() => {
        // get user details using uder id

        const fetchUserDetails = async (userId) => {
            // fetch user details using user id
            try {
                const response = await getUserById(userId);
                const user = response.data;
                // console.log("User details", user);
                setCustomerInfo(user);
            } catch (error) {
                console.error("Failed to fetch user details", error);

            }
        }

        const userID = itemData?.userId;
        // fetchUserDetails(userID);

    }, [itemData])

    return (
        <TableRow className="hover:bg-accent">
            <TableCell>
                <div className="font-medium">{customerInfo?.firstName} {customerInfo?.lastName}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                    Booking
                </div>
            </TableCell>
            {/* <TableCell className={`hidden sm:table-cell`}>
                {itemData?.orderStatus}
            </TableCell> */}
            <TableCell className="hidden text-center sm:table-cell">
                <Badge variant="primary" className={`text-xs ${itemData?.bookingStatus === 'completed' || bookingStatus === 'completed' ? 'bg-green-500 text-white py-1 px-4' : ''}`}>
                    {bookingStatus ? bookingStatus : itemData?.bookingStatus}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {format(itemData?.createdAt, 'yyyy MMM dd')}
            </TableCell>
            <TableCell className="text-left">
                Rs. {itemData?.price}
            </TableCell>
            {
                userRole === 'customer' && (

                    <TableCell className="text-right">
                        <Select onValueChange={handleChange} defaultValue={itemData?.bookingStatus} value={bookingStatus} disabled={bookingStatus === 'completed' || itemData?.bookingStatus === 'completed'}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Update the booking" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Booking Status</SelectLabel>
                                    <SelectItem value="completed">Completed</SelectItem>
                                    <SelectItem value="cancelled">Cancelled</SelectItem>
                                    <SelectItem value="pending" disabled={itemData?.bookingStatus === 'pending'}>Pending</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </TableCell>
                )
            }
        </TableRow>
    )
}

export default BookingItemComponent

// props validation
BookingItemComponent.propTypes = {
    itemData: PropTypes.object.isRequired,
    userRole: PropTypes.string
}