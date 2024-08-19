import { useQuery } from "@tanstack/react-query"
import { getPosts as queryFn } from "src/services/user";
import Loader from "../modules/Loader";
import { sp } from "src/utils/numbers";
import styles from "./PostsList.module.css"
import PostsListCard from "./PostsListCard";

function PostsList() {

    const BASE_URL = import.meta.env.VITE_BASE_URL

    const queryKey = ["my-post-list"];
    const { data, isLoading } = useQuery({
        queryKey,
        queryFn,
    });

    return (
        <div className={styles.list} style={{margin:"0 20px 0 20px"}}>
            {
                isLoading ? <Loader /> : (
                    <>
                        <h3>آگهی های شما</h3>
                        {
                            data?.data?.posts.map(post => (
                                <PostsListCard post={post} BASE_URL={BASE_URL} key={post._id} role={"USER"} />
                            ))
                        }
                    </>
                )
            }
        </div>
    )
}

export default PostsList