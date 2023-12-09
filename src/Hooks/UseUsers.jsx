import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const UseUsers = () => {
    const {user} = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const URL = `https://blood-bucket-server-phi.vercel.app/users?email=${user?.email}`
    useEffect(()=>{
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setUserData(data[0])
        })
    },[URL])
    return {userData}
};
export default UseUsers;