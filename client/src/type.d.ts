interface UserDetails {
    id: number,
    name: string,
    email: string,
    role: string,
    createdAt: Date
}

interface CustomInputProps {
    type: string;
    placeholder: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    name: string;
}

interface PaginationProps {
    pageNo: number;
    perPage: number;
    total: number,
    handlePageClick: (e: any) => void
}

interface RegistrationReq {
    name: string,
    email: string,
    pass: string,
}

interface LoginReq {
    email: string,
    pass: string,
}

interface Menu {
    id: number,
    title: string,
    desc: string,
    date: Data,
    createdAt: Data
}

interface singleMenu {
    id: number?,
    title: string?,
    desc: string?,
    date: Date?,
    extras: string[]?,
    createdAt: Date?,
    updatedAt: Date?
}

interface MenuCardProps {
    menu: Menu,
    setShowPopup: (i: boolean) => void;
}

interface CreateMenuReq {
    title: string,
    desc: string,
    mDate: Date,
    extras: string[]
}

interface SelectMenuModelProps {
    showPopup: boolean,
    setShowPopup: (i: boolean) => void;
}

interface MenuReq {
    title: string,
    desc: string,
    mDate: any,
}