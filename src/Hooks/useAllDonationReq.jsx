import { useEffect, useState } from 'react';

const useAllDonationReq = () => {
    const [donations, setDonations] = useState(null)
    const URL = `http://localhost:4000/donations`
    useEffect(()=>{
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setDonations(data)
        })
    },[URL])
    console.log(donations);
    return donations
};

export default useAllDonationReq;