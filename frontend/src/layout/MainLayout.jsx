import { useState, useEffect } from 'react'


import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Router from '@/routes/Router'
import { Toaster } from 'sonner'
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent'

import { useSelector } from 'react-redux'


function MainLayout() {

  const isLoading = useSelector((state) => state.loading.isLoading);

  return (
    <>
      <Header />
        <main>
          { isLoading && <LoadingComponent /> }
          <Router />
        </main>
        <Footer />

    <Toaster position="top-right" closeButton richColors />
    </>
  )
}

export default MainLayout