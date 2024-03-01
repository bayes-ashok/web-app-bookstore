import { useEffect, useState } from 'react';
import AdminNav from "./adminNav";
import "../assets/css/admincss/createpaint.css"
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Trash2, Edit } from 'react-feather';
import styled from 'styled-components'; // Import styled-components

interface Item {
    id: number;
    itemName: string;
    itemImage: string;
    itemDescription: string;
    itemCategory: string;
    itemQuantity: number;
    itemPerPrice: number;
}

const Table = styled.table`
    border-collapse: collapse;
    width: 100%;

    th, td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        font-size: 14px; /* Adjust the font size */
    }

    th {
        background-color: #f2f2f2;
        color: #333;
        text-align: center; /* Align column names to center */
    }

    tbody tr:last-child td {
        border-bottom: none;
    }

    tbody td {
        text-align: center; /* Center all contents in rows */
    }
`;

const ActionButtons = styled.div`
    display: flex;
    align-items: center;
    justify-content: center; /* Center horizontally */
`;

const Button = styled.button`
    margin: 0 4px; /* Adjust space between buttons */
    padding: 4px 8px; /* Adjust padding */
    font-size: 12px; /* Adjust font size */
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
`;

const DeleteButton = styled(Button)`
    background-color: #ff0000; /* Red background color for delete button */
`;

const EditButton = styled(Button)`
    background-color: #007bff; /* Blue background color for edit button */
`;

const StyledImg = styled.img`
    height: 200px; /* Set the height of the image */
    display: block; /* Center the image horizontally */
    margin: 0 auto; /* Center the image horizontally */
`;

function allbook() {
    const navigate = useNavigate()
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login', { replace: true })
        }
    }, [])
    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:8082/item/getAll');
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8082/item/deleteById/${id}`);
            setItems(items.filter(item => item.id !== id));
            toast.success('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item');
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
            <div className="flex mt-10">
                <div></div>
                <div className="text-xl ml-4 w-full">
                    <div className='itemstbl w-full px-10'>
                        <Table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>ItemName</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Categories</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.itemName}</td>
                                        <td><StyledImg src={`data:image/jpeg;base64,${item.itemImage}`} alt="item image" /></td>
                                        <td>{item.itemDescription}</td>
                                        <td>{item.itemCategory}</td>
                                        <td>{item.itemQuantity}</td>
                                        <td>{item.itemPerPrice}</td>
                                        <td>
                                            <ActionButtons>
                                                <EditButton onClick={() => handleEdit(item.id)}><Edit size={14} /></EditButton>
                                                <DeleteButton onClick={() => handleDelete(item.id)}><Trash2 size={14} /></DeleteButton>
                                            </ActionButtons>
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

export default allbook;
