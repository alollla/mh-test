import React from "react";
import {useDispatch} from "react-redux";
import {useHistory} from "react-router-dom";

import PostForm from "@/components/PostForm";
import {addPostAction} from "@/store/actions/post";

export default function AddPostPage () {
    const dispatch = useDispatch();
    const history = useHistory();

    function handleSubmit(values:any) {
        const requestData = {
            ...values,
            previewPicture: values.image.file
        }

        dispatch(addPostAction(requestData));
        history.replace('/')
    }

    return (
        <div className="container">
            <PostForm onFinish={handleSubmit}/>
        </div>
    )
}