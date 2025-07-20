import React, { createContext, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useForumAPI from "../api/forumApi";
import { useQuery } from "@tanstack/react-query";

export const MembershipContext = createContext();

export const MembershipProvider = ({ children }) => {
    const { dbUser, setDbUser } = useContext(AuthContext);
    const { checkMembershipExpiry, getUserByEmail } = useForumAPI();

    // Use TanStack Query to always get latest user info
    const {
        data: latestUser,
        refetch: refetchUser,
        isFetching: isFetchingUser,
    } = useQuery({
        queryKey: ["user", dbUser?.email],
        queryFn: () => getUserByEmail(dbUser.email),
        enabled: !!dbUser?.email,
    });

    // Function to check membership expiry, and then refetch user info
    const checkMembershipStatus = async () => {
        try {
            // 1. PATCH: Check/auto-downgrade if needed
            await checkMembershipExpiry(dbUser._id);
            // 2. Refetch user info using TanStack
            const { data: updatedUser } = await refetchUser();
            setDbUser(updatedUser);
            return updatedUser?.member || "bronze";
        } catch (err) {
            console.error(err);
            return "bronze";
        }
    };

    // Auto-check on dbUser change
    useEffect(() => {
        if (dbUser?._id) {
            checkMembershipStatus();
        }
        // eslint-disable-next-line
    }, [dbUser?._id]);

    return (
        <MembershipContext.Provider value={{ checkMembershipStatus, latestUser, isFetchingUser }}>
            {children}
        </MembershipContext.Provider>
    );
};
