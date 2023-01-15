import client from '@/services/api.service';

export default function getPostDetails(id:number) {
    return client.get(`/manage/posts/detail?id=${id}`)
        .then((response) => response.data);
}
