import Artists from "@/components/dashboard/artists"
import Users from "@/components/dashboard/user"
import Login from "@/components/login/login"
import Register from "@/components/register/register"
import { NORMAL_ROUTES } from "@/constant/routes"
import { Navigate, useRoutes } from "react-router-dom"
import { PrivateRoutes } from "./privateRoutes"
import { ROLES } from "@/constant/roles"
import NotFound from "@/components/dashboard/404"
import Musics from "@/components/dashboard/musics"

export const AppRoutes = () => {
    const normal_paths = [
        {
            path:NORMAL_ROUTES.HOME,
            element:(<Navigate to={NORMAL_ROUTES.LOGIN} />)
        },
        {
            path:NORMAL_ROUTES.LOGIN,
            element:(<Login />)
        },
        {
            path:NORMAL_ROUTES.REGISTER,
            element:(<Register />)
        },
    ]
    const protected_paths = [
        {
            path:NORMAL_ROUTES.ARTIST,
            element:(

                <PrivateRoutes allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER]}>
                <Artists />
                </PrivateRoutes>
            )
        },
        {
            path:NORMAL_ROUTES.ALL_MUSIC,
            element:(

                <PrivateRoutes allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST]}>
                <Musics/>
                </PrivateRoutes>
            )
        },
        {
            path:NORMAL_ROUTES.MUSIC,
            element:(

                <PrivateRoutes allowedRoles={[ROLES.SUPER_ADMIN, ROLES.ARTIST_MANAGER, ROLES.ARTIST]}>
                <Musics/>
                </PrivateRoutes>
            )
        },
        {
            path:NORMAL_ROUTES.USER,
            element:(
                <PrivateRoutes allowedRoles={[ROLES.SUPER_ADMIN]}>
                <Users />
                </PrivateRoutes>
            )
        },
    ]
    const common_paths = [
        {
            path: NORMAL_ROUTES.NOT_FOUND,
            element:(<NotFound/>)
        },
        {
            path: NORMAL_ROUTES.CATCH_ALL,
            element:(<NotFound/>)
        }
    ]
    const allPaths = [...protected_paths, ...normal_paths, ...common_paths]

    return <>{useRoutes(allPaths)}</>
}
