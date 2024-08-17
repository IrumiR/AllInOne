import { useEffect, useState } from 'react'
import { servicesData } from '@/common/displayOnlyData'
import { useSelector, useDispatch } from 'react-redux'
import { getAllOrders } from '@/services/orders.service'

// import { services }  from '@/store/redux.store.js'
import { fetchProducts } from '@/store/products.slice'
import { setIsUserAuthenticated } from '@/store/auth.slice'
import { LOCAL_STORAGE_KEYS } from '@/common/constants'
import { deleteProductById } from '@/services/products.service'
import { fetchOrderProductsByServiceProviderId } from '@/services/booking.service'
import { setIsLoading } from '@/store/loading.slice'
import { getServiceProviderByUserId } from '@/services/serviceproviders.service'
import {getAllUsersByRole} from '@/services/users.services'

import ServicesProviderNavbar from './ServicesProviderNavbar'
import ProductServiceCard from '@/components/common/ProductServiceCard'
import OrderItemCompoent from '../MiniComponents/OrdersListComponents/OrderItemCompoent'

import { Card, CardHeader, CardContent, CardDescription, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

function ServicesProviderOrders() {

  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.products)
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID)
  const userRole = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ROLE)
  const [productOrders, setProductOrders] = useState([])
  const [deliveryRiders, setDeliveryRiders] = useState([])

  console.log("userId: ", userId)

  useEffect(() => {
    // get order priducts by service provider id
    // const fecthOrderPorducts = async (userID) => {
    //   try {
    //     dispatch(setIsLoading(true))
    //     const serviceProvider = await getServiceProviderByUserId(userID)
    //     console.log("serviceProvider: ", serviceProvider)
    //     const serviceProviderId = serviceProvider?.data._id;
    //     console.log("serviceProviderId: ", serviceProviderId)
    //     const response = await fetchOrderProductsByServiceProviderId(serviceProviderId)
    //     const data = response.data
    //     setProductOrders(data)
    //     // console.log(response)
    //     // dispatch(setProducts(response.data))
    //   } catch (error) {
    //     console.error(error)
    //   } finally {
    //     dispatch(setIsLoading(false))
    //   }
    // }

    // fecthOrderPorducts(userId)

    const fetchOrders = async (userID) => {
      try {
        dispatch(setIsLoading(true))
        const response = await getAllOrders(userID)
        const data = response.data
        console.log("data: ", data)
        setProductOrders(data)
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(setIsLoading(false))
      }
    }

    fetchOrders(userId);

    const fetchDeliveryRiders = async () => {
      try {
        dispatch(setIsLoading(true))
        const response = await getAllUsersByRole('delivery-person')
        const data = response.data
        setDeliveryRiders(data)
        // console.log("Rdata: ", data)
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(setIsLoading(false))
      }
    }

    fetchDeliveryRiders();

  }, [userId])

  return (
    <section className='mt-20'>
      <div className="container">
        <div className="min-h-[50vh] flex py-4 w-full flex-col relative border rounded-lg overflow-hidden">
          <ServicesProviderNavbar />
          <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
            <div className="title-wrapper lg:px-8">
              {/* <h3 className="text-[35px] font-bold mb-4">Your Orders</h3> */}
            </div>
            <div className="services-wrapper grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 place-content-between gap-x-2 gap-y-8 px-2 md:px-0 lg:px-8">
              <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                  <CardTitle>Your orders for Your products</CardTitle>
                  <CardDescription>
                    Recent orders from your products.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead className="text-center hidden sm:table-cell">
                          Status
                        </TableHead>
                        <TableHead className="hidden md:table-cell">
                          Date
                        </TableHead>
                        <TableHead className="text-left">Amount</TableHead>
                        {
                          userRole === 'service-provider' && (
                            <TableHead className="text-left">Delivery Rider</TableHead>
                          )
                        }

                        {
                          userRole === 'service-provider' && (
                            <TableHead className="text-left">Action</TableHead>
                          )
                        }
                      </TableRow>
                    </TableHeader>
                    <TableBody>

                      {
                        productOrders.length > 0 && productOrders.map((prodcutOrder, index) => {
                          return (
                            <OrderItemCompoent userRole={userRole} key={index} itemData={prodcutOrder} delivery={deliveryRiders} />
                          )
                        })
                      }
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesProviderOrders