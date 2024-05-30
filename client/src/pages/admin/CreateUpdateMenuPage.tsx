import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import AppWrapper from '../../components/AppWrapper'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { CreateMenuRequest, menuDetailsRequest, updateMenuRequest } from '../../apiRequest/menuRequest';
import { ErrorToast, IsEmpty } from '../../helpers/formHelper';
import { useAppSelector } from '../../store/store';

const CreateUpdateMenuPage: React.FC = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const param = useParams();
    const [extraOptions, setExtraOptions] = useState<string[]>([]);
    const [extra, setExtra] = useState<any>(null);
    const [menu, setMenu] = useState<MenuReq>({
        title: "",
        desc: "",
        mDate: "",
    })
    var Menu: any = useAppSelector((state) => (state.menu.menuDetails));

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setMenu({ ...menu, [e.target.name]: e.target.value });
    };

    const handleExtraInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setExtra({ ...extra, [e.target.name]: e.target.value });
    };

    const handleExtra = (e: any): void => {
        e.preventDefault()
        setExtraOptions((prev) => [...prev, extra.extra]);
        setExtra({ ...extra, extra: "" });
    };

    const handleDelete = (f: string): void => {
        const temp = extraOptions.filter(e => e !== f)
        setExtraOptions(temp);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (IsEmpty(menu.title)) {
            ErrorToast("Title required !")
        } else if (IsEmpty(menu.desc)) {
            ErrorToast("Description required !")
        } else if (IsEmpty(menu.mDate)) {
            ErrorToast("Date required !")
        } else {
            const result: boolean = await CreateMenuRequest({ ...menu, extras: extraOptions });

            if (result) navigate('/menuList')
        }
    }

    const handleUpdate = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        if (IsEmpty(menu.title)) {
            ErrorToast("Title required !")
        } else if (IsEmpty(menu.desc)) {
            ErrorToast("Description required !")
        } else if (IsEmpty(menu.mDate)) {
            ErrorToast("Date required !")
        } else {
            const result: boolean = await updateMenuRequest({ ...menu, extras: extraOptions }, param.id)

            if (result) navigate('/menuList')
        }
    }

    useEffect(() => {
        if (param.id) {
            (async () => {
                await menuDetailsRequest(param.id)
            })();
        }
    }, [location])

    useEffect(()=>{
        if(param.id){
            setMenu({
                title: Menu?.title,
                desc: Menu?.desc,
                mDate: Menu?.date,
            });
            setExtraOptions(Menu?.extras);
        }else{
            setMenu({
                title: "",
                desc: "",
                mDate: "",
            });
            setExtraOptions([]);
        }
    }, [Menu])

    return (
        <AppWrapper>
            <div className='w-[100vw] px-[1rem] md:px-[2rem] lg:px-[5rem] py-6 mt-16'>
                <form onSubmit={param?.id ? handleUpdate : handleSubmit} className='w-full space-y-2 md:w-[40%] mx-auto py-4'>
                    <h3 className='text-2xl font-semibold'>{param.id ? "Update menu" : "Create new menu"}</h3>
                    <hr />
                    <div className='space-y-1'>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="title">Title *</label>
                            <input onChange={handleChange} value={menu.title} name="title" type="text" id='title' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" />
                        </div>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="desc">Description *</label>
                            <input onChange={handleChange} value={menu.desc} name="desc" type="text" id='desc' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" />
                        </div>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="date">Date *</label>
                            <input onChange={handleChange} value={menu.mDate?.split("T")[0]} name="mDate" type="date" id='date' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" />
                        </div>
                        <div className='space-y-1 w-full'>
                            <label className='text-base font-semibold' htmlFor="date">Add Features *</label>
                            <div className="flex items-center gap-x-2">
                                <input onChange={handleExtraInput} name='extra' value={extra?.extra} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm outline-none rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full px-2 py-1.5" placeholder="e.g. Cold drink" />
                                <button onClick={handleExtra} className='py-1 px-3 text-sm font-medium float-right text-white bg-[#1c6823] rounded-lg border border-[#1c6823] hover:opacity-85 focus:ring-4 focus:outline-none'>Add</button>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {extraOptions?.map((f) => (
                                    <div className="item" key={f}>
                                        <button onClick={() => handleDelete(f)} className='p-2 text-green-700 ring-1 ring-inset ring-green-600/20'>
                                            {f}
                                            <span className='text-red-700 text-sm ms-3 font-bold'>X</span>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <hr />
                    {
                        param.id ?
                            <button type="submit" className='px-3 py-2 text-sm font-medium float-right text-white bg-[#1c6823] rounded-lg border border-[#1c6823] hover:opacity-85 focus:ring-4 focus:outline-none'>Update</button>
                            :
                            <button type="submit" className='px-3 py-2 text-sm font-medium float-right text-white bg-[#1c6823] rounded-lg border border-[#1c6823] hover:opacity-85 focus:ring-4 focus:outline-none'>Create</button>
                    }
                </form>
            </div>
        </AppWrapper>
    )
}

export default CreateUpdateMenuPage
