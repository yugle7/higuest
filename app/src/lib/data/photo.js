import { PUBLIC_PB_URL } from '$env/static/public'
import { PB_URL } from '$env/static/private'


export const setPhotos = (pb) => (res) => {
    res.photos = (res.photos || []).map(p => PUBLIC_PB_URL + pb.files.getUrl(res, p).substring(PB_URL.length));
};

export const getPhotos = (res, photos) => res.photos.map(id => photos[id]);
