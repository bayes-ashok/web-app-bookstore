import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/navbar";
import axios from "axios";
import { Trash2, ShoppingBag } from "react-feather";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding: 0 2rem; /* Add padding */
`;

const TableWrapper = styled.div`
    width: 100%;
    margin-bottom: 2rem;
`;

const OrderBox = styled.div`
    width: 100%;
    margin-bottom: 20px
    padding-left: 2rem;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;

    th, td {
        padding: 8px;
        text-align: left;
        border: 1px solid #ddd; /* Add border */
    }

    th {
        background-color: #f2f2f2;
        color: #333;
    }
`;

const Button = styled.button`
    margin-top: 1rem;
    background-color: #5ce467;
    border: none;
    border-radius: 1rem;
    padding: 0.75rem 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 2rem;
    border-radius: 0.5rem;
    width: 300px;
`;

const CloseButton = styled.span`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
`;

const Ordercart: React.FC = () => {
    const [items, setItems] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login', { replace: true })
            toast.error('Please LOGIN ');

        }
    }, [])

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const userId = localStorage.getItem('id');
            if (userId) {
                const response = await axios.get(`http://localhost:8082/cart/getByUserId/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem('accessToken')
                        }
                    });
                setItems(response.data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const calculateTotalAmount = (items: any[]) => {
        let totalAmount = 0;
        items.forEach(item => {
            totalAmount += item.itemQuantity * item.item.itemPerPrice;
        });
        return totalAmount;
    };

    const handleDelete = async (id: any) => {
        try {
            await axios.delete(`http://localhost:8082/cart/deleteById/${id}`);
            setItems(items.filter(item => item.id !== id));
            toast.success('Item deleted successfully');
        } catch (error) {
            console.error('Error deleting item:', error);
            toast.error('Failed to delete item');
        }
    };

    const handlePlaceOrder = async () => {
        try {
            const userId = localStorage.getItem('id');
            if (userId) {
                for (const item of items) {
                    const orderData = {
                        userId: userId,
                        address: address,
                        phone_no: phone,
                        cartId: item.id,
                    };

                    const response = await axios.post(`http://localhost:8082/order/save`, orderData, {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem('accessToken')
                        }
                    });
                    console.log('Order placed successfully:', response.data);
                    toast.success("Your Order has been Placed Successfully");
                }
                setShowModal(false);
            }
        } catch (error) {
            console.error('Error placing order:', error);
            toast.error("failed to place order")
        }
    };


    return (
        <>
            <div className="bg-gray-100">
            <Navbar />
            </div>
            <Container>
                <TableWrapper>
                    <h1 className="text-3xl font-bold mt-7 mb-4 text-center bg-white pt-6 pb-4">Book Catalog</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>ItemName</th>
                                <th>Author</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: any) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.item.itemName}</td>
                                    <td>{item.item.itemDescription}</td>
                                    <td>{item.itemQuantity}</td>
                                    <td>{item.item.itemPerPrice}</td>
                                    <td>
                                        <button onClick={() => handleDelete(item.id)}><Trash2 /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </TableWrapper>
                <OrderBox>
                    <h1 className="text-3xl font-bold text-center mb-5 bg-white pt-6 pb-4">ORDER NOW</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>PER-Price</th>
                                <th>Total-Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item: any) => (
                                <tr key={item.id}>
                                    <td>{item.item.itemName}</td>
                                    <td>{item.itemQuantity}</td>
                                    <td>{item.item.itemPerPrice}</td>
                                    <td>{item.itemQuantity * item.item.itemPerPrice}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan={3} className="text-right font-medium">Total Amount:</td>
                                <td>{calculateTotalAmount(items)}</td>
                            </tr>
                        </tfoot>
                    </Table>
                    <Button onClick={() => setShowModal(true)}>PROCEED TO CHECKOUT<ShoppingBag /></Button>
                </OrderBox>
            </Container>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                transition:Bounce
            />
            {showModal && (
                <ModalOverlay>
                    <ModalContent>
                        <CloseButton onClick={() => setShowModal(false)}>&times;</CloseButton>
                        <h2>ENTER YOUR DETAILS TO PROCEED</h2>
                        <input type="text" placeholder="Delivery Address" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
                        <input type="text" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
                        <button onClick={handlePlaceOrder}>Place Order</button>
                    </ModalContent>
                </ModalOverlay>
            )}
        </>
    );
};

export default Ordercart;
