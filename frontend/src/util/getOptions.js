import { optionIsValid } from './optionIsValid'

export const getOptions = (data) => {
    return Array.from(new Set(data.map(({ teamNum }) => {
        if (!optionIsValid(teamNum)) return '0'
        return teamNum
    })))
}