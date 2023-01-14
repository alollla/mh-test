import React, {useEffect} from 'react';
import {Typography, List, Image, Row, Col, Tag} from 'antd';
import {useDispatch, useSelector} from "react-redux";

import {getPostsAction} from "@/store/actions/post";
import TokenService from "@/services/token.service";

const {Title, Text} = Typography;

export default function PostsPage() {
    const dispatch = useDispatch();

    const {posts, current, total, pageSize} = useSelector((state: any) => state?.post);

    const isAuth = TokenService.getLocalRefreshToken() && TokenService.getLocalAccessToken();

    useEffect(() => {
        if (isAuth && !posts?.length) {
            dispatch(getPostsAction(1));
        }
    }, [dispatch, isAuth, posts]);

    function handlePaginationChange (page:number) {
        dispatch(getPostsAction(page));
    }

    return (
        <div className="container">
            <List
                dataSource={posts || []}
                renderItem={(item: any) => (
                    <List.Item key={item.id}>
                        <Row gutter={[16, 16]} style={{width: "100%"}}>
                            <Col span={6}>
                                <Image src={item.previewPicture?.url}/>
                            </Col>
                            <Col span={18}>
                                <Title level={5}>{item.title}</Title>
                                <Text>{item.authorName}</Text>
                                <div>
                                    {
                                        item.tagNames.map((tagName:string) => (
                                            <Tag key={tagName}>{tagName}</Tag>
                                        ))
                                    }
                                </div>
                            </Col>
                        </Row>
                    </List.Item>
                )}
                pagination={{
                    position: "top",
                    current,
                    pageSize,
                    total,
                    onChange: handlePaginationChange
                }}
            />
        </div>
    )
}