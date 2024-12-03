import { atom } from 'recoil'

export const isLoggedIn= atom<boolean>({
    key: 'isLoggedIn',
    default: false
})

export const heroTitleinput = atom<string | null>({
    key: 'inputTitle',
    default: null
})

export const heroLinkinput = atom<string | null>({
    key: 'inputLink',
    default: null
})

export const currTab = atom<string | null>({
    key: 'currTab',
    default: ''
})

export const shareLink = atom<string>({
    key: 'shareLink',
    default: ''
})