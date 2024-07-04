import { db } from '@/firebase/firebase'
import { collection, getDocs } from 'firebase/firestore'

export async function GET() {
    const competitions = []
    const docs = await getDocs(collection(db, 'competitions'))
    docs.forEach(({ id }) => {
        competitions.push(id)
    })
    return Response.json(competitions)
}