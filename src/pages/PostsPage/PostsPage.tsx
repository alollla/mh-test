import React, {useEffect, useState} from 'react';
import {Typography, List, Image, Row, Col, Tag, Button, Modal} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useLocation} from "react-router-dom";

import {getPostsAction, removePostAction} from "@/store/actions/post";
import TokenService from "@/services/token.service";

const {Title, Text} = Typography;

export default function PostsPage() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);

    const initialPage = searchParams.get('page');

    const {posts, current, total, pageSize} = useSelector((state: any) => state?.post);

    const [selectedId, setSelectedId] = useState<number|undefined>();
    const [page, setPage] = useState<number>(initialPage ? +initialPage : 1);

    const isAuth = TokenService.getLocalRefreshToken() && TokenService.getLocalAccessToken();

    useEffect(() => {
        if (isAuth) {
            dispatch(getPostsAction(page));
        }
    }, [dispatch, isAuth, page]);

    function handlePaginationChange (page:number) {
        setPage(page);
        if(!initialPage || +initialPage !== page) {
            history.push({
                pathname: '/',
                search: `?page=${page}`
            })
        }
    }

    function handleCreate() {
        history.push('/posts/create')
    }

    function handleEdit(id:number) {
        history.push(`/posts/edit/${id}`)
    }

    function handleRemove(id:number) {
        setSelectedId(id);
    }

    function handleOpenDetails(id:number) {
        history.push(`/posts/${id}`)
    }

    function handleHideModal() {
        setSelectedId(undefined);
    }

    function handleConfirmRemove() {
        if(selectedId) {
            dispatch(removePostAction(selectedId));
        }
        setSelectedId(undefined);
    }

    return (
        <div className="container">
            <List
                header={
                    <Button type="primary" onClick={handleCreate}>Add post</Button>
                }
                dataSource={posts || []}
                renderItem={(item: any) => (
                    <List.Item key={item.id}>
                        <Row gutter={[16, 16]} style={{width: "100%"}}>
                            <Col span={6}>
                                <Image src={item.previewPicture?.url}/>
                            </Col>
                            <Col span={15}>
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
                            <Col span={2}>
                                <Button type="link" onClick={() => handleOpenDetails(item.id)}>Details</Button>
                                <Button type="link" onClick={() => handleEdit(item.id)}>Edit</Button>
                                <Button type="link" onClick={() => handleRemove(item.id)}>Remove</Button>
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

            <Modal
                title="Confirm"
                open={Boolean(selectedId)}
                onOk={handleConfirmRemove}
                onCancel={handleHideModal}
                okText="Remove"
                cancelText="Cancel"
            >
                <p>Do you want remove post?</p>
            </Modal>
        </div>
    )
}