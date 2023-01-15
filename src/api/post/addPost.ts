import client from '@/services/api.service';

export default function addPost(data:any) {
    return client.post(`/manage/posts/add`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => response.data);
}
