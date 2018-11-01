export const UPDATE_PAGE = 'UPDATE_PAGE';

export const onNavigate = location => {
  return {
    type: UPDATE_PAGE,
    page: location.route.path.substr(1)
  };
};
