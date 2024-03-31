export const setPhotos = (pb) => (res) => {
    res.photos = (res.photos || []).map((p, i) => ({ id: i, url: pb.files.getUrl(res, p) }));
};
