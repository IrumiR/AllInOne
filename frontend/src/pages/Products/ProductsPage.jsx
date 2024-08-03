import React from 'react';
import coverBG from '@images/cover-bg-img.jpg';
import { productsData } from '@/common/displayOnlyData';

// components
import ProductServiceCard from '@/components/common/ProductServiceCard';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

function ProductsPage() {
    return (
        <>
            <section className="mt-20 overflow-hidden relative">
                <img src={coverBG} alt="cover image" className="absolute top-0 left-0 w-fullz-[10]" />
                <div className="bg-slate-950/80 py-10 px-2 md:px-0 lg:px-8 grid place-content-center min-h-[40vh] z-20 relative">

                    <h1 className="text-4xl font-bold text-center text-white w-full mb-3">Products by Our Service Providers</h1>
                    <div className="text-slate-100 text-center font-light max-w-[550px] mx-auto mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis eget sem a sollicitudin.
                    </div>


                </div>
            </section>
            <section className="mt-20 space-y-4">
                <div className='container grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 place-content-between gap-x-2 gap-y-8 px-2 md:px-0 lg:px-8'>
                    {
                        productsData.map((product) => (
                            <ProductServiceCard
                                key={product.id}
                                classNames=""
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                banner={product.image}
                                link={'/products-single'}
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

export default ProductsPage