import React, { useEffect } from 'react';
import AdminNav from "./adminNav";
import axios from 'axios';
import { useForm } from "react-hook-form";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 20px); /* Adjust the height to include the space */
  margin-top: 20px; /* Add margin-top to create space */
`;



const FormContainer = styled.div`
  width: 600px; /* Increased width */
  padding: 20px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #ccc; /* Add border style */
`;

const Title = styled.h2`
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px 0;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #4CAF50;
  color: white;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #45a049;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 16px;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 10px;
`;

const Addbook = () => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login', { replace: true })
        }
    }, [])

    const apiCall = useMutation({
        mutationKey: ["POST_ITEM"],
        mutationFn: async (formData) => {
            try {
                const response = await axios.post('http://localhost:8082/item/save', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                });
                return response.data;
            } catch (error) {
                throw new Error(error.message);
            }
        },
        onError: (error) => {
            toast.error(`Error: ${error.message}`);
        },
    })

    const { register, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        const formData = new FormData();
        formData.append('itemName', data.itemName);
        formData.append('itemDescription', data.author); // Changed to author
        formData.append('itemQuantity', data.itemQuantity);
        formData.append('itemPerPrice', data.itemPerPrice);
        formData.append('itemImage', data.itemImage[0]);
        formData.append('itemCategory', data.categoryName);

        if (Object.values(data).some((value) => !value)) {
            toast.error('Please fill all the fields!');
        } else if (!data.categoryName) {
            toast.error('Please select a category!');
        } else {
            apiCall.mutate(formData);
            toast.success('Product added successfully!');
        }
    };

    return (
        <>
        <AdminNav />
        <Container>
            <div>
                <FormContainer>
                    <Title>ADD BOOK</Title>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="text"
                            placeholder="Title"
                            {...register("itemName")}
                        />
                        <Input
                            type="text" // Changed to input type
                            placeholder="Author" // Changed placeholder to Author
                            {...register("author")} // Changed to author
                        />
                        <Input
                            type="file"
                            accept="image/*"
                            required
                            {...register("itemImage")}
                        />
                        <FlexRow>
                            <Input
                                type="text"
                                placeholder="Quantity"
                                {...register("itemQuantity")}
                            />
                            <Input
                                type="text"
                                placeholder="Per-Price"
                                {...register("itemPerPrice")}
                            />
                        </FlexRow>
                        <Select
                            {...register("categoryName")}
                        >
                            <option value="">Select Category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Poetry">Poetry</option>
                            <option value="Drama">Drama</option>
                            <option value="Novels">Novels</option>
                            <option value="Comics">Comics</option>
                            <option value="Academics">Academics</option>
                        </Select>
                        <SubmitButton type="submit">
                            Upload
                        </SubmitButton>
                    </form>
                    <ToastContainer autoClose={1000} />
                </FormContainer>
            </div>
        </Container>
        </>
    );
};

export default Addbook;
