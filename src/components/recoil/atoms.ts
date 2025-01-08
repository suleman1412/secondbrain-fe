import { atom } from 'recoil'
import { ContentType } from '../Card'

export const isLoggedIn= atom<boolean>({
    key: 'isLoggedIn',
    default: localStorage.getItem('token') ? true : false
})

export const heroTitleinput = atom<string | null>({
    key: 'inputTitle',
    default: null
})

export const heroLinkinput = atom<string | null>({
    key: 'inputLink',
    default: null
})

export const shareLink = atom<string>({
    key: 'shareLink',
    default: ''
})

export const allContentAtom = atom<ContentType[]>({
    key: 'allContentAtom',
    default: []
})

export const filteredContentAtom = atom<ContentType[]>({
    key: 'filteredContentAtom',
    default: []
})

export const userId = atom<string>({
    key: 'userId',
    default: ''
})

export const modalStatus = atom<boolean>({
    key: 'modalStatus',
    default: false
})

export const shareModal = atom<boolean>({
    key: 'shareModal',
    default: false
})