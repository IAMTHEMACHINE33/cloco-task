import { ArrowLeft, Eye, Pencil, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import Popover from "../ui/popover";
import { useDeleteArtist, useEditArtist, useGetArtists } from "@/hooks/requests/useArtist";
import { IMusic } from "../../../services/index.ts";
import { useDeleteMusic, useEditMusic, useGetArtistMusic } from "@/hooks/requests/useMusic.ts";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthRole } from "@/hooks/requests/useAuthDetails.ts";
import { ROLES } from "@/constant/roles.ts";

const column = [
    {display_name: "Title", system_name: "title"}, 
    {display_name: "Album Name", system_name:"album_name"},
    {display_name: "Genre", system_name: "genre"},
    {display_name: "Actions", actions: "ved"}
];


const MusicTable = (key: boolean) => {

    const authRole = useAuthRole()
    const navigate = useNavigate()
    const { artistId } = useParams()

    const [artistsData, setArtistsData] = useState<IMusic[]>([]);
    const [isPopoverVisible, setPopoverVisible] = useState<boolean>(false);
    const [actionType, setActionType] = useState<"edit" | "delete" | null>(null);
    const [formData, setFormData] = useState<Partial<IMusic>>({});
    const [selectedArtist, setSelectedArtist] = useState<IMusic | null>(null);
    const { apiHit: deleteMusic } = useDeleteMusic();
    const { apiHit: editMusic } = useEditMusic();

    const handleActionClick = (artistId: string, action: "edit" | "delete") => {
        const artist = artistsData.find((a) => a.id === artistId) || null;
        setSelectedArtist(artist);
        setActionType(action);

        const { created_at, updated_at, artist_id, ...filteredArtist} = artist ?? {}
        setFormData(filteredArtist ?? {}); 
        setPopoverVisible(true);
    };

    const handleConfirmAction = (formData: Partial<IMusic>) => {
        if (actionType === "delete") {
            console.log("Deleting artist with ID:", selectedArtist?.id);
            if(selectedArtist?.id)
                handleDelete(selectedArtist.id)
        } else if (actionType === "edit") {
            console.log("Editing artist with data:", formData);
            if (formData)
                handleEdit(formData)
        }
        setPopoverVisible(false); 
    };

    const handleDelete = async(artistId: string) => {
        await deleteMusic(artistId)
        fetchData()
    }
    const handleEdit = async(artist: Partial<IMusic>) => {
        const {id, ...artist_data}  = artist
        await editMusic(id!, artist_data)
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


    const { apiHit: getMusicData } = useGetArtistMusic()

    const fetchData = async () => {
        try {
            const artistData = await getMusicData(artistId!);
            console.log('artistData',artistData)
            setArtistsData(artistData.data!) 
        } catch (error) {
            console.error('Error fetching artist data:', error);
        }
    };
    console.log(key)
    useEffect(() => {
        fetchData()

    }, [])


    return (
        <>
        {authRole !== ROLES.ARTIST
        && 
        <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
        >
        <ArrowLeft className="h-5 w-5" />
        Back
        </button>}
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
                                        : ele?.actions && authRole === ROLES.ARTIST && (
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

export default MusicTable;
