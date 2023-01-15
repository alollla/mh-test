import React from 'react';
import {
    Router,
    Switch,
    Route,
    Redirect,
    useLocation,
    useHistory,
} from 'react-router-dom';
import {Menu} from 'antd'

import './App.css';
import TokenService from "@/services/token.service";
import LoginPage from "@/pages/LoginPage";
import PostsPage from "@/pages/PostsPage";
import PostDetailsPage from "@/pages/PostDetailsPage";
import AddPostPage from "@/pages/AddPostPage";
import EditPostPage from "@/pages/EditPostPage";

function App() {
    const location = useLocation();
    const history = useHistory();

    const isAuth = TokenService.getLocalRefreshToken() && TokenService.getLocalAccessToken();
    function getSelectedMenuItems () {
        switch (true) {
            case location.pathname === '/' || location.pathname.includes('post'):
                return ['posts'];
            case location.pathname.includes('author'):
                return ['authors'];
            case location.pathname.includes('tag'):
                return ['tags'];
        }
    }

    function handleNavigate(path:string) {
        history.push(path);
    }

    return (
        <Router history={history}>
            {
                isAuth &&
                <Menu
                    theme="dark"
                    items={[
                        {
                            label: "Posts",
                            key: "posts",
                            onClick: () => handleNavigate('/'),
                        },
                        {
                            label: "Authors",
                            key: "authors",
                            onClick: () => handleNavigate('/authors'),
                        },
                        {
                            label: "Tags",
                            key: "tags",
                            onClick: () => handleNavigate('/tags'),
                        },
                    ]}
                    selectedKeys={getSelectedMenuItems()}
                    mode="horizontal"
                />
            }

            <Switch>
                <Route path="/login" exact>
                    <LoginPage />
                </Route>
                <PrivateRoute path="/" isAuth={isAuth} exact>
                    <PostsPage />
                </PrivateRoute>
                <PrivateRoute path="/posts/create" isAuth={isAuth} exact>
                    <AddPostPage />
                </PrivateRoute>
                <PrivateRoute path="/posts/:id" isAuth={isAuth} exact>
                    <PostDetailsPage />
                </PrivateRoute>
                <PrivateRoute path="/posts/edit/:id" isAuth={isAuth} exact>
                    <EditPostPage />
                </PrivateRoute>
                <PrivateRoute path="/authors" sAuth={isAuth} exact>
                    <div className="container container_centered">
                        Authors
                    </div>
                </PrivateRoute>
                <PrivateRoute path="/tags" sAuth={isAuth} exact>
                    <div className="container container_centered">
                        Tags
                    </div>
                </PrivateRoute>
                <Route path="*">
                    <div className="container container_centered">
                        404
                    </div>
                </Route>
            </Switch>
        </Router>
    );
}

function PrivateRoute({ children, isAuth, ...rest }:any) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

export default App;
