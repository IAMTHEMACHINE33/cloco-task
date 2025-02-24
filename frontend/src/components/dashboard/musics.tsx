
import { Plus } from "lucide-react";
import { Layout } from "../layout/layout";
import { useState } from "react";
import { Genre, IMusicInput } from "../../../services/index.ts";
import { useSaveMusic } from "@/hooks/requests/useMusic.ts";
import MusicTable from "../table/music-table.tsx";
import MusicForm from "../artist/musics-form.tsx";
import { useParams } from "react-router-dom";
import { useAuthRole } from "@/hooks/requests/useAuthDetails.ts";
import { ROLES } from "@/constant/roles.ts";


export default function Musics() {
    const {artistId} = useParams();

    const authRole = useAuthRole()
    const [refresh, setRefresh] = useState(false)
    const [isPopoverVisible, setPopoverVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<IMusicInput>({
        title : "",
        album_name : "",
        genre : Genre.RNB,
        artist_id: artistId!
    });

    const handleCancelAction = () => {
        setPopoverVisible(false);
    };
    const handleOpenAction = () => {
        setPopoverVisible(true)
    }

    const handleFormChange = (name: string, value: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const { apiHit: saveMusic } = useSaveMusic()
    const handleSave = async() => {
        await saveMusic({...formData})
        setPopoverVisible(false)
        setRefresh(prev => !prev)

    }
  return (
    <Layout>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Musics</h1>
            {authRole === ROLES.ARTIST && 
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => handleOpenAction()}
            >
              <Plus className="h-5 w-5" />
              Add Music
            </button>}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-lg shadow">
            <MusicTable key={refresh}/>
          </div>
        </main>

        <MusicForm
        isVisible={isPopoverVisible}
        actionType={"save"}
        fetchData={formData}
        onConfirm={handleSave}
        onCancel={handleCancelAction}
        onChange={handleFormChange}
        />
      </div>
    </Layout>
  );
}
