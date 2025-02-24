import { Plus } from "lucide-react";
import { Layout } from "../layout/layout";
import ArtistsTable from "../table/artists-table";
import { useState } from "react";
import { Gender,  IArtistInput } from "../../../services/index.ts";
import ArtistsForm from "../artist/artists-form";
import { useSaveArtist } from "@/hooks/requests/useArtist";
import { useAuthRole } from "@/hooks/requests/useAuthDetails.ts";
import { ROLES } from "@/constant/roles.ts";


export default function Artists() {

    const [refresh, setRefresh] = useState(false)
    const [isPopoverVisible, setPopoverVisible] = useState<boolean>(false);
    const [formData, setFormData] = useState<IArtistInput>({
        dob : "",
        first_release_year : 2010,
        name : "",
        no_of_albums_released : 0,
        gender : Gender.M
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

    const { apiHit: saveArtist } = useSaveArtist()
    const handleSave = async() => {
        await saveArtist({...formData, dob: new Date(formData.dob).toISOString()})
        setPopoverVisible(false)
        setRefresh(prev => !prev)

    }
    const authRole = useAuthRole()
  return (
    <Layout>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Artists</h1>
            {authRole === ROLES.SUPER_ADMIN && <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            onClick={() => handleOpenAction()}
            >
              <Plus className="h-5 w-5" />
              Add Artist
            </button>}
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-lg shadow">
            <ArtistsTable key={refresh}/>
          </div>
        </main>

        <ArtistsForm
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
