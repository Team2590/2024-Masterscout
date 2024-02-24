'use client'
import Image from "next/image";
import { Button, Stack } from "@mui/material";
import useSWR from "swr";
import { fetcher } from "../util/fetchers";
import { combine } from "@/util/combine";
import { useEffect } from "react";

export default function Home() {
    // const { isLoading, data, error } = useSWR(`${process.env.API_URL_2024}/api/compo`, fetcher)

    const myObjArr = [{ a: 1, b: 'string 1' }, { a: 2, b: 'string 2' }]
    const thing = combine.objNums(myObjArr, 'a')
    const thing2 = combine.objStrings(myObjArr, 'b')

    useEffect(() => {
        console.log(thing2)
    }, [])

    return (
        // <Stack>
        //     {data.map(info => {
        //         return (
        //             <div>
        //                 <p>idk</p>
        //             </div>
        //         )
        //     })}
        // </Stack>
        <p>fuck</p>
    )
}
