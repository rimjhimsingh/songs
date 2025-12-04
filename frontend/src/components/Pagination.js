import React from 'react';

function Pagination({ page, total, onNext, onPrev }) {
    // If total is 0 or 1, we treat it as 1 page effectively for display if needed, 
    // but typically we paginate based on batch size 10.
    const totalPages = Math.ceil(total / 10) || 1;

    return (
        <div className="flex items-center justify-between sm:justify-center gap-4 mt-2">
            <button
                onClick={onPrev}
                disabled={page === 1}
                className="px-4 py-2 bg-vivpro-bg border border-vivpro-light text-vivpro-navy rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-vivpro-light transition-colors text-sm font-medium shadow-sm"
            >
                Previous
            </button>

            <span className="text-sm font-semibold text-vivpro-navy">
                Page <span className="text-vivpro-teal">{page}</span> of {totalPages}
            </span>

            <button
                onClick={onNext}
                disabled={page >= totalPages}
                className="px-4 py-2 bg-vivpro-bg border border-vivpro-light text-vivpro-navy rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-vivpro-light transition-colors text-sm font-medium shadow-sm"
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;