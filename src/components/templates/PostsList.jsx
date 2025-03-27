import { useQuery, useQueryClient } from "@tanstack/react-query"

import { getCookie } from "@/utils/cookie";

import Loader from "@/components/modules/Loader";
import PostsListCard from "./PostsListCard";

import styles from "./PostsList.module.css"
import { useEffect } from "react";
import { getPosts } from "@/services/user";


function PostsList() {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    const queryClient = useQueryClient()

    const { refetch, data, isLoading } = useQuery({
        queryKey: ["my-post-list"],
        queryFn: getPosts,
        enabled: !!getCookie("accessToken"),
    });

    useEffect(() => {
        if (getCookie("accessToken")) {
            queryClient.invalidateQueries({queryKey:["my-post-list"]})
        }
    }, [getCookie("accessToken")])

    if (isLoading) return <Loader />

    return (
        <div className={styles.list} style={{ margin: "0 20px 0 20px" }}>

            <h3>آگهی های شما</h3>
            {
                data?.data?.posts?.slice().reverse().map(post => (
                    <PostsListCard post={post} BASE_URL={BASE_URL} key={post._id} role={"USER"} />
                ))
            }

        </div>
    )
}

export default PostsList