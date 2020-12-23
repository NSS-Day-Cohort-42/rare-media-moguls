import React from 'react'
import "./Rare.css";
import TagRoutes from "./routes/TagRoutes";
import NavRoutes from "./routes/NavRoutes";
import CategoryRoutes from "./routes/CategoryRoutes";
import PostRoutes from "./routes/PostRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import UserProfileRoutes from "./routes/UserProfileRoutes";

export const ApplicationViews = (props) => {

    return (
        <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>
                <NavRoutes />
                <TagRoutes />
                <CategoryRoutes />
                <PostRoutes />
                <CommentRoutes />
                <UserProfileRoutes />
            </main>
        </>
    )
};