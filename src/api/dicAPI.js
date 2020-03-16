import Instance from './base';

export const search = ({ query, dizzy }) => Instance.get('/loilang/search', {
  params: { query, dizzy },
});

export const general = () => Instance.get('/loilang/general');

export const getWordById = ({ id }) => Instance.get(`/loilang/id/${id}`);
