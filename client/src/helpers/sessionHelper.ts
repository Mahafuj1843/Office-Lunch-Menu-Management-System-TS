class SessionHelper{
    setToken(token: string): void{
        localStorage.setItem("token",token)
    }
    getToken(): string|null {
        return localStorage.getItem("token")
    }

    setUserDetails(UserDetails: UserDetails): void{
        localStorage.setItem("UserDetails", JSON.stringify(UserDetails))
    }
    getUserDetails(): any{
        const userDetailsString: any = localStorage.getItem("UserDetails");
        return JSON.parse(userDetailsString)
    }

    removeSessions(): void{
        localStorage.clear();
        window.location.href="/"
    }

}
export const {setToken,getToken,setUserDetails,getUserDetails,removeSessions}=new SessionHelper();