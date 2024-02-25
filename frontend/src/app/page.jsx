'use client'
import Image from "next/image";
import { Button, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../util/fetchers";
import { combine } from "@/util/combine";
import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
    const { isLoading, data, error } = useSWR(`${process.env.NEXT_PUBLIC_API_URL_2024}/api/comp`, fetcher)

    if (data) {
        return (
            <Stack>
                {data.map(({ Tables_in_Nemesis2590 }) => {
                    return (
                        <div>
                            <Link href={`/2024/${Tables_in_Nemesis2590}`}>{Tables_in_Nemesis2590}</Link>
                        </div>
                    )
                })}
            </Stack>
        )
    }
}
