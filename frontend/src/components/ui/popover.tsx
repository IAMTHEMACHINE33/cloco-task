// src/components/Popover.jsx
import { useEffect, useState } from "react";

const Popover = ({
  isVisible,
  actionType,
  artistData,
  onConfirm,
  onCancel,
  onChange,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    song: "",
    album: "",
    genre: "",
  });

  useEffect(() => {
    // If artistData is passed and is not null, update formData with it
    if (artistData) {
      setFormData({
        name: artistData.name || "",
        song: artistData.song || "",
        album: artistData.album || "",
        genre: artistData.genre || "",
      });
    }
  }, [artistData]);
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onChange(name, value); // Optional callback for parent to track changes
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-md text-start space-y-5">
        {actionType === "delete" ? (
          <>
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p>
              Are you sure you want to delete this artist {artistData.name}?
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Edit Artist</h2>
            <form>
              <div className="mb-4 space-y-2">
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="name"
                >
                  Artist
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  required
                />
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="song"
                >
                  Song
                </label>
                <input
                  required
                  type="text"
                  id="song"
                  name="song"
                  value={formData.song}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="album"
                >
                  Album
                </label>
                <input
                  required
                  placeholder={formData.album}
                  type="text"
                  id="album"
                  name="album"
                  value={formData.album}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="genre"
                >
                  Genre
                </label>
                <input
                  required
                  type="text"
                  id="genre"
                  name="genre"
                  value={formData.genre}
                  onChange={handleInputChange}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>
            </form>
          </>
        )}
        <div className="flex gap-4 mt-4 justify-end">
          <button
            type="submit"
            onClick={() => onConfirm(formData)}
            className={`px-4 py-2 text-white rounded-md ${
              actionType === "delete"
                ? "bg-red-600 hover:bg-red-800"
                : "bg-blue-600  hover:bg-blue-800"
            }`}
          >
            {actionType === "delete" ? " Delete" : "Save"}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popover;
