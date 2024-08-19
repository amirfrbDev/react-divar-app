import { useQuery } from '@tanstack/react-query'

import { getAllPosts } from 'src/services/user'

import Loader from '../modules/Loader'
import PostsListCard from './PostsListCard'

import { Grid, Typography } from '@mui/material'


function AllPosts() {

    const BASE_URL = import.meta.env.VITE_BASE_URL

    const { data, isLoading } = useQuery({
        queryKey: ["post-list"],
        queryFn: getAllPosts
    })


    return (
        <Grid container >
            <Grid item xs={12}>
                <Typography component="h2" variant='h6' mt={5} sx={{
                    marginBottom: "30px",
                    borderBottom: "4px solid #a62626",
                    width: " fit-content",
                    paddingBottom: "5px"
                }}>تمام آگهی ها:</Typography>
            </Grid>
            <Grid container>
                {
                    isLoading ? <Loader /> :
                        data?.data.posts.map(post => (
                            <PostsListCard post={post} BASE_URL={BASE_URL} role={"ADMIN"} />
                        ))
                }
            </Grid>
        </Grid >
    )
}

export default AllPosts