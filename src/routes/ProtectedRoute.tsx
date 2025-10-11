import type { ReactNode } from "react";
import { useUser } from "@context/useUser";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" replace />;

    return children;
};

export default ProtectedRoute;
