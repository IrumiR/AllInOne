import React from 'react'
import { Link } from 'react-router-dom'
import RegisterForm from '@/components/RegisterForm/RegisterForm'

function RegisterPage() {
    return (
        <section className="mt-20">
        <div className="w-full lg:grid lg:grid-cols-2">
            <div className="flex items-center justify-center py-12">
                <RegisterForm />
            </div>
            <div className="hidden bg-muted lg:block">
                <img
                    src="https://images.unsplash.com/photo-1605658781469-50bcc2522522?q=80&w=1905&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="img"
                    className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
            </div>
        </div>
        </section>
    )
}

export default RegisterPage