import React, { ChangeEvent, Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/store';
import { createChoiceRequest } from '../../apiRequest/choiceRequest';

const SelectMenuModel: React.FC<SelectMenuModelProps> = ({ showPopup, setShowPopup }) => {
    let navigate = useNavigate();
    const [extras, setExtra] = useState<string[]>([])
    
    let Menu: any = useAppSelector((state) => (state.menu.menuDetails));

    const handleCheck = (ev: ChangeEvent<HTMLInputElement>, extraThing: any): void => {
        if (ev.target.checked) {
            setExtra(prev => [...prev, extraThing]);
        } else {
            setExtra(prev => {
                return prev.filter(e => e !== extraThing);
            });
        }
    };

    const onSubmit = async (): Promise<void> =>{
        const result: boolean = await createChoiceRequest(extras, Menu.id)

        if(result){
            setShowPopup(!showPopup)
            navigate('/myChoice')
        }
    }

    return (
        <Fragment >
            <div className="fixed h-screen w-full z-50 left-0 top-0 transition duration-300 ease-in-out" style={{ display: showPopup ? 'block' : 'none' }}>
                <div onClick={() => setShowPopup(false)} className="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"></div>
                <div className="w-[95%] lg:w-2/6 h-fit my-6 mx-auto bg-white p-3 space-y-1 shadow-md rounded-lg border-4 border-spacing-4 border-gray-400">
                    <button onClick={() => setShowPopup(false)} className='float-right text-black mb-2'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x-circle"><circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" /></svg>
                    </button>
                    <div className="w-full bg-white border border-gray-200 rounded-lg overflow-y-auto"
                        style={{ maxHeight: 'calc(100vh - 120px)' }}>
                        <a href="#">
                            <img className="rounded-t-lg" src="https://as1.ftcdn.net/v2/jpg/02/51/39/42/1000_F_251394284_Tn8Z8opzrQylClF7Nu8cuA26lf398oCS.jpg" alt="menu-img" />
                        </a>
                        <div className="px-2 md:px-5 py-2">
                            <h5 className="mb-2 text-md md:text-lg font-bold tracking-tight text-gray-900 dark:text-white">{Menu.title}</h5>
                            <p className="mb-3 text-sm font-light md:font-normal text-gray-700 dark:text-gray-400">{Menu.desc}</p>
                            {
                            Menu?.extras?.length > 0 && (
                                <div className="py-2">
                                    <h3 className="text-center text-gray-700">Any extras?</h3>
                                    {Menu.extras.map((extraThing: string, i: number) => (
                                        <label
                                            key={i}
                                            className="flex items-center gap-2 p-4 border rounded-md mb-1">
                                            <input
                                                type="checkbox"
                                                onChange={e => handleCheck(e, extraThing)}
                                                name={extraThing}
                                            />
                                            {extraThing}
                                        </label>
                                    ))}
                                </div>
                            )}
                            <button onClick={()=>onSubmit()} className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Select
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default SelectMenuModel
