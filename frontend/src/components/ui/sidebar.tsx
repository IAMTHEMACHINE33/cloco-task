import { NavLink } from "react-router-dom";
import { Music2, Users, LogOut } from "lucide-react";

export function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <Music2 className="h-8 w-8" />
          Musica
        </h1>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        <NavLink
          to="/artists"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-gray-700 rounded-lg transition-colors ${
              isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"
            }`
          }
        >
          <Music2 className="h-5 w-5" />
          Artists
        </NavLink>

        <NavLink
          to="/users"
          className={({ isActive }) =>
            `flex items-center gap-2 px-4 py-3 text-gray-700 rounded-lg transition-colors ${
              isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-gray-100"
            }`
          }
        >
          <Users className="h-5 w-5" />
          Users
        </NavLink>
      </nav>

      <div className="p-4 border-t">
        <button
          onClick={() => {
            // Handle logout
            console.log("Logout clicked");
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
