import React, { useEffect, useState } from 'react';
import Sidebar from "./adminNav";
import "../assets/css/admincss/createpaint.css"
import axios from 'axios';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function Users() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            //   alert('PLEASE LOGIN')
            navigate('/login', { replace: true })
        }
    }, [])
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8082/user/getAll');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    return (
        <div className=" flex">
            <div className="">
                <Sidebar />
            </div>
            <div className=" text-3xl ml-8 w-full">
                <h2 className="font-semibold text-center mb-8 mt-8">ALL USERS</h2>

                <div className='usertbl w-full'>
                    <table className="neumorphic w-full">
                        <thead>
                            <tr>
                                <th className='font-medium'>ID</th>
                                <th className='font-medium'>Username</th>
                                <th className='font-medium'>Email</th>
                                <th className='font-medium'>Authority</th>
                                {/* <th className='font-medium'>Change Auth</th> */}

                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user: any) => (
                                <tr key={user.id}>
                                    <td >{user.id}</td>
                                    <td >{user.name}</td>
                                    <td >{user.email}</td>
                                    <td >
                                        <ul>
                                            {user.roles.map((role: any) => (
                                                <li key={role.id}>{role.name}</li>
                                            ))}
                                        </ul>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>


                <ToastContainer autoClose={1000} />
            </div>
        </div >

    );
};

export default Users;