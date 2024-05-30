import React, { ChangeEvent, useEffect, useState } from 'react'
import moment from 'moment'
import AppWrapper from '../../components/AppWrapper'
import Pagination from '../../components/Pagination'
import { allChoiceListRequest } from '../../apiRequest/choiceRequest'
import { useAppSelector } from '../../store/store'

const ChoiceListPage: React.FC = () => {
    const [pageNo, setPageNo] = useState<number>(0)
    const [perPage, setPerPage] = useState<number>(10)

    let Choices: ChoiceList[] = useAppSelector((state) => (state.choice.choices));
    let Total: number = useAppSelector((state) => (state.choice.total))

    const handlePageClick = (e: any): void => {
        setPageNo(e.selected)
    };

    const perPageOnChange = (e: ChangeEvent<HTMLSelectElement>): void => {
        setPerPage(parseInt(e.target.value))
    }

    useEffect(() => {
        (async () => {
            await allChoiceListRequest(pageNo + 1, perPage);
        })();
    }, [pageNo, perPage])

    return (
        <AppWrapper>
            <div className='w-[100vw] px-[1rem] md:px-[2rem] lg:px-[5rem] py-6 mt-16'>
                <div className='w-full lg:w-[90%] mx-auto lg:px-2'>
                    <h2 className='text-center font-bold text-xl border py-1'>Choice List</h2>
                    <div className='w-full py-3 flex flex-col md:flex-row items-center justify-between gap-y-3'>
                        <div className='flex gap-3 items-center'>
                            <select onChange={perPageOnChange} id="lsit" className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#2C1654] focus:border-[#2C1654] block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#2C1654] dark:focus:border-[#2C1654]">
                                <option selected value="10"> 10 Per Page </option>
                                <option value="20"> 20 Per Page </option>
                                <option value="30"> 30 Per Page </option>
                            </select>
                        </div>
                        <div className="border-md">
                            <input type="search" /*onChange={searchKeywordOnChange}*/ id="search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full lg:w-[250px] px-2.5 py-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Name" required />
                        </div>
                    </div>

                    <div className="max-w-full overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className='border-b'>
                                <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                    <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-2">
                                        Employee Name
                                    </th>
                                    <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                                        Menu Title
                                    </th>
                                    <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                                        Extras
                                    </th>
                                    <th className="py-4 px-4 font-medium text-black dark:text-white">
                                        Choice Date
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Choices.map((choice, i) =>
                                        <tr key={i} className='h-fit'>

                                            <td className="border-b border-[#eee] py-5 px-4">
                                                <h5 className="font-medium text-black">
                                                    {choice.user.name}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                {choice.menu.title}
                                            </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                {
                                                    choice.extras.length ?
                                                        <div className='flex gap-1 flex-wrap'>
                                                            {
                                                                choice.extras.map((extra, i) =>
                                                                    <span key={i} className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">{extra}</span>
                                                                )
                                                            }
                                                        </div>
                                                        :
                                                        <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">None</span>
                                                }                                             </td>
                                            <td className="border-b border-[#eee] py-5 px-4">
                                                {moment(choice.createdAt).format("Do MMM, YYYY")}
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        Total ?
                            <Pagination pageNo={pageNo + 1} perPage={perPage} total={Total} handlePageClick={handlePageClick} />
                            :
                            <h4 className='mt-5 text-center font-semibold'>No data found</h4>
                    }
                </div>
            </div>
        </AppWrapper>
    )
}

export default ChoiceListPage
