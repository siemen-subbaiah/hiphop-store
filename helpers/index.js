import cookie from 'cookie';

// RATING FUNCTION!
export const getRatingAvg = (item) => {
  let rating = 0;
  item?.reviews?.forEach(
    (it) => (rating = rating + it.rating / item.reviews.length)
  );

  return rating;
};

// COOKIE PARSE!
export const parseCookies = (req) => {
  return cookie.parse(req ? req.headers.cookie || '' : '');
};

// CHECK ADMIN!
export const checkAdmin = (user) => {
  return user === 'Admin' ? true : false;
};

// SORT ARRAY BASED ON DATE!
export const sortByDate = (data) => {
  return data.sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at)
  );
};
