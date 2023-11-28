import { useEffect, useState } from "react";

const UseUpazilas = () => {
    const [upazilas, setUpazilas] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        fetch('http://localhost:4000/upazilas')
        .then(res => res.json())
        .then(data => setUpazilas(data))
        setLoading(false)
    },[])
    return [upazilas, loading]
};

export default UseUpazilas;