import { useEffect, useState } from 'react'
import { LOCAL_STORAGE_KEYS } from '@/common/constants';


import CustomerOrders from './CustomerDashboard/CustomerOrders';
import ServicesProviderOrders from './ServicesProviderDashboard/ServicesProviderOrders';

function AllOrdersPage() {

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
                <h1>Service Provider Orders</h1>
            ) : (
                <CustomerOrders />
            )
        }
    </div>
  )
}

export default AllOrdersPage