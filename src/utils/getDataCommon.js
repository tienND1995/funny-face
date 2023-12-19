import axios from 'axios'
import configs from '../configs/configs.json'

const { SERVER_API_USER_DETAIL, SERVER_API_THINKDIFF } = configs

const user = JSON.parse(window.localStorage.getItem('user-info'))
const token = user?.token

 const getMyDetailUser = async () => {
  try {
    const { data } = await axios.get(SERVER_API_USER_DETAIL)

    if (data.ip) {
      const browser = window.navigator.userAgent
      return {
        browser: browser,
        ip: data.ip,
        nameM: data.ip + ' ' + 'Boy',
        nameF: data.ip + ' ' + 'Girl',
      }
    }
    return false
  } catch (error) {
    console.log(error)
    return false
  }
}

const createEvent = async (srcnam, srcnu, browser, ip) => {
  try {
    const response = await axios.get(
      `${SERVER_API_THINKDIFF}/getdata/sukien/baby`,
      {
        params: {
          device_them_su_kien: browser,
          ip_them_su_kien: ip,
          id_user: user.id_user,
        },
        headers: {
          linknam: srcnam,
          linknu: srcnu,
          Authorization: `Bearer ${token}`,
        },
      }
    )

    return { success: response.data }
  } catch (error) {
    return { error: error.message }
  }
}

export {getMyDetailUser, createEvent}