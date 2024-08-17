import React from 'react'
import { Link } from 'react-router-dom'

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

import RegisterForm from '@/components/RegisterForm/RegisterForm'
import ServiceProviderRegForm from '@/components/RegisterForm/ServiceProviderRegForm'

function RegisterPage() {
    return (
        <section className="mt-20">
            <div className="w-full lg:grid lg:grid-cols-1">
                <div className="flex items-center justify-center py-12">

                    <Tabs defaultValue="account" className="w-[600px]">
                        <TabsList className="grid w-full grid-cols-2 h-14">
                            <TabsTrigger className="h-12" value="customer">Customer Register</TabsTrigger>
                            <TabsTrigger className="h-12" value="serviceprovider">Service Provider Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value="customer">
                            <RegisterForm />
                        </TabsContent>
                        <TabsContent value="serviceprovider">
                        <ServiceProviderRegForm />
                        </TabsContent>
                    </Tabs>
                </div>
                {/* <div className="hidden bg-muted lg:block">
                <img
                    src="https://images.unsplash.com/photo-1605658781469-50bcc2522522?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="img"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div> */}
            </div>
        </section>
    )
}

export default RegisterPage