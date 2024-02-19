import Image from "next/image";
import { Button, Stack } from "@mui/material";
import useSWR from "swr";

export default function Home() {
    const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { isLoading, data, error } = useSWR('https://jsonplaceholder.typicode.com/posts', fetcher)

    return (
        <Stack>

        </Stack>
    )
}
