import { useEffect, useState } from "react";

const UseDistricts = () => {
    const [districts, setDistricts] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('http://localhost:4000/districts')
        .then(res => res.json())
        .then(data => setDistricts(data))
        setLoading(false)
    },[])
    return [districts, loading]
};

export default UseDistricts;