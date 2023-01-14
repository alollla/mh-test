import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';

import './App.css';
import TokenService from "@/services/token.service";
import LoginPage from "@/pages/LoginPage";
import PostsPage from "@/pages/PostsPage";

function App() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <PrivateRoute path="/">
                    <PostsPage />
                </PrivateRoute>
            </Switch>
        </BrowserRouter>
    );
}

function PrivateRoute({ children, ...rest }:any) {
    const isAuth = TokenService.getLocalRefreshToken() && TokenService.getLocalAccessToken();

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
