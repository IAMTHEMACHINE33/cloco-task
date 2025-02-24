import { NavLink, useNavigate } from "react-router-dom";
import { Music2, Users, LogOut, Music4 } from "lucide-react";
import { NORMAL_ROUTES } from "@/constant/routes";
import { STORAGE_KEY } from "@/constant/storage_keys";
import { useAuthRole } from "@/hooks/requests/useAuthDetails";
import { Role } from "../../../services/index.ts";

export function Sidebar() {
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem(STORAGE_KEY.ACCESS_TOKEN)
       navigate(NORMAL_ROUTES.LOGIN) 
    }
    const authRole = useAuthRole() as Role;
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <Music2 className="h-8 w-8" />
          Musica
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">

      {[Role.SUPER_ADMIN].includes(authRole) &&<NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-gray-700 rounded-lg transition-colors ${
              isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"
            }`
          }
        >
          <Users className="h-5 w-5" />
          Users
        </NavLink>}
      {[Role.SUPER_ADMIN, Role.ARTIST_MANAGER].includes(authRole) && <NavLink
          to="/artists"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-gray-700 rounded-lg transition-colors ${
              isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"
            }`
          }
        >
          <Music4 className="h-5 w-5" />
          Artists
        </NavLink>}


      {[Role.ARTIST].includes(authRole) && 
        <NavLink
          to="/musics"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-gray-700 rounded-lg transition-colors ${
              isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"
            }`
          }
        >
          <Music2 className="h-5 w-5" />
         Musics 
        </NavLink>}
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={() => {
            // Handle logout
            console.log("Logout clicked");
            handleLogout()
          }}
          className="flex items-center gap-2 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 w-full transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
