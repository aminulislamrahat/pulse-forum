import React from "react";

export default function Pagination({ page, setPage, total, limit }) {
    const totalPages = Math.ceil(total / limit);

    if (totalPages <= 1) return null;

    return (
        <div className="join">
            <button
                className="join-item btn btn-outline btn-sm"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
            >
                Prev
            </button>
            {[...Array(totalPages).keys()].map((n) => (
                <button
                    key={n + 1}
                    className={`join-item btn btn-sm ${page === n + 1 ? "btn-primary" : "btn-outline"}`}
                    onClick={() => setPage(n + 1)}
                >
                    {n + 1}
                </button>
            ))}
            <button
                className="join-item btn btn-outline btn-sm"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}
