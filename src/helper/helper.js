const displayByCategory = (posts, categoryId) => {
    if (categoryId === "" || categoryId === "all") {
        return posts
    }
    const categorizedPosts = posts.filter(post => post.category === categoryId);
    console.log(categorizedPosts)
    return categorizedPosts
}

const createQueryObject = (currentQuery, newQuery) => {
    if (newQuery.category === "all") {
        const { category, ...rest } = currentQuery;
        return rest
    }
    return { ...currentQuery, ...newQuery }
}

export { displayByCategory, createQueryObject }