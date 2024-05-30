import React from 'react'
import { menuDetailsRequest } from '../apiRequest/menuRequest'
import { getToken } from '../helpers/sessionHelper';
import { useNavigate } from 'react-router-dom';
import { ErrorToast } from '../helpers/formHelper';

const MenuCard: React.FC<MenuCardProps> = ({ menu, setShowPopup }) => {
    let navigate = useNavigate();

    const onSelectMenu = async (id: number): Promise<void> =>{
        if(getToken()){
            await menuDetailsRequest(id);
            setShowPopup(true);
        }else{
            ErrorToast("Please login first.")
            navigate('/login')
        }
    }
    return (
        <>
            <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src="https://as1.ftcdn.net/v2/jpg/02/51/39/42/1000_F_251394284_Tn8Z8opzrQylClF7Nu8cuA26lf398oCS.jpg" alt="menu-img" />
                </a>
                <div className="px-2 md:px-5 py-2">
                    <h5 className="mb-2 text-md md:text-lg font-bold tracking-tight text-gray-900 dark:text-white">{menu.title}</h5>
                    <p className="mb-3 text-sm font-light md:font-normal text-gray-700 dark:text-gray-400">{menu.desc}</p>
                    <button onClick={()=>onSelectMenu(menu.id)} className="w-full px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Select now
                    </button>
                </div>
            </div>
        </>
    )
}

export default MenuCard
