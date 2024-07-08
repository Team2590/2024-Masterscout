import { db } from '@/firebase/firebase'
import { doc, getDoc } from 'firebase/firestore'

export async function GET(req, { params: { comp } }) {
    const docRef = doc(db, 'competitions', comp)
    const docSnap = await getDoc(docRef)
    return Response.json(
        JSON.parse(docSnap.data().competitionData).map(({ teamNum }) => {
            return teamNum
        })
    )
}