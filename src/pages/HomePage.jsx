import  { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

import { getAllPosts } from 'src/services/user'
import { getCategories } from 'src/services/admin';
import { displayByCategory } from 'src/helper/helper'

import Sidebar from 'components/templates/Sidebar'
import Main from 'components/templates/Main'
import Loader from 'src/components/modules/Loader'

import { Grid } from '@mui/material'


function HomePage() {

    const [displayed, setDisplayed] = useState("")
    const [category, setCategory] = useState("")

    const [query, setQuery] = useState({});

    const [searchParams, setSearchParams] = useSearchParams()

    const { data: posts, isLoading: postLoading } = useQuery({
        queryKey: ["post-list"],
        queryFn: getAllPosts,
    })

    const { data: categories, isLoading: categoryLoading } = useQuery({
        queryKey: ["get-categories"],
        queryFn: getCategories
    });

    if (displayed === "" && !postLoading) {
        setDisplayed(posts?.data.posts)
    }

    useEffect(() => {
        if (!postLoading) {
            const finalPosts = displayByCategory(posts?.data.posts, category);
            setDisplayed(finalPosts)
        }
    }, [category])

    useEffect(() => {
        setSearchParams(query)
    }, [query])

    useEffect(() => {
        const category = searchParams.get("category")
        const query = {};
        if (category) query.category = category;
        setQuery(query)
    }, [])

    return (
        <>
            {(postLoading || categoryLoading) ? <Loader /> : (
                <Grid container sx={{ display: "flex", mr: 0 }} mt={5} spacing={2}>
                    <Sidebar categories={categories} category={category} setCategory={setCategory} setQuery={setQuery} />
                    <Main displayed={displayed} />
                </Grid>
            )}
        </>
    )
}

export default HomePage