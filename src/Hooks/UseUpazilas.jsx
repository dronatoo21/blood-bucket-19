import { useEffect, useState } from "react";

const UseUpazilas = () => {
    const [upazilas, setUpazilas] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('https://blood-bucket-server-phi.vercel.app/upazilas')
        .then(res => res.json())
        .then(data => setUpazilas(data))
        setLoading(false)
    },[])
    return [upazilas, loading]
};

export default UseUpazilas;