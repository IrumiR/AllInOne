import { useEffect, useState } from 'react'
import { servicesData } from '@/common/displayOnlyData'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

// import { services }  from '@/store/redux.store.js'
import { fetchProducts } from '@/store/products.slice'
import { setIsUserAuthenticated } from '@/store/auth.slice'
import { LOCAL_STORAGE_KEYS } from '@/common/constants'
import { deleteProductById } from '@/services/products.service'
import { getProductsByServiceProviderId } from '@/services/products.service'

import ServicesProviderNavbar from './ServicesProviderNavbar'
import ProductServiceCard from '@/components/common/ProductServiceCard'
import { buttonVariants } from '@/components/ui/button'
import { PlusCircleIcon } from 'lucide-react'

function ServicesProviderProducts() {

  const dispatch = useDispatch()
  const { data, loading, error } = useSelector((state) => state.products)
  const userId = localStorage.getItem(LOCAL_STORAGE_KEYS.USER_ID)
  const [productsData, setProductsData] = useState([])

  // console.log(data)

  useEffect(() => {
    const fetchProducts = async (userID) => {
      try {
        const response = await getProductsByServiceProviderId(userID)
        const data = response.data
        setProductsData(data)

        // console.log(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProducts(userId);
  }, [userId])


  return (
    <section className='mt-20'>
      <div className="container">
        <div className="min-h-[50vh] flex py-4 w-full flex-col relative border rounded-lg overflow-hidden">
          <ServicesProviderNavbar />
          <div className='flex flex-col sm:gap-4 sm:py-4 sm:pl-14'>
            <div className="title-wrapper lg:px-8 flex flex-row justify-between items-center">
              <h3 className="text-[35px] font-bold mb-4">Your Products</h3>
              <Link to="/dashboard/products/add" className={`${buttonVariants({ variant: 'default', size: 'lg' })} gap-2`}>
                <PlusCircleIcon size={22} />
                <span>Create a Product</span>
              </Link>
            </div>
            <div className="services-wrapper grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 place-content-between gap-x-2 gap-y-8 px-2 md:px-0 lg:px-8">

              {
                productsData?.map((product) => (
                  <ProductServiceCard
                    key={product._id}
                    classNames=""
                    title={product.name}
                    description={product.description}
                    price={product.price.toString()}
                    banner={product.image}
                    link={`${product._id}`}
                    btnText="Edit Product"
                    deleteAction={deleteProductById}
                    id={product._id}
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

export default ServicesProviderProducts