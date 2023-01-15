import client from '@/services/api.service';

export default function editPost(data: any) {
    return client.post(`/manage/posts/edit?id=${data.id}`, data)
        .then((response) => response.data);
}
