import React, {useEffect} from 'react';
import {Typography, Image, Row, Col, Tag, Avatar} from 'antd';
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";

import {getPostDetailsAction} from "@/store/actions/post";
import TokenService from "@/services/token.service";

const {Title, Text} = Typography;

export default function PostDetailsPage() {
    const dispatch = useDispatch();

    // @ts-ignore
    const { id } = useParams();

    const {details} = useSelector((state: any) => state?.post);

    const isAuth = TokenService.getLocalRefreshToken() && TokenService.getLocalAccessToken();

    useEffect(() => {
        if (isAuth && id) {
            dispatch(getPostDetailsAction(id));
        }
    }, [dispatch, isAuth, id]);

    return (

        <div className="container">
            {
                details &&
                <Row gutter={[16, 16]} style={{width: "100%"}}>
                    <Col span={6}>
                        <Image src={details.previewPicture.url} />
                    </Col>
                    <Col span={18}>
                        <Title level={5}>{details.title}</Title>
                        <Text>{details.text}</Text>
                    </Col>
                    <Col span={6}>
                        <Text>Author</Text>
                    </Col>
                    <Col span={18}>
                        <Avatar src={details.author.avatar.url}/>
                        <Text>{details.author.fullName}</Text>
                    </Col>
                    <Col span={6}>
                        <Text>Tags</Text>
                    </Col>
                    <Col span={18}>
                        {
                            details.tags.map((tag:any) => (
                                <Tag key={tag.id}>{tag.name}</Tag>
                            ))
                        }
                    </Col>
                    <Col span={6}>
                        <Text>Code: </Text>
                        <Text>{details.code}</Text>
                    </Col>
                    <Col span={6}>
                        <Text>Created: </Text>
                        <Text>{details.createdAt}</Text>
                    </Col>
                    <Col span={6}>
                        <Text>Updated: </Text>
                        <Text>{details.updatedAt}</Text>
                    </Col>
                </Row>
            }
        </div>
    )
}