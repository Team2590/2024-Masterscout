import { connectionConfig } from '@/util/connection'
import mysql from 'mysql2/promise'

export async function GET(req, { params: { comp } }) {
    try {
        const connection = await mysql.createConnection(connectionConfig)
        const [result] = await connection.query('SELECT DISTINCT teamNum FROM ?? ORDER BY teamNum ASC;', [comp])
        await connection.end()
        return Response.json(result)
    } catch (e) {
        return Response.error()
    }
}