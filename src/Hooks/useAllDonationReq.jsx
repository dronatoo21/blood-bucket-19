import { useEffect, useState } from 'react';

const useAllDonationReq = () => {
    const [donations, setDonations] = useState(null)
    const URL = `https://blood-bucket-server-phi.vercel.app/donations`
    useEffect(()=>{
        fetch(URL)
        .then(res => res.json())
        .then(data => {
            setDonations(data)
        })
    },[URL])
    return donations
};

export default useAllDonationReq;