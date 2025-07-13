import React, { createContext, useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import useForumAPI from "../api/forumApi";

export const MembershipContext = createContext();

export const MembershipProvider = ({ children }) => {

    const { dbUser, setDbUser } = useContext(AuthContext);
    const { checkMembershipExpiry, getUserByEmail } = useForumAPI();



    // Function to check membership expiry
    const checkMembershipStatus = async () => {

        try {
            const user = await checkMembershipExpiry(dbUser._id);
            const updatedUser = await getUserByEmail(dbUser.email);
            setDbUser(updatedUser);

            return user || "bronze";
        } catch (err) {
            console.log(err);

            return "bronze";
        }
    };
    // --- Auto-check on dbUser change ---
    useEffect(() => {
        if (dbUser?._id) {
            checkMembershipStatus();
        }
    }, [dbUser?._id]); // when user loads or changes



    return (
        <MembershipContext.Provider value={{ checkMembershipStatus }}>
            {children}
        </MembershipContext.Provider>
    );
};
