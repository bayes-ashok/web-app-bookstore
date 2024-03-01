import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import { Trash2 } from 'react-feather';
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start; 
  height: calc(100vh - 20px); 
  margin-top: 20px; 
`;

const FormContainer = styled.div`
  width: 600px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc; 
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const FormGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top:10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  &:hover {
    background-color: #45a049;
  }
`;

interface UserDetails {
    id: number;
    email: string;
    name: string;
}

const Account: React.FC = () => {
    const [userDetails, setUserDetails] = useState<UserDetails>();
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuthentication = async () => {
            if (!localStorage.getItem('accessToken')) {
                navigate('/login', { replace: true });
                toast.error('Please log in.');
            } else {
                await fetchUserDetails();
            }
        };

        checkAuthentication();
    }, [navigate]);

    const fetchUserDetails = async () => {
        try {
            const userId = localStorage.getItem('id');

            if (userId) {
                const response = await axios.get<UserDetails>(`http://localhost:8082/user/getById/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ` + localStorage.getItem('accessToken') // Include the bearer token in the request headers
                        }
                    });
                setUserDetails(response.data);
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };
    


    if (!userDetails) {
        return <div>Loading...</div>;
    }

    return (
        <>
        <Navbar />
        <Container>
            <div>
                
                <FormContainer>
                    <Title>UPDATE YOUR PERSONAL INFORMATION</Title>
                    <form>
                        <FormGroup>
                            <Label htmlFor="userId">User ID</Label>
                            <Input
                                type="text"
                                id="userId"
                                defaultValue={userDetails.id}
                                readOnly
                            />
                            <Label htmlFor="userName">User Name</Label>
                            <Input
                                type="text"
                                id="userName"
                                defaultValue={userDetails.name}
                                
                                readOnly
                            />
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                                type="password"
                                id="currentPassword"
                                placeholder="Enter current password"
                            />
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                                type="password"
                                id="newPassword"
                                placeholder="Enter new password"
                            />
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                type="password"
                                id="confirmPassword"
                                placeholder="Confirm new password"
                            />
                        </FormGroup>
                        <div className="mb-1"></div>
                        <div>
                        <Button>UPDATE</Button>
                        </div>
                    </form>
                    <ToastContainer autoClose={1000} />
                </FormContainer>
               
            </div>
        </Container>
        </>
        
    );
};

export default Account;
