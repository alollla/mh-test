import client from '@/services/api.service';

export default function getAuthors() {
    return client.get(`/manage/authors`)
        .then((response) => response.data);
}
