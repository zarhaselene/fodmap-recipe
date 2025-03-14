const Pagination = ({
  currentPage,
  setCurrentPage,
  nextPage,
  previousPage,
  totalPages,
}) => {
  const pages = [];

  // Create page numbers for the pagination buttons
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center mb-12">
      <div className="inline-flex rounded-md shadow-sm">
        {/* Previous Button */}
        <button
          className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-l-md hover:bg-gray-50"
          onClick={previousPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {/* Page Buttons */}
        {pages.map((page) => (
          <button
            key={page}
            className={`px-4 py-2 border-t border-b border-gray-300 ${
              page === currentPage
                ? "bg-teal-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}

        {/* Next Button */}
        <button
          className="px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-r-md hover:bg-gray-50"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
