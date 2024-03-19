export const normalizeTeamData = (totalMatches, matchesPlayed, data) => {
    const dataMap = new Map()
    const normalized = new Array(Math.max(...totalMatches)).fill(0)

    matchesPlayed.map((match, index) => {
        dataMap.set(match, data[index])
    })


    normalized.forEach((_, index) => {
        if (dataMap.has(index)) {
            normalized[index] = dataMap.get(index)
        } else {
            normalized[index] = 0
        }
    })

    console.log(dataMap)
    return normalized
}