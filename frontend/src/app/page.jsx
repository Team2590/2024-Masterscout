'use client'
import Image from "next/image";
import { Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../util/fetchers";
import Link from "next/link";

export default function Home() {
    const { isLoading, data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/comp`, fetcher)

    if (data) {
        return (
            <div style={{ marginInline: 'auto', marginTop: '2rem' }}>
                <Stack sx={{ marginInline: 'auto', textAlign: 'center' }}>
                    <h1>Competitions</h1>
                    {data.map(({ Tables_in_Nemesis2590 }, index) => {
                        return (
                            <div key={index} style={{ marginBottom: '1rem' }}>
                                <Link
                                    href={`/2024/${Tables_in_Nemesis2590}`}
                                    style={{ textDecoration: 'none', color: 'inherit', fontSize: '1.75rem' }}
                                >
                                    {decodeURI(Tables_in_Nemesis2590)}
                                </Link>
                            </div>
                        )
                    })}
                </Stack>
            </div>
        )
    }
}
