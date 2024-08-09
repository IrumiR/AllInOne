import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';

import CustomerDashboard from './CustomerDashboard/CustomerDashboard'


function DashboardLayout() {
  return (
    <section className="dashboard-wrapper mt-20">
      <div className="container">
        <CustomerDashboard />

      </div>
    </section>
  )
}

export default DashboardLayout