const displayByCategory = (posts, categoryId) => {
    if (categoryId === "all" && !categoryId) {
        return posts
    }
    const categorizedPosts = posts.filter(post => post.category === categoryId);
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