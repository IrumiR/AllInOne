// import React from 'react'


import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import Router from '@/routes/Router'

function MainLayout() {
  return (
    <>
   <Header />
    <main>
    <Router />
    </main>
    <Footer />
    </>
  )
}

export default MainLayout