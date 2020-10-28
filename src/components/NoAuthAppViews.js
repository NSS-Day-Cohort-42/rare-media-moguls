import React from "react";
import { Nav } from "./nav/Nav";
import { Route } from "react-router-dom";
import "./Rare.css";
import { PostProvider } from "./posts/PostProvider";
import { CategoryProvider } from "./categories/CategoryProvider";
import { PostList } from "./posts/PostList";
import { CategoryButtonList } from "./categories/CategoryButtonList";

export const NoAuthAppViews = (props) => {

    return (
        <>
            <main className="main-container" style={{ margin: "0 0", lineHeight: "1.75rem", }}>

            <Route path="/" render={(props) => (
                    <nav className="cont--nav">
                        <Nav {...props} />
                    </nav>)} />

                <CategoryProvider>
                    <PostProvider>
                        <>
                            <Route exact path="/" render={(props) => (
                                <>
                                    <div className="main-wrap">
                                        <div className="top-spacer"></div>
                                        <div className="mid-section">
                                            <div className="left-main">
                                                <PostList {...props}></PostList>

                                            </div>
                                            <div className="divider"></div>
                                            <div className="right-main">
                                                <CategoryButtonList
                                                    {...props} />
                                    </div>
                                        </div>
                                        <div className="bottom-spacer"></div>
                                    </div>
                                </>
                            )} />
                        </>
                    </PostProvider>
                </CategoryProvider>

            </main>
        </>
    )};