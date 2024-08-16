import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { format } from 'date-fns'

import { getUserById } from "@/services/users.services"

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

function OrderItemCompoent(props) {

    const { itemData } = props;
    const [customerInfo, setCustomerInfo] = React.useState(null);

    // console.log("Order Item", itemData);


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
        fetchUserDetails(userID);

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
            <TableCell className="text-right">
                Rs. {itemData?.totalAmount}
            </TableCell>
            <TableCell className="text-right">
                <Select>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Fruits</SelectLabel>
                            <SelectItem value="apple">Apple</SelectItem>
                            <SelectItem value="banana">Banana</SelectItem>
                            <SelectItem value="blueberry">Blueberry</SelectItem>
                            <SelectItem value="grapes">Grapes</SelectItem>
                            <SelectItem value="pineapple">Pineapple</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </TableCell>
        </TableRow>
    )
}

export default OrderItemCompoent

// props validation
OrderItemCompoent.propTypes = {
    itemData: PropTypes.object.isRequired,
}