import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaUser, FaUserNurse } from "react-icons/fa";

const Allusers = () => {
    const axiosSecure = UseAxiosSecure()
    const [searhedUsers, setSearchedUsers] = useState()
    const {data: users = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            setSearchedUsers(res.data)
            return res.data;   
        }
    })
    const filterUsers = status => {
      const filteredUsers = users?.filter((user) =>
      user.status.toLowerCase().includes(status)
          )
          setSearchedUsers(filteredUsers)
      };
    const handleBlock = user => {
        axiosSecure.patch(`/users/${user._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Blocked`,
                    showConfirmButton: false,
                    timer: 1500 
                })
            }
        })
    }

    const handleUnblock = user => {
        axiosSecure.patch(`/allUsers/${user._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is Admin now`,
                    showConfirmButton: false,
                    timer: 1500 
                })
            }
        })
    }
    const handleMakeAdmin = user => {
        axiosSecure.patch(`/makeAdmin/${user._id}`)
        .then(res => {
            if(res.data.modifiedCount > 0){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Unblocked`,
                    showConfirmButton: false,
                    timer: 1500 
                })
            }
        })
    }

    return (
        <div className="mx-5">
            <h1 className="font-bold text-3xl text-center my-10 mb-2">All Users</h1>
            <button onClick={()=>filterUsers("active")} className="btn bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Active Users</button>
            <button onClick={()=>filterUsers("blocked")} className="btn ml-3 bg-gradient-to-r from-[#0a3d62] to bg-[#b33939] text-white">Blocked Users</button>
            <div className="overflow-x-auto">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>
                      #
                    </th>
                    <th>Name</th>
                    <th>E-mail</th>
                    <th>Status</th>
                    <th>Make Admin</th>
                    <th>Make volunteer</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {
                    searhedUsers?.map((user, index) => <tr key={user?._id}>
                        <th>
                            {index + 1}
                        </th>
                        <td>
                          <div className="flex items-center gap-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={user?.avater} alt="Avatar Tailwind CSS Component" />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold">{user?.name}</div>
                            </div>
                          </div>
                        </td>
                        <td>{user?.email}</td>
                        <td>{user?.status}</td>
                        <td><button onClick={()=>handleMakeAdmin(user)} className="btn" ><FaUser/></button></td>
                        <td><button className="btn" ><FaUserNurse/></button></td>
                        <th>
                          {
                            user.status === 'active' && <button onClick={() => handleBlock(user)} className="btn btn-outline text-red-700">Block</button>
                          }
                          {
                            user.status === 'blocked' && <button  onClick={() => handleUnblock(user)} className="btn btn-outline text-red-700">Unblock</button>
                          }
                        </th>
                      </tr>)
                  }
                </tbody>                
              </table>
            </div>
            </div>
        </div>
    );
};

export default Allusers;