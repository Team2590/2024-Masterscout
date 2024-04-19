export const filterDataByTeamNum = (data, teamNum) => {
    return data.filter(d => {
        return d.teamNum == teamNum
    })
}