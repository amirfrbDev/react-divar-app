import { createQueryObject } from "src/helper/helper";
import styles from "./Sidebar.module.css"
import { Box, Grid } from '@mui/material';

function Sidebar({ categories, category, setCategory, setQuery }) {

    const categoryHandler = (event) => {
        const categoryId = event.currentTarget.dataset.categoryId
        setCategory(categoryId)

        setQuery(query => createQueryObject(query, { category: categoryId }))
    }

    return (
        <Grid item className={styles.sidebar} xs={12} md={2.3} flexDirection="column">
            <h4>دسته ها</h4>
            <ul>
                <Box component="li" onClick={categoryHandler} data-category-id="all" className={styles.allCategories} sx={{ width: "97%", padding: "5px", borderRadius: '5px', cursor: "pointer", transition: "all 0.2s", '&:hover': { bgcolor: '#eaeaea' } }}>
                    <p>همه</p>
                </Box>
                {
                    categories?.data.map(cat => (
                        <Box component="li" key={cat._id} onClick={categoryHandler} data-category-id={`${cat._id}`} className={category === cat._id ? styles.selected : null}>
                            <img src={`${cat.icon}.svg`} alt="" />
                            <p>{cat.name}</p>
                        </Box>
                    ))
                }
            </ul>
        </Grid>
    )
}

export default Sidebar