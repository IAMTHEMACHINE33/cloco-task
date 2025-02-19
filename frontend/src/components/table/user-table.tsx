import { artists } from "@/constant/artists";
import { Eye, Pencil, Trash2 } from "lucide-react";
const column = ["Artist", "Song", "Album", "Release Date", "Genre", "Actions"];

const UsersTable = () => {
  return (
    <table className="w-full">
      <thead className="bg-gray-50">
        <tr>
          {column.map((item) => (
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {artists.map((artist) => (
          <tr key={artist.id} className="hover:bg-gray-50">
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm font-medium text-gray-900">
                {artist.name}
              </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{artist.song}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{artist.album}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <div className="text-sm text-gray-900">{artist.releaseDate}</div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                {artist.genre}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => console.log("View", artist.id)}
                  className="text-blue-600 hover:text-blue-900"
                >
                  <Eye className="h-5 w-5" />
                </button>
                <button
                  onClick={() => console.log("Edit", artist.id)}
                  className="text-yellow-600 hover:text-yellow-900"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => console.log("Delete", artist.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UsersTable;
