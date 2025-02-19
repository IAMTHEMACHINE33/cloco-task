import { Plus } from "lucide-react";
import { Layout } from "../layout/layout";
import ArtistsTable from "../table/artists-table";

export default function Artists() {
  return (
    <Layout>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Artists</h1>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus className="h-5 w-5" />
              Add Artist
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-4">
          <div className="bg-white rounded-lg shadow">
            <ArtistsTable />
          </div>
        </main>
      </div>
    </Layout>
  );
}
