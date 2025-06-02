import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
  key: 'userPersist', // localStorage(or sessionStorage) 내에 저장될 key입니다.
  storage: localStorage, // 기본 값은 localStorage이며, sessionStorage로도 변경할 수 있습니다.
})

export default persistAtom
