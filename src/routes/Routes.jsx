import { createBrowserRouter } from "react-router";

import { Root } from "../layouts/Root";
import { Home } from "../pages/Home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import NotFoundPage from "../pages/NotFoundPage";
import MyProfile from "../components/profile/MyProfile";
import TermsAndConditions from "../components/footer/TermsAndConditions";
import PrivacyPolicy from "../components/footer/PrivacyPolicy";
import PrivateRoute from "../provider/PrivateRoute";
import ForgotPassword from "../components/ForgotPassword";
import PublicRoute from "../provider/PublicRoute";
import ProjectCreate from "../components/projects/ProjectCreate";
import MyCreatedEvents from "../components/myTask/MyCreatedEvents";
import ProjectEdit from "../components/projects/ProjectEdit";
import ProjectDetails from "../components/projects/ProjectDetails";
import BrowseTaskList from "../components/browseTask/BrowseTaskList";
import UpcomingEventList from "../components/browseTask/UpcomingEventList";
import MyJoinedEventList from "../components/myTask/MyJoinedEventList";
import MembershipPage from "../pages/MembershipPage";
import DashboardLayout from "../layouts/DashboardLayout ";

export const Routes = createBrowserRouter([
    {
        path: "/",
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: "login",
                element: <PublicRoute><Login /></PublicRoute>

            },
            {
                path: "register",
                element: <PublicRoute><Register /></PublicRoute>

            },
            {
                path: "my-profile",
                element: <PrivateRoute><MyProfile /></PrivateRoute>

            },
            {
                path: "add-event",
                element: <PrivateRoute><ProjectCreate /></PrivateRoute>

            },
            {
                path: "manage-events",
                element: <PrivateRoute><MyCreatedEvents /></PrivateRoute>

            },
            {
                path: "joined-events",
                element: <PrivateRoute><MyJoinedEventList /></PrivateRoute>

            },
            {
                path: "/event-details/",
                children: [

                    {
                        path: ":id",
                        element: <PrivateRoute><ProjectDetails /></PrivateRoute>
                    },
                ],
            },
            {
                path: "edit-event",
                element: <PrivateRoute><ProjectEdit /></PrivateRoute>
            },
            {
                path: "all-events",
                Component: UpcomingEventList
            },
            {
                path: "terms-and-conditions",
                Component: TermsAndConditions
            },
            {
                path: "privacy-policy",
                Component: PrivacyPolicy
            },
            {
                path: "forgot-password",
                Component: ForgotPassword
            },
            {
                path: "membership",
                element: <PrivateRoute> <MembershipPage /> </PrivateRoute>
            },



        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            { index: true, element: <MembershipPage /> },
            // { path: "tasks", element: <BrowseTaskList /> },
            // { path: "add-task", element: <ProjectCreate /> },
            // { path: "my-posted-task", element: <MyTaskList /> },
            // { path: "profile", element: <MyProfile /> }
        ]
    },
    {
        path: "/*",
        Component: NotFoundPage
    }
]);