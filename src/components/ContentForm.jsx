import React from 'react';

const ContentForm = ({ section }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4">Agregar nuevo {section}</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Descripción</label>
          <textarea
            rows="4"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Imagen (URL)</label>
          <input
            type="url"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Publicar {section}
        </button>
      </form>
    </div>
  );
};

export default ContentForm;
