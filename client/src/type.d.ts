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

interface RegistrationReq {
    name: string,
    email: string,
    pass: string,
}

interface LoginReq{
    email: string,
    pass: string,
}