
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Popover from "../ui/popover";
import { useDeleteUser, useEditUser, useGetUsers } from "@/hooks/requests/useUser";
import { IUser } from "services";


const column = [
    {display_name: "First name", system_name: "first_name"}, 
    {display_name: "Last name", system_name: "last_name"}, 
    {display_name: "Address", system_name:"address"},
    {display_name: "DOB", system_name: "dob"},
    {display_name: "Email", system_name: "email"},
    {display_name: "Gender", system_name: "gender"},
    {display_name: "Phone", system_name: "phone"},
    {display_name: "Role", system_name: "role"},
    {display_name: "Actions", actions: "ved"}
];

const UsersTable = () => {

const [artistsData, setArtistsData] = useState<IUser[]>([]);
const [isPopoverVisible, setPopoverVisible] = useState<boolean>(false);
const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);
const [formData, setFormData] = useState<Partial<IUser>>({});
const [selectedArtist, setSelectedArtist] = useState<IUser | null>(null);
const { apiHit: deleteUser } = useDeleteUser();
const { apiHit: editUser } = useEditUser();

const handleActionClick = (userId: string, action: "edit" | "delete") => {
    const artist = artistsData.find((a) => a.id === userId) || null;
    setSelectedArtist(artist);
    setActionType(action);

    const { created_at, updated_at, dob, gender, role, ...filteredArtist} = artist ?? {}
    setFormData(filteredArtist ?? {}); 
    setPopoverVisible(true);
};

const handleConfirmAction = (formData: Partial<IUser>) => {
    if (actionType === "delete") {
        if (selectedArtist?.id)
            handleDelete(selectedArtist?.id)
        
    } else if (actionType === "edit") {
        if (formData)
            handleEdit(formData)
    }
    setPopoverVisible(false); 
};

const handleDelete = async(userId: string) => {
    await deleteUser(userId)
    fetchData()
}

const handleEdit = async(user: Partial<IUser>) => {
    const {id, ...user_data} = user  
    await editUser(id!, user_data)
    fetchData()

}

  const handleCancelAction = () => {
    setPopoverVisible(false);
  };

  const handleFormChange = (name: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [currentPage, setCurrentPage] = useState(1); 
  const entriesPerPage = 10; 

  const { apiHit: getUserData } = useGetUsers()

  const fetchData = async () => {
      try {
          const artistData = await getUserData(currentPage, entriesPerPage);
          setArtistsData(artistData.data)
      } catch (error) {
          console.error('Error fetching artist data:', error);
      }
  };
  useEffect(() => {
      fetchData()

  }, [currentPage, entriesPerPage])

  const handlePrev = () => {
      setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
      if (artistsData.length > 0)
          setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <table className="w-full  ">
        <thead className="bg-gray-50">
          <tr>
            {column.map((item) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {item.display_name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {
              artistsData.length === 0 && (artistsData as any).success ? (
                  <p> Loading </p>
              ):
              (artistsData.map((artist: any) => (
            <tr key={artist.id} className="hover:bg-gray-50">
            {
                column.map((ele) => {
                    return (
                    <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                    {
                        ele?.system_name 
                            ? artist[ele.system_name]
                            : ele?.actions && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <div className="flex items-center gap-3">
                                <button
                                onClick={() => handleActionClick(artist.id, "edit")}
                                className="text-yellow-600 hover:text-yellow-900"
                                >
                                <Pencil className="h-5 w-5" />
                                </button>
                                <button
                                onClick={() => handleActionClick(artist.id, "delete")}
                                className="text-red-600 hover:text-red-900"
                                >
                                <Trash2 className="h-5 w-5" />
                                </button>
                                </div>
                                </td>
                            )
                    }
                    </div>
                    </td>
                )})
            }
            </tr>
          )))}
        </tbody>
      </table>
      <hr className="border-gray-200" />
      <div className="flex flex-col items-center py-5">
        <div className="inline-flex mt-2 xs:mt-0 space-x-5">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900  "
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
          >
            Next
          </button>
        </div>
      </div>

      <Popover
        isVisible={isPopoverVisible}
        actionType={actionType}
        fetchData={formData}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        onChange={handleFormChange}
      />
    </>
  );
};
export default UsersTable;
