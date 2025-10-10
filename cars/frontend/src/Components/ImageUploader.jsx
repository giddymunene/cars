import React, { useState } from "react";
import axios from "axios";

const CarUploader = () => {
  const [car, setCar] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!car || !model || !price || !image) {
      alert("Please fill all fields and upload an image!");
      return;
    }

    const formData = new FormData();
    formData.append("car", car);
    formData.append("model", model);
    formData.append("price", price);
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/cars", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Car uploaded successfully!");
      setCar("");
      setModel("");
      setPrice("");
      setImage(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert("❌ Failed to upload car.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Upload Car Details
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <input
          type="text"
          value={car}
          onChange={(e) => setCar(e.target.value)}
          placeholder="Car name"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="text"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          placeholder="Model"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price per day (KES)"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />

        <label className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700 mb-3 inline-block">
          Choose Car Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        {preview && (
          <div className="relative w-40 h-40">
            <img
              src={preview}
              alt="preview"
              className="w-full h-full object-cover rounded"
            />
          </div>
        )}

        <button
          type="submit"
          className="btn btn-success"
        >
          Upload Car
        </button>
      </form>
    </div>
  );
};

export default CarUploader;
