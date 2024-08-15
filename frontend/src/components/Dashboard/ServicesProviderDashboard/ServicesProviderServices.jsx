import { useEffect } from 'react'
import { servicesData } from '@/common/displayOnlyData'
import { useSelector, useDispatch } from 'react-redux'

// import { services }  from '@/store/redux.store.js'
import { fetchServices } from '@/store/services.slice'
import { setIsUserAuthenticated } from '@/store/auth.slice'
import { LOCAL_STORAGE_KEYS } from '@/common/constants'
import { deleteServiceById } from '@/services/services.service'

import ServicesProviderNavbar from './ServicesProviderNavbar'
import ProductServiceCard from '@/components/common/ProductServiceCard'

function ServicesProviderServices() {

  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.services)

  console.log(data)

  useEffect(() => {
    dispatch(fetchServices());

    // check auth
    const checkAuth = async () => {
      const accessToken = localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      if (!accessToken) {
        dispatch(setIsUserAuthenticated(false));
      } else {
        dispatch(setIsUserAuthenticated(true));
      }
    }

    checkAuth();

  }, [dispatch])


  return (
    <section className='mt-20'>
      <div className="container">
        <div className="min-h-[50vh] flex py-4 w-full flex-col relative border rounded-lg overflow-hidden">
          <ServicesProviderNavbar />
          <div className="container">
          <div className="title-wrapper px-8">
            <h3 className="text-[35px] font-bold mb-4">Your Services</h3>
          </div>
          <div className="services-wrapper grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 place-content-around gap-x-2 gap-y-8 px-2 md:px-0 lg:px-8">
            {
              data?.map((service) => (
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