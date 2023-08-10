export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return { Authorization: 'Bearer ' + user.accessToken }; // for Spring Boot back-end
  } else {
    return {};
  }
}
// Authorization: Bearer [header].[payload].[signature]
// return { Authorization: 'Bearer ' + user.accessToken }
// return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
