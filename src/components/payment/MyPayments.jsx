import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useForumAPI from "../../api/forumApi";
import LoadingSpinner from "../../components/LoadingSpinner";
import moment from "moment";

const MyPayments = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const limit = 10;

    const { getMyPayments } = useForumAPI();

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ["myPayments", page, search],
        queryFn: () => getMyPayments({ page, limit, search }),
        keepPreviousData: true,
    });



    const payments = data?.payments || [];
    const total = data?.total || 0;
    const totalPages = Math.ceil(total / limit);

    // Pagination UI
    const getPageNumbers = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) pages.push(i);
        } else {
            if (page <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", totalPages);
            } else if (page > totalPages - 4) {
                pages.push(1, "...", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="w-full mx-auto p-6 md:p-12  bg-base-100">
            <h2 className="text-2xl font-bold mb-4">My Payment History</h2>
            <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2">
                <input
                    type="text"
                    placeholder="Search by Payment ID"
                    value={search}
                    onChange={e => { setSearch(e.target.value); setPage(1); }}
                    className="input input-bordered max-w-xs"
                />
                {(isLoading || isFetching) && <LoadingSpinner size="sm" />}
            </div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Payment ID</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map(payment => (
                            <tr key={payment._id}>
                                <td className="text-xs">{payment.paymentId}</td>
                                <td>${payment.amount}</td>
                                <td>
                                    <span className={`badge badge-${payment.status === "succeeded" ? "success" : "error"}`}>
                                        {payment.status}
                                    </span>
                                </td>
                                <td>{moment(payment.createdAt).format("D MMM, YYYY, h:mm a")}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-center mt-6">
                <div className="join">
                    <button
                        className="join-item btn"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >&lt;</button>
                    {getPageNumbers().map((p, idx) =>
                        typeof p === "string" ? (
                            <button key={p + idx} className="join-item btn btn-disabled">{p}</button>
                        ) : (
                            <button
                                key={p}
                                className={`join-item btn${p === page ? " btn-neutral text-white" : ""}`}
                                onClick={() => setPage(p)}
                                disabled={p === page}
                            >{p}</button>
                        )
                    )}
                    <button
                        className="join-item btn"
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >&gt;</button>
                </div>
            </div>
        </div>
    );
};

export default MyPayments;
