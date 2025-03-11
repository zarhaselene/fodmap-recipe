const Pagination = () => (
  <div className="flex justify-center mb-12">
    <div className="inline-flex rounded-md shadow-sm">
      <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-l-md hover:bg-gray-50">
        Previous
      </button>
      <button className="px-4 py-2 border-t border-b border-gray-300 bg-teal-500 text-white">
        1
      </button>
      <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
        2
      </button>
      <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
        3
      </button>
      <button className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-r-md hover:bg-gray-50">
        Next
      </button>
    </div>
  </div>
);

export default Pagination;
