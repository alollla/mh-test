import client from '@/services/api.service';

export default function getPosts(page = 1) {
    return client.get(`/manage/posts?page=${page}`)
        .then((response) => response);
}
