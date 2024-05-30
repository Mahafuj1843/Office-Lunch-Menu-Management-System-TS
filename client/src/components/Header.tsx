import { Fragment, useState } from 'react'
import { getToken, getUserDetails } from '../helpers/sessionHelper'
import { Link } from 'react-router-dom';

const Header = () => {
    const [myMenu, setMyMenu] = useState<boolean>(false);

    const onLogout = async (): Promise<void> => {
        
    }

    return (
        <Fragment>
            <div className="z-50 fixed top-0 flex items-center justify-between w-full bg-white border-b shadow-sm py-4 px-[1rem] md:px-[2rem] lg:px-[5rem]">
                <Link to="/" className='text-xl font-bold'>LunchHub</Link>
                {
                    getToken() ?
                        <div className="absolute inset-y-0 right-0 flex items-center gap-1.5 md:gap-3 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* <!-- Profile dropdown --> */}
                            <div className="relative">
                                <button onClick={() => setMyMenu(!myMenu)} type="button" className="flex items-center justify-center rounded-full bg-purple-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-400" id="user-menu-button">
                                    <p className="h-8 w-8 rounded-full text-lg font-semibold text-white mt-0.5">{getUserDetails().name.slice(0, 1).toUpperCase()}</p>
                                </button>

                                <div onBlur={() => setMyMenu(!myMenu)} className={`${myMenu ? "block" : "hidden"} absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transition-all ease-out duration-100`} role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                                    {
                                        getUserDetails()?.role === "ADMIN" ?
                                            <>
                                                <Link to="/menuList" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-marked"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><polyline points="10 2 10 10 13 7 16 10 16 2" /></svg>
                                                    Menu List
                                                </Link>
                                                <Link to="/choiceList" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-marked"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><polyline points="10 2 10 10 13 7 16 10 16 2" /></svg>
                                                    Choice List
                                                </Link>
                                            </>
                                            :
                                            <>
                                                <Link to="/myChoice" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-book-marked"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><polyline points="10 2 10 10 13 7 16 10 16 2" /></svg>
                                                    My Choice
                                                </Link>
                                            </>
                                    }
                                    <button onClick={onLogout} className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-left-from-line"><path d="m9 6-6 6 6 6" /><path d="M3 12h14" /><path d="M21 19V5" /></svg>
                                        Sign out
                                    </button>
                                </div>
                            </div>
                        </div>
                        :
                        <div className="absolute inset-y-0 right-0 flex items-center  gap-2 md:gap-4 text-sm md:text-base pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            <Link to="/login" className="relative rounded-md border border-gray-400 py-1 px-2 cursor-pointer">
                                Sign in
                            </Link>
                            <Link to="/register" className="relative rounded-md border border-gray-400 py-1 px-2 cursor-pointer">
                                Sign up
                            </Link>
                        </div>
                }
            </div >
        </Fragment >
    )
}

export default Header