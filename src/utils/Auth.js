export class Auth {
  constructor() {
    this.login = '/dang-nhap'
    this.register = '/dang-ky'
    this.profile = '/profile'
  }

  isLogin = () => (localStorage.getItem('user-info') ? true : false)
  logout = () => localStorage.clear()
  user = () => localStorage.getItem('user')

  getProfileId = (id) => `/profile/${id}`
}
