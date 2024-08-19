import { useQuery } from "@tanstack/react-query";
import { Navigate, Route, Routes } from "react-router-dom";

import { getProfile as queryFn } from "src/services/user";

import AuthPage from "pages/AuthPage";
import HomePage from "pages/HomePage";
import AdminPage from "pages/AdminPage";
import DashboardPage from "pages/DashboardPage";
import NotFoundPage from "pages/404";
    
import Loader from "src/components/modules/Loader";

function Router() {

    const queryKey = ["profile"];
    const { data, isLoading, error } = useQuery({ queryKey, queryFn });

    if (isLoading) return <Loader />;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={data ? <Navigate to="/dashboard" /> : <AuthPage />} />
            <Route path="/admin" element={data && data.data.role === "ADMIN" ? <AdminPage /> : <Navigate to="/" />} />
            <Route path="/dashboard" element={data ? <DashboardPage /> : <Navigate to="/auth" />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>


    );

}

export default Router;
