import React, {useEffect} from 'react'
import { servicesData } from '@/common/displayOnlyData'
import coverBG from '@images/cover-bg-img.jpg';
import { fetchServices } from '@/store/services.slice';
import { useDispatch, useSelector } from 'react-redux';
import { setIsLoading } from '@/store/loading.slice';

// components
import ProductServiceCard from '@/components/common/ProductServiceCard'
import SearchForm from '@/components/SearchForm/SearchForm';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"


export default function ServicesPage() {


  const { loading, data, error } = useSelector((state) => state.services)

  const dispatch = useDispatch();

  useEffect(() => {
    const loadServices = async () => {
      dispatch(setIsLoading(true));
      dispatch(fetchServices());
      dispatch(setIsLoading(false));
    }
    // dispatch(fetchServices());

    loadServices();

  },[])

  useEffect(() => {
    dispatch(setIsLoading(loading));
  }), [loading]

  // console.log("data: ", data)
  

  return (
    <>
      <section className="mt-[70px] md:mt-20 relative overflow-hidden">
        <img src={coverBG} alt="cover image" className="absolute top-0 left-0 w-fullz-[10]" />
        <div className="bg-slate-950/80 py-10 px-2 md:px-0 lg:px-8 grid place-content-center min-h-[40vh] z-20 relative">

          <h1 className="text-4xl font-bold text-center text-white w-full mb-3">Our Services</h1>
          <div className="text-slate-100 text-center font-light max-w-[550px] mx-auto mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eget sem a sollicitudin.
          </div>

          <div className="search-wrapper">
            <SearchForm />
          </div>

        </div>
      </section>

      <section className="mt-20 space-y-4">
        <div className='container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 place-content-between gap-x-2 gap-y-8 px-2 md:px-0 lg:px-8'>
          {
            servicesData.map((service) => (
              <ProductServiceCard
                key={service.id}
                classNames=""
                title={service.title}
                description={service.description}
                price={service.price}
                banner={service.banner}
                link={'/services-single'}
              />
            ))
          }
        </div>
        <div className="pagination-wrapper">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>

        </div>
      </section>
    </>
  )
}
