import client from '@/services/api.service';

export default function getTags() {
    return client.get(`/manage/tags`)
        .then((response) => response.data);
}
