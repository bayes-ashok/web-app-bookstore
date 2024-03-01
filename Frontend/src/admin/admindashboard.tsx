import React, { useEffect } from "react";
import  Sidebar  from "./adminNav";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate= useNavigate()
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      // alert('PLEASE LOGIN')
      navigate('/login', { replace: true })
  }},[])
  return (
    <>
      <div className="bg-slate-300 flex">
        <div className="">
          <Sidebar />
        </div>
        <div className="bg-slate-800"></div>
      </div>
    </>
  );
};

export default Dashboard;
