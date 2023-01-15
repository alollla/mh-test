import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory, useParams} from "react-router-dom";

import PostForm from "@/components/PostForm";
import {editPostAction, getPostDetailsAction} from "@/store/actions/post";
import TokenService from "@/services/token.service";

export default function EditPostPage () {
    const dispatch = useDispatch();
    const history = useHistory();

    // @ts-ignore
    const { id } = useParams();

    const {details} = useSelector((state: any) => state?.post);

    const isAuth = TokenService.getLocalRefreshToken() && TokenService.getLocalAccessToken();

    useEffect(() => {
        if (isAuth && id) {
            dispatch(getPostDetailsAction(id));
        }
    }, [dispatch, isAuth, id]);

    function handleSubmit(values:any) {
        const requestData = {
            ...values,
            previewPicture: values.image?.file,
            id
        }

        dispatch(editPostAction(requestData));
        history.replace('/')
    }

    return (
        <div className="container">
            <PostForm onFinish={handleSubmit} initialValues={{
                code: details?.code,
                title: details?.title,
                text: details?.text,
                authorId: details?.author?.id,
                tagIds: details?.tags?.map((tag:any) => tag.id),
                previewPicture: details?.previewPicture,
            }} />
        </div>
    )
}