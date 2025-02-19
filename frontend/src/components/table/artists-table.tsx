import { artists } from "@/constant/artists";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import Popover from "../ui/popover";

const column = ["Artist", "Song", "Album", "Release Date", "Genre", "Actions"];

const ArtistsTable = () => {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [formData, setFormData] = useState({});
  const [selectedArtist, setSelectedArtist] = useState(null);

  const handleActionClick = (artistId, action) => {
    const artist = artists.find((a) => a.id === artistId);

    setSelectedArtist(artist);
    setActionType(action);
    setFormData(artist); // Pre-fill form data if editing
    setPopoverVisible(true);
  };

  const handleConfirmAction = (formData) => {
    if (actionType === "delete") {
      console.log("Deleting artist with ID:", selectedArtist?.id);
      // Add your deletion logic here
    } else if (actionType === "edit") {
      console.log("Editing artist with data:", formData);
      // Add your edit logic here
    }
    setPopoverVisible(false); // Close the popover after confirming the action
  };

  const handleCancelAction = () => {
    setPopoverVisible(false);
  };

  const handleFormChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //   pagination logic

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const entriesPerPage = 10; // Number of items per page

  // Calculate the range of items to display
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentEntries = artists.slice(startIndex, endIndex); // Get the data for the current page

  // Total number of pages
  const totalPages = Math.ceil(artists.length / entriesPerPage);

  // Handle "Prev" and "Next" button clicks
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <table className="w-full  ">
        <thead className="bg-gray-50">
          <tr>
            {column.map((item) => (
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 ">
          {currentEntries.map((artist) => (
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
                <div className="text-sm text-gray-900">
                  {artist.releaseDate}
                </div>
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
            </tr>
          ))}
        </tbody>
      </table>
      <hr className="border-gray-200" />
      <div className="flex flex-col items-center py-5">
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Showing{" "}
          <span className="font-semibold text-gray-900 ">{startIndex + 1}</span>{" "}
          to{" "}
          <span className="font-semibold text-gray-900 ">
            {Math.min(endIndex, artists.length)}
          </span>{" "}
          of{" "}
          <span className="font-semibold text-gray-900 ">{artists.length}</span>{" "}
          Entries
        </span>
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
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900"
          >
            Next
          </button>
        </div>
      </div>

      <Popover
        isVisible={isPopoverVisible}
        actionType={actionType}
        artistData={formData}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        onChange={handleFormChange}
      />
    </>
  );
};

export default ArtistsTable;
