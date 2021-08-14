
export const getUser = () => {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    else return null;
  }
  
  export const getUserUpdate = () => {
    const user = localStorage.getItem('user');
    if (user) return JSON.parse(user);
    else return null;
  }
  
  // return the token from the session storage
  export const getToken = () => {
    return localStorage.getItem('token') || null;
  }
   
  // remove the token and user from the session storage
  export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  // create a session storage for a user
  export const setUserSession = (token: any, user: any) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
  
  
  
  
  // export default setTimeout(function() {
  //   let token = localStorage.setItem('authToken');
  //   }, 50);
  
  // export default  setTimeout(function() {
  //   let token = localStorage.getItem('authToken');
  //   }, 50);
  
  
  //   await AsyncStorage.getItem('loginStatus')
  // .then(value => this.setState({ loginStatus: value }))
  // .catch(e => console.log('err', e));