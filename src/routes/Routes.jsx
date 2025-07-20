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
import AdminRoute from "../provider/AdminRoute";

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
import PostDetails from "../components/posts/PostDetails";
import AnnouncementManagement from "../components/announcement/AnnouncementManagement";
import AdminManagePosts from "../components/posts/AdminManagePosts";
import AdminReportedComments from "../components/comment/AdminReportedComments";
import NotificationPage from "../components/notification/NotificationPage";

import Dashboard from "../components/dashboard/Dashboard";
import ForbiddenPage from "../pages/ForbidderPage";
import UserRoute from "../provider/UserRoute";


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
                element: <PrivateRoute> <AdminRoute> <MembersList /> </AdminRoute> </PrivateRoute>
            },
            {
                path: "payments",
                element: <PrivateRoute> <UserRoute><MyPayments /> </UserRoute>  </PrivateRoute>
            },
            {
                path: "all-payments",
                element: <PrivateRoute> <AdminRoute> <AllPayments /> </AdminRoute> </PrivateRoute>
            },
            {
                path: "/manage-tags",
                element: <PrivateRoute> <AdminRoute> <TagManagement /> </AdminRoute>  </PrivateRoute>
            },
            {
                path: "/add-post",
                element: <PrivateRoute> <UserRoute> <AddPost /> </UserRoute> </PrivateRoute>
            },
            {
                path: "/my-posts",
                element: <PrivateRoute> <UserRoute> <MyPosts /> </UserRoute> </PrivateRoute>
            },
            {
                path: "/announcements",
                element: <PrivateRoute> <AdminRoute> <AnnouncementManagement /> </AdminRoute>  </PrivateRoute>
            },
            {
                path: "/manage-posts",
                element: <PrivateRoute> <AdminRoute><AdminManagePosts /> </AdminRoute>  </PrivateRoute>
            },
            {
                path: "/reports",
                element: <PrivateRoute> <AdminRoute><AdminReportedComments /> </AdminRoute>  </PrivateRoute>
            },
            {
                path: "/notifications",
                element: <PrivateRoute> <NotificationPage /> </PrivateRoute>
            },

            {
                path: "/edit-post/",
                children: [

                    {
                        path: ":id",
                        element: <PrivateRoute><UserRoute> <EditPost /> </UserRoute></PrivateRoute>
                    },
                ],
            },
            {
                path: "/posts/comments",
                children: [

                    {
                        path: ":id",
                        element: <PrivateRoute><UserRoute><CommentsPage /> </UserRoute> </PrivateRoute>
                    },
                ],
            },
            {
                path: "/posts",
                children: [

                    {
                        path: ":id",
                        element: <PostDetails />
                    },
                ],
            },



        ],
    },
    {
        path: "/dashboard",
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        children: [
            { index: true, element: <Dashboard /> },
            { path: "my-profile", element: <MyProfile /> },
            { path: "manage-users", element: <AdminRoute><MembersList /> </AdminRoute> },
            { path: "all-payments", element: <AdminRoute><AllPayments /> </AdminRoute> },
            { path: "payments", element: <UserRoute> <MyPayments /></UserRoute> },
            { path: "manage-tags", element: <AdminRoute> <TagManagement /></AdminRoute> },
            { path: "membership", element: <MembershipPage /> },
            { path: "add-post", element: <UserRoute><AddPost /> </UserRoute> },
            { path: "my-posts", element: <UserRoute> <MyPosts /> </UserRoute> },
            { path: "announcements", element: <AdminRoute><AnnouncementManagement /> </AdminRoute> },
            { path: "manage-posts", element: <AdminRoute> <AdminManagePosts /></AdminRoute> },
            { path: "reports", element: <AdminRoute><AdminReportedComments /> </AdminRoute> },
            { path: "notifications", element: <NotificationPage /> },
            {
                path: "edit-post",
                children: [

                    {
                        path: ":id",
                        element: <UserRoute><EditPost /> </UserRoute>
                    },
                ],
            },
            {
                path: "posts/comments",
                children: [

                    {
                        path: ":id",
                        element: <UserRoute> <CommentsPage /> </UserRoute>
                    },
                ],
            },
            {
                path: "posts",
                children: [

                    {
                        path: ":id",
                        element: <PostDetails />
                    },
                ],
            },
        ]
    },
    {
        path: "/no-access",
        Component: ForbiddenPage
    },
    {
        path: "/*",
        Component: NotFoundPage
    }
]);