import { LOCAL_STORAGE_ITEM } from '../../constants/common'

export default function getLocalToken() {
  const token = window.localStorage.getItem(LOCAL_STORAGE_ITEM.ACCESS_TOKEN)
  return token
}
