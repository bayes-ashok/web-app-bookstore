import { useEffect, useState } from 'react';
import AdminNav from "./adminNav";
import "../assets/css/admincss/createpaint.css"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit } from 'react-feather';
import styled from 'styled-components'; // Import styled-components

interface Order {
    id: number;
    user: {
        id: number;
    };
    cart: {
        item: {
            id: number;
            itemName: string;
        };
    };
    address: string;
    phone_no: string;
}

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;

    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-size: 14px; /* Adjust the font size here */
    }

    th {
        background-color: #f2f2f2;
        color: #333;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    .action-buttons {
        display: flex;
        align-items: center;
    }

    .action-buttons button {
        margin-right: 8px; /* Adjust the space between buttons here */
        padding: 4px 8px; /* Adjust padding here */
        font-size: 12px; /* Adjust the font size here */
        background-color: #ff0000; /* Adjust background color for delete button */
        color: #fff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    .action-buttons button.edit {
        background-color: #007bff; /* Adjust background color for edit button */
    }
`;

function Allorder() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login', { replace: true })
        }
    }, [])
    const [items, setItems] = useState<Order[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8082/order/getAll');
            setItems(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8082/order/deleteById/${id}`);
            setItems(items.filter(item => item.id !== id));
            toast.success('ORDER deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete ORDER');
        }
    };

    const handleEdit = (id: number) => {
        // Handle edit action
    };

    return (
        <>
        <div className="">
                <AdminNav />
            </div>
        <div className=" flex mt-10">
            <div className=" text-3xl ml-8 w-full">
                <div className='itemstbl w-full px-10'>
                    <Table>
                        <thead>
                            <tr>
                                <th>CartID</th>
                                <th>UserID</th>
                                <th>ItemID</th>
                                <th>ItemName</th>
                                <th>Address</th>
                                <th>PhoneNO</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.id}</td>
                                    <td>{order.user.id}</td>
                                    <td>{order.cart.item.id}</td>
                                    <td>{order.cart.item.itemName}</td>
                                    <td>{order.address}</td>
                                    <td>{order.phone_no}</td>
                                    <td className="action-buttons">
                                        <button className='rounded-2xl edit' onClick={() => handleEdit(order.id)}><Edit size={14} /></button>
                                        <button className='rounded-2xl delete' onClick={() => handleDelete(order.id)}><Trash2 size={14} /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>

                <ToastContainer autoClose={1000} />
            </div>
        </div>
        </>
    );
};

export default Allorder;
