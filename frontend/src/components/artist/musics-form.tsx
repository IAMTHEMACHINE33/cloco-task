import { useEffect, useState } from "react";
import { Gender, Genre } from "../../../services/index.ts";

const MusicForm = ({
  isVisible,
  actionType,
  fetchData,
  onConfirm,
  onCancel,
  onChange,
}) => {
  const [formData, setFormData] = useState<any>({
  });

  useEffect(() => {
    if (fetchData) {
      setFormData({
          ...fetchData
      });
    }
  }, [fetchData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    onChange(name, value);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-md text-start space-y-5">
        {actionType === "delete" ? (
          <>
            <h2 className="text-lg font-semibold">Confirm Delete</h2>
            <p>
              Are you sure you want to delete this artist {fetchData.name}?
            </p>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Create Music</h2>
            <form>
              <div className="mb-4 space-y-2">
              <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
              >
             Title 
              </label>
              <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              />

              <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
              >
             Album Name 
              </label>
              <input
              type="text"
              id="album_name"
              name="album_name"
              value={formData.album_name}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              />

              <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
              >
              Genre 
              </label>
              <select
              id="genre"
              name="genre"
              value={formData.genre}
              onChange={handleInputChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              required
              >
              <option value={Genre.RNB}>RNB</option>
              <option value={Genre.JAZZ}>Jazz</option>
              <option value={Genre.ROCK}>Rock</option>
              <option value={Genre.CLASSIC}>Classic</option>
              <option value={Genre.COUNTRY}>Country</option>
              </select>

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

export default MusicForm;
