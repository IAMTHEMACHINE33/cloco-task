import { useNavigate } from "react-router-dom";
import { useAuthRole } from "@/hooks/requests/useAuthDetails";
import { NORMAL_ROUTES } from "@/constant/routes.ts";
import { useEffect } from "react";

interface TPrivateRoutes {
    children: JSX.Element;
    allowedRoles: string[]
}
export const PrivateRoutes = ({children, allowedRoles}: TPrivateRoutes) => {
    const navigate = useNavigate();
    const userRole = useAuthRole();
    const userHasRequiredRole = allowedRoles.includes(userRole) ? true : false

    useEffect(() => {
    if (!userHasRequiredRole) {
        navigate(NORMAL_ROUTES.NOT_FOUND);
    }
    }, [userHasRequiredRole, navigate])

    return children;

}
