import { Fragment } from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <Fragment>
            <div className='px-[1rem] md:px-[2rem] lg:px-[5rem] mt-8 border-t py-6'>
                <div className='flex flex-col lg:flex-row-reverse items-center justify-center gap-x-4 gap-y-2 text-sm text-gray-700'>
                    <div className='flex flex-wrap items-center justify-center gap-x-4 gap-y-2'>
                        <Link to="#">Terms</Link>
                        <Link to="#">Status</Link>
                        <Link to="#">Security</Link>
                        <Link to="#">Privacy</Link>
                        <Link to="#">Docs</Link>
                        <Link to="#">Contact</Link>
                        <Link to="#">Manage cookies</Link>
                        <span>Do not share my personal information</span>
                    </div>
                    <p>© 2024 LunchHub, Dev.</p>
                </div>
            </div>
        </Fragment>
    )
}

export default Footer