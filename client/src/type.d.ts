interface UserDetails {
    id: number,
    name: string,
    email: string,
    role: string,
    createdAt: Date
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

interface ChoiceList {
    id: number,
    extras: string[],
    createdAt: Date,
    user: {
        name: string,
    }
    menu: {
        title: string
    }
}

interface MyChoiceList {
    id: number,
    extras: string[],
    createdAt: Date,
    menu: {
        title: string
    }
}