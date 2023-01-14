import React from 'react';
import { Button, Form, Input } from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from 'react-router-dom'

import {loginUserAction} from "@/store/actions/auth";

export default function LoginPage() {
    const dispatch = useDispatch();

    const auth = useSelector((state:any) => state?.auth);

    const onFinish = (values: any) => {
        dispatch(loginUserAction(values));
    };

    return (
        auth?.response ?
            <Redirect to={{
                pathname: '/',
            }}/> :
        <div className="container container_centered">
            <Form
                className="login-form"
                onFinish={onFinish}
            >
                <Form.Item
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input type="email" placeholder="Email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}