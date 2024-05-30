import React, { ChangeEvent, useEffect, useState } from 'react'
import AppWrapper from '../components/AppWrapper'
import MenuCard from '../components/MenuCard'
import Pagination from '../components/Pagination'
import { todayMenuListRequest } from '../apiRequest/menuRequest'
import SelectMenuModel from '../components/models/SelectMenuModel'
import { useAppSelector } from '../store/store'

const MenuPage: React.FC = () => {
    const [pageNo, setPageNo] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(4)
    const [searchKey, setSearchKey] = useState<string>("");
    const [showPopup, setShowPopup] = useState<boolean>(false)

    let Menus: Menu[] = useAppSelector((state) => (state.menu.menus));
    let Total: number = useAppSelector((state) => (state.menu.total))

    const handlePageClick = (e: any): void => {
        setPageNo(e.selected)
    };

    const searchKeywordOnChange = (e: ChangeEvent<HTMLInputElement>): any => {
        const timeout = setTimeout(() => {
            setSearchKey(e.target.value)

            if ((e.target.value).length === 0) setSearchKey("")
        }, 2000)

        return () => {
            clearTimeout(timeout)
        }
    }

    const perPageOnChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setPerPage(parseInt(e.target.value))
    }

    useEffect(() => {
        (async () => {
            await todayMenuListRequest(pageNo + 1, perPage, searchKey);
        })();
    }, [pageNo, perPage, searchKey])

    return (
        <AppWrapper>
            <SelectMenuModel showPopup={showPopup} setShowPopup={setShowPopup} />
            <div className='w-[100vw] px-[1rem] md:px-[2rem] lg:px-[5rem] py-6 mt-16'>
                <div className='w-full lg:w-[90%] mx-auto lg:px-2'>
                    <h2 className='text-center font-bold text-xl border py-1'>Today Menu List</h2>
                    <div className='w-full py-3 flex flex-col md:flex-row items-center justify-between gap-y-3'>
                        <div className='flex gap-3 items-center'>
                            <select onChange={(e)=>perPageOnChange(e)} id="lsit" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C1654] focus:border-[#2C1654] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#2C1654] dark:focus:border-[#2C1654]">
                                <option selected value="4"> 4 Per Page </option>
                                <option value="8"> 8 Per Page </option>
                                <option value="12"> 12 Per Page </option>
                            </select>
                        </div>
                        <div className="border-md">
                            <input type="search" onChange={searchKeywordOnChange} id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full lg:w-[250px] px-2.5 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name" required />
                        </div>
                    </div>
                    {
                        Total ?
                            <>
                                <div className='py-2 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3'>
                                    {
                                        Menus.map((menu, i) =>
                                            <MenuCard menu={menu} key={i} setShowPopup={setShowPopup} />
                                        )
                                    }
                                </div>
                                <Pagination pageNo={pageNo + 1} perPage={perPage} total={Total} handlePageClick={handlePageClick} />
                            </>
                            :
                            <h4 className='text-center font-semibold'>No data found</h4>
                    }
                </div>
            </div>
        </AppWrapper>
    )
}

export default MenuPage
