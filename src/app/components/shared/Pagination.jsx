
export default function Pagination({
  currentPage,
  setCurrentPage = null, 
  onPageChange = null, 
  nextPage = null,
  previousPage = null,
  totalPages,
  totalItems = null, 
  itemsPerPage = null, 
}) {
  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page) => {
    if (onPageChange) {
      onPageChange(page);
    } else if (setCurrentPage) {
      setCurrentPage(page);
    }
  };

  const handlePrevious = () => {
    if (previousPage) {
      previousPage();
    } else if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (nextPage) {
      nextPage();
    } else if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Calculate showing range if totalItems and itemsPerPage are provided
  const showingInfo =
    totalItems && itemsPerPage
      ? {
          from: (currentPage - 1) * itemsPerPage + 1,
          to: Math.min(currentPage * itemsPerPage, totalItems),
          total: totalItems,
        }
      : null;

  return (
    <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
      {showingInfo && (
        <div className="text-sm text-gray-700">
          Showing <span className="font-medium">{showingInfo.from}</span> to{" "}
          <span className="font-medium">{showingInfo.to}</span> of{" "}
          <span className="font-medium">{showingInfo.total}</span> items
        </div>
      )}

      <div className="flex space-x-2">
        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`px-3 py-1 rounded-md ${
              currentPage === page
                ? "bg-teal-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-50"
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
