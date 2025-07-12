import React, { createContext, useContext, useState } from "react";
import useAxiosPrivate from "../api/useAxiosPrivate";
import { AuthContext } from "./AuthProvider";


export const MembershipContext = createContext();

export const MembershipProvider = ({ children }) => {
    const axiosPrivate = useAxiosPrivate();
    const { user } = useContext(AuthContext);
    const [membership, setMembership] = useState("bronze");
    const [membershipLoading, setMembershipLoading] = useState(false);

    // Function to check membership expiry
    const checkMembershipStatus = async () => {
        if (!user) return "bronze";
        setMembershipLoading(true);
        try {
            // call your backend /users/:id/member-expiry-check
            const res = await axiosPrivate.patch(`/users/${user.uid}/member-expiry-check`);
            setMembership(res.data.member || "bronze");
            setMembershipLoading(false);
            return res.data.member || "bronze";
        } catch (err) {
            console.log(err)
            setMembership("bronze");
            setMembershipLoading(false);
            return "bronze";
        }
    };

    return (
        <MembershipContext.Provider value={{ membership, setMembership, membershipLoading, checkMembershipStatus }}>
            {children}
        </MembershipContext.Provider>
    );
};
