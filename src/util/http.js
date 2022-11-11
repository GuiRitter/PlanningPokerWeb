export const getTokenFromPathName = () => (new URLSearchParams(window.location.search)).get('id');
