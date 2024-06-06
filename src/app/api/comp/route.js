import { connectionConfig } from '@/util/connection'
import mysql from 'mysql2/promise'

export async function GET() {
    try {
        const connection = await mysql.createConnection(connectionConfig)
        const [result] = await connection.query('SHOW tables')
        await connection.end()
        return Response.json(result)
    } catch (e) {
        return Response.error()
    }

}