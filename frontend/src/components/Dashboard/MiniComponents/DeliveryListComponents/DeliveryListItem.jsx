import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'
import { useDispatch } from 'react-redux'
import { toast } from 'sonner'
import { setIsLoading } from '@/store/loading.slice'

import { getUserById } from "@/services/users.services"
import { updateOrder } from "@/services/orders.service"

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

function DeliveryListItem(props) {

    const { itemData, userRole, delivery } = props;
    const [customerInfo, setCustomerInfo] = useState(null);
    const [orderData, setOrderData] = useState(itemData);
    const [orderStatus, setOrderStatus] = useState(itemData?.orderStatus);
    const [deliveryPerson, setDeliveryPerson] = useState(null);

    const dispatch = useDispatch();

    // console.log("Order Item", itemData);

    const handleChange = async (value) => {
        // console.log("Selected value", value);
        // if (value === 'completed') {
        //     setBookingStatus('pending');
        // }
        // setBookingStatus(value);

        try {
            dispatch(setIsLoading(true));
            const response = await updateOrder(itemData?._id, { orderStatus: value });
            setOrderData(response.data.bookingStatus);
            toast.success("Booking updated successfully");
            setOrderStatus(response.data.orderStatus);

            console.log("Updated booking status", response);
        } catch (error) {
            console.error("Failed to update booking status", error);

        } finally {
            dispatch(setIsLoading(false));
        }
    }

    const handleDeliveryChange = async (value) => {

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
        if (typeof userID === 'object') {
            // console.log("User ID is object", userID);
            fetchUserDetails(userID._id);
        } else {
            // console.log("User ID is not object", userID);
            fetchUserDetails(userID);
        }

    }, [itemData])

    return (
        <TableRow className="hover:bg-accent">
            <TableCell>
                <div className="font-medium">{customerInfo?.firstName} {customerInfo?.lastName}</div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                    {customerInfo?.email}
                </div>
            </TableCell>
            {/* <TableCell className={`hidden sm:table-cell`}>
                {itemData?.orderStatus}
            </TableCell> */}
            <TableCell className="hidden sm:table-cell">
                <Badge variant="primary" className={`text-xs ${itemData?.orderStatus === 'completed' ? 'bg-green-500 text-white py-1 px-4' : ''}`}>
                    {itemData?.orderStatus}
                </Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
                {format(itemData?.createdAt, 'yyyy MMM dd')}
            </TableCell>
            <TableCell className="text-left">
                Rs. {itemData?.totalAmount}
            </TableCell>

            {
                userRole === 'service-provider' && (
                    <TableCell className="text-right">
                        <Select onValueChange={handleDeliveryChange} disabled={orderStatus === "dispatched" || itemData?.orderStatus === 'completed'}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Delivery Rider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Select Delivery Person</SelectLabel>
                                    {
                                        delivery?.map((person) => (
                                            <SelectItem key={person._id} value={person._id}>{person.firstName} {person.lastName}</SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </TableCell>
                )
            }

            {
                userRole === 'service-provider' && (
                    <TableCell className="text-right">
                        <Select onValueChange={handleChange} defaultValue={itemData?.orderStatus} value={orderStatus} disabled={orderStatus === "dispatched" || itemData?.orderStatus === 'completed'}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Order Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Order Status</SelectLabel>
                                    <SelectItem value="pending">Pending</SelectItem>
                                    <SelectItem value="processing">Processing</SelectItem>
                                    <SelectItem value="dispatched">Dispatched</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </TableCell>
                )
            }



        </TableRow>
    )
}

export default DeliveryListItem

// props validation
DeliveryListItem.propTypes = {
    itemData: PropTypes.object.isRequired,
    userRole: PropTypes.string,
    delivery: PropTypes.array
}
