import { useEffect, useState } from "react";

const Popover = ({
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
            <h2 className="text-lg font-semibold">Edit Artist</h2>
            <form>
              <div className="mb-4 space-y-2">
              {
                  Object.keys(fetchData).filter(ele => ele !== 'id').map((ele: any) => {
                    return (
                        <>
                        <label
                        className="block text-sm font-medium text-gray-700"
                        htmlFor="name"
                        >
                        {ele}
                        </label>
                        <input
                        type="text"
                        id={ele}
                        name={ele}
                        value={formData[ele]}
                        onChange={handleInputChange}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        required
                        />
                        </>
                    )
                  })
              }
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
