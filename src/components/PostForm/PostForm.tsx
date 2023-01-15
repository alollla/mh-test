import React, {useEffect, useMemo, useState} from "react";
import {Button, Form, Input, Select, Upload} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {UploadFile} from "antd/lib";

import {getAuthorsAction} from "@/store/actions/author";
import {getTagsAction} from "@/store/actions/tag";

interface PostFromProps {
    onFinish: (values: any) => void,
    initialValues?: any
}

export default function PostForm({onFinish, initialValues}: PostFromProps) {
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const [fileList, setFileList] = useState<UploadFile[]>();

    useEffect(() => {
        dispatch(getAuthorsAction())
        dispatch(getTagsAction())
    },[dispatch]);

    useEffect(() => {
        if(initialValues) {
            form.setFieldValue("code", initialValues?.code);
            form.setFieldValue("title", initialValues?.title);
            form.setFieldValue("text", initialValues?.text);
            form.setFieldValue("authorId", initialValues?.authorId);
            form.setFieldValue("tagIds", initialValues?.tagIds);

            setFileList([{
                uid: initialValues?.previewPicture?.id,
                name: initialValues?.previewPicture?.name,
                status: 'done',
                url: initialValues?.previewPicture?.url
            }])
        }
    }, [form, initialValues])

    const {tags} = useSelector((state: any) => state?.tag);
    const {authors} = useSelector((state: any) => state?.author);

    const tagItems = useMemo(() => tags?.map((tag:any) => ({
        label: tag.name,
        value: tag.id,
    })), [tags]);

    const authorItems = useMemo(() => authors?.map((author:any) => ({
        label: `${author.lastName} ${author.name} ${author.secondName}`,
        value: author.id,
    })), [authors]);

    return (
        <Form
            name="post"
            form={form}
            onFinish={onFinish}
        >
            <Form.Item
                name="code"
                labelCol={{span: 24}}
                rules={[
                    {
                        required: true,
                        message: "Code is required"
                    },
                ]}
                label="Code"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="title"
                labelCol={{span: 24}}
                rules={[
                    {
                        required: true,
                        message: "Title is required"
                    },
                ]}
                label="Title"
            >
                <Input/>
            </Form.Item>
            <Form.Item
                name="text"
                labelCol={{span: 24}}
                rules={[
                    {
                        required: true,
                        message: "Text is required"
                    },
                ]}
                label="Text"
            >
                <Input.TextArea/>
            </Form.Item>
            <Form.Item
                name="authorId"
                label="Author"
                labelCol={{span: 24}}
                rules={[
                    {
                        required: true,
                        message: "Author is required"
                    },
                ]}
            >
                <Select options={authorItems}/>
            </Form.Item>
            <Form.Item
                name="tagIds"
                label="Tags"
                labelCol={{span: 24}}
                rules={[
                    {
                        required: true,
                        message: "Tags is required"
                    },
                ]}
            >
                <Select
                    mode="multiple"
                    allowClear
                    options={tagItems}
                />
            </Form.Item>
            <Form.Item
                name="image"
                valuePropName={"file"}
                rules={[
                    {
                        required: !fileList?.length,
                        message: "Picture is required"
                    },
                ]}
            >
                <Upload
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    beforeUpload={() => false}
                    maxCount={1}
                >
                    Upload
                </Upload>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" block>
                    {initialValues ? 'Save' : 'Add'}
                </Button>
            </Form.Item>
        </Form>
    )
}