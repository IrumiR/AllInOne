import { useEffect, useState } from 'react'
import { LOCAL_STORAGE_KEYS } from '@/common/constants';

import CustomerBookings from './CustomerDashboard/CustomerBookings';
import ServicesProviderBookings from './ServicesProviderDashboard/ServicesProviderBookings';

function AllBookingsPage() {

    const [localRole, setLocalRole] = useState(null);

    useEffect(() => {
        console.log('AllOrdersPage');

        const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE);
        setLocalRole(userRole);

    }, [])

    return (
        <div>
            {
                localRole === 'service-provider' ? (
                    <ServicesProviderBookings />
                ) : (
                    <CustomerBookings />
                )

            }
        </div>
    )
}

export default AllBookingsPage