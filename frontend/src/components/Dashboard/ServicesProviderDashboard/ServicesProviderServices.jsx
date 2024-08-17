import { useEffect, useState } from 'react'
import { servicesData } from '@/common/displayOnlyData'
import { useSelector, useDispatch } from 'react-redux'

// import { services }  from '@/store/redux.store.js'
import { fetchServices } from '@/store/services.slice'
import { setIsUserAuthenticated } from '@/store/auth.slice'
import { LOCAL_STORAGE_KEYS } from '@/common/constants'
import { getServicesByServiceProviderId } from '@/services/services.service'
import { deleteServiceById } from '@/services/services.service'
import { setIsLoading } from '@/store/loading.slice'
import { getServiceProviderByUserId } from '@/services/serviceproviders.service'

import ServicesProviderNavbar from './ServicesProviderNavbar'
import ProductServiceCard from '@/components/common/ProductServiceCard'
import { Link } from 'react-router-dom'
import { buttonVariants } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'


function ServicesProviderServices() {

  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.services)
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID)
  const [servicesData, setServicesData] = useState([])

  // console.log(data)

  useEffect(() => {
    const fetchServices = async (userID) => {
      try {
        dispatch(setIsLoading(true))
        const serviceProvider = await getServiceProviderByUserId(userID)
        const serviceProviderId = serviceProvider?.data._id;
        // console.log("serviceProviderId ", serviceProviderId)

        const response = await getServicesByServiceProviderId(serviceProviderId)
        const data = response.data
        setServicesData(data)

        // console.log("datas ", data)
      } catch (error) {
        console.error(error)
      } finally {
        dispatch(setIsLoading(false))
      }
    }

    fetchServices(userId);
  }, [userId])


  return (
    <section className='mt-20'>
      <div className="container">
        <div className="min-h-[50vh] flex py-4 w-full flex-col relative border rounded-lg overflow-hidden">
          <ServicesProviderNavbar />
          <div className="container">
            <div className="title-wrapper px-8 flex justify-between items-center mb-4">
              <h3 className="text-[35px] font-bold mb-4">Your Services</h3>
              <Link to="/dashboard/services/add" className={`${buttonVariants({ variant: 'default', size: 'lg' })} gap-2`}>
                <PlusCircleIcon size={22} />
                <span>Create a Service</span>
              </Link>
            </div>
            <div className="services-wrapper grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 place-content-around gap-x-2 gap-y-8 px-2 md:px-0 lg:px-8">
              {
                servicesData.length === 0 && (
                  <div className="flex flex-col items-center justify-center col-span-4 space-y-3">
                    <h3 className="text-[20px] text-center">No services found</h3>
                    <Link to="/dashboard/services/add" className={`${buttonVariants({ variant: 'default', size: 'lg' })} gap-2`}>
                      <PlusCircleIcon size={22} />
                      <span>Create a Service</span>
                    </Link>
                  </div>
                )
              }

              {
                servicesData?.map((service) => (
                  <ProductServiceCard
                    key={service._id}
                    classNames=""
                    title={service.title}
                    description={service.description}
                    price={service.price}
                    banner={service.image}
                    link={`${service._id}`}
                    btnText="Edit Service"
                    deleteAction={deleteServiceById}
                    id={service._id}
                  />
                ))
              }
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default ServicesProviderServices