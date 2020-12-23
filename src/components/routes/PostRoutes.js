import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "../categories/CategoryProvider";
import { PostTagProvider } from "../PostTags/PostTagProvider";
import { TagProvider } from "../tags/TagProvider";
import { PostProvider } from "../posts/PostProvider";
import { PostDetails } from "../posts/PostDetail"
import { PostForm } from "../posts/PostForm";
import { PostList } from "../posts/PostList";
import { ReactionProvider } from "../reactions/ReactionProvider"
import { UserContext } from "../users/UserProvider"

export default () => {
    const { currentUser } = useContext(UserContext)

    return (
        <CategoryProvider>
        <PostTagProvider>
        <TagProvider>
        <PostProvider>
        <ReactionProvider>
        <>
            <Route path="/posts/:postId(\d+)" render={props => (
                <>
                <div className="main-wrap">
                    <div className="top-spacer"></div>
                        <PostDetails {...props} />
                    <div className="bottom-spacer"></div>
                </div>
                </>
            )} />

            <Route exact path="/new_post" render={props => (
                <>
                <div className="main-wrap">
                    <div className="top-spacer"></div>
                    <div className="mid-section">
                        <PostForm {...props} />
                    </div>
                    <div className="bottom-spacer"></div>
                </div>
                </>
            )} />

            <Route exact path="/posts/edit/:postId(\d+)" render={props =>(
                <>
                <div className="main-wrap">
                    <div className="top-spacer"></div>
                    <div className="mid-section">
                        <PostForm {...props} />
                    </div>
                    <div className="bottom-spacer"></div>
                </div>
                </>
            )} />

        <Route exact path="/posts/category/:categoryId(\d+)" render={props => (
            <>
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <div className="left-main">
                        <PostList byCategory {...props} />
                    </div>
                </div>
                <div className="bottom-spacer"></div>
            </div>
            </>
        )} />
        <Route exact path="/posts" render={(props) => (
            <>
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <div className="left-main">
                        <PostList allPosts {...props} />
                    </div>
                </div>
                <div className="bottom-spacer"></div>
            </div>
            </>
        )} />
        <Route exact path="/posts/user/:userId(\d+)" render={(props) => (
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <PostList byUser {...props} />
                </div>
                <div className="bottom-spacer"></div>
            </div>
        )} />
        <Route exact path="/rare" render={(props) => (
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <div className="left-main">
                        <PostList subscribed {...props} />
                    </div>
                </div>
                <div className="bottom-spacer"></div>
            </div>
        )} />

        <Route exact path="/posts/mine" render={(props) => (
            <div className="main-wrap">
                <div className="top-spacer"></div>
                <div className="mid-section">
                    <div className="left-main">
                        <PostList myPosts {...props} />
                    </div>
                </div>
                <div className="bottom-spacer"></div>
            </div>
        )} />
        </>
        </ReactionProvider>
        </PostProvider>
        </TagProvider>
        </PostTagProvider>
        </CategoryProvider>
    )
}