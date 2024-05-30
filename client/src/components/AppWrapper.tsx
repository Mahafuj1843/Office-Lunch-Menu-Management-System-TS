import React, { Fragment } from 'react'
import Header from './Header'
import Footer from './Footer'

interface AppWrapperProps {
    children: React.ReactNode;
}

export default function AppWrapper({ children }: AppWrapperProps) {
    return (
        <Fragment>
            <Header />
            <div>{children}</div>
            <Footer />
        </Fragment>
    )
}