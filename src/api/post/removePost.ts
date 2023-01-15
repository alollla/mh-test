import client from '@/services/api.service';

export default function removePost(id:number) {
    return client.delete(`/manage/posts/remove?id=${id}`)
        .then((response) => response.data);
}
