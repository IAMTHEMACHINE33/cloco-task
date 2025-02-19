import "./App.css"; 
import React, { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Users from "./components/dashboard/user";
import Artists from "./components/dashboard/artists";
import { OpenAPI } from '../services/index';

const App = () => {

    useEffect(() => {
        OpenAPI.TOKEN = localStorage.getItem('accessToken') || undefined;
        OpenAPI.BASE = import.meta.env.VITE_API_URL as string;
        console.log('OpenAPI.TOKEN',OpenAPI.BASE)
    }, []);

    return (
        <BrowserRouter>
        <Routes>
        <Route path="/artists" element={<Artists />} />
        <Route path="/users" element={<Users />} />


        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
        </BrowserRouter>
    );
};

export default App;
