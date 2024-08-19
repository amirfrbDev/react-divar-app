import { sp } from 'src/utils/numbers';

import { Grid } from '@mui/material';

import styles from "./Main.module.css";

function Main({ displayed }) {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    return (
        <Grid item xs={12} md={9.3} className={styles.container}>
            <Grid container spacing={1}  >
                {displayed?.map(post => (
                    <Grid item key={post._id} xs={12} sm={6} md={6} lg={4}>
                        <div className={styles.card}>
                            <div className={styles.info}>
                                <p>{post?.options?.title}</p>
                                <div>
                                    <p>{sp(post.amount)} تومان</p>
                                    <span>در {post?.options?.city}</span>
                                    
                                </div>
                            </div>
                            <img src={`${BASE_URL}/${post.images[0]}`} alt={post?.options?.title} className={styles.image} />
                        </div>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );
}

export default Main;
