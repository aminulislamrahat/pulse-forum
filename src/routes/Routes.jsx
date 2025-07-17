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
import MembersList from "../components/users/MembersList";
import MyPayments from "../components/payment/MyPayments";
import AllPayments from "../components/payment/AllPayments";
import TagManagement from "../components/tag/TagManagement";
import AddPost from "../components/posts/AddPost";
import MyPosts from "../components/posts/MyPosts";
import EditPost from "../components/posts/EditPost";
import CommentsPage from "../components/comment/CommentsPage";

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
            //new project
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
            {
                path: "manage-users",
                element: <PrivateRoute> <MembersList /> </PrivateRoute>
            },
            {
                path: "payments",
                element: <PrivateRoute> <MyPayments /> </PrivateRoute>
            },
            {
                path: "all-payments",
                element: <PrivateRoute> <AllPayments /> </PrivateRoute>
            },
            {
                path: "/manage-tags",
                element: <PrivateRoute> <TagManagement /> </PrivateRoute>
            },
            {
                path: "/add-post",
                element: <PrivateRoute> <AddPost /> </PrivateRoute>
            },
            {
                path: "/my-posts",
                element: <PrivateRoute> <MyPosts /> </PrivateRoute>
            },

            {
                path: "/edit-post/",
                children: [

                    {
                        path: ":id",
                        element: <PrivateRoute><EditPost /></PrivateRoute>
                    },
                ],
            },
            {
                path: "/posts/comments",
                children: [

                    {
                        path: ":id",
                        element: <PrivateRoute><CommentsPage /></PrivateRoute>
                    },
                ],
            },



        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            { index: true, element: <MembershipPage /> },
            { path: "my-profile", element: <MyProfile /> },
            { path: "manage-users", element: <MembersList /> },
            { path: "all-payments", element: <AllPayments /> },
            { path: "payments", element: <MyPayments /> },
            { path: "manage-tags", element: <TagManagement /> },
            { path: "membership", element: <MembershipPage /> },
            { path: "add-post", element: <AddPost /> },
            { path: "my-posts", element: <MyPosts /> },
            {
                path: "edit-post",
                children: [

                    {
                        path: ":id",
                        element: <EditPost />
                    },
                ],
            },
            {
                path: "posts/comments",
                children: [

                    {
                        path: ":id",
                        element: <CommentsPage />
                    },
                ],
            },
        ]
    },
    {
        path: "/*",
        Component: NotFoundPage
    }
]);