import client from '@/services/api.service';

export default function login(data: FormData) {
    return client.post('/auth/token-generate', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
        .then((response) => response.data);
}
