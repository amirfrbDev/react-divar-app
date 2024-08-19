import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost as mutationFn } from 'src/services/user';

import toast from 'react-hot-toast';
import { sp } from 'src/utils/numbers';

import DeletePostModal from './DeletePostModal';

import { Box, Button, Grid } from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from "./PostsListCard.module.css"


function PostsListCard({ post, BASE_URL, role }) {

    const queryClient = useQueryClient()

    const [showMenu, setShowMenu] = useState(false)

    const [showModal, setShowModal] = useState(false);

    const { _id, images, options: { title, content, }, createdAt, amount } = post;

    const { data, mutate, isLoading } = useMutation({
        mutationFn
    })

    const openModalHandler = () => {
        setShowModal(true)
        setShowMenu(false)
    };

    const onRequestClose = () => {
        setShowModal(false)
    }

    const whichQueryToInvalidate = (role) => {
        if (role === "ADMIN") {
            return ["post-list"]
        } else if (role === "USER") return ["my-post-list"]
    }

    const deletePostHandler = () => {
        mutate(_id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: whichQueryToInvalidate(role) });
                // queryClient.invalidateQueries({queryKey:["posts"]})
                setShowModal(false)
                toast.success("آگهی با موفقیت حذف شد!")
            }
        })
    }


    return (
        <>
            <Grid item xs={12}>
                <Box component="div" key={_id} className={styles.post} display="flex" justifyContent="space-between" >
                    <Box component="div" display="flex">
                        <img src={`${BASE_URL}/${images[0]}`} alt="" height="100%" />
                        <div>
                            <p>{title}</p>
                            <span>{content}</span>
                            <div className={styles.price}>
                                <p>{new Date(createdAt).toLocaleDateString("fa-IR")}</p>
                                <span>{sp(amount)} تومان</span>
                            </div>
                        </div>
                    </Box>
                    <Box component="div" display="flex" justifyContent="flex-end" alignItems="center">
                        {
                            showMenu && (
                                <Box component="div" width="fit-content !important" height="fit-content" display="flex" flexDirection="column" bgcolor="#f3f3f3" position="absolute" left="80px" sx={{ borderRadius: "10px" }}>
                                    <button className={styles.menuButton} onClick={openModalHandler}>
                                        <DeleteIcon fontSize='10px' sx={{ ml: .4 }} />
                                        حذف آگهی
                                    </button>
                                    <button className={styles.menuButton}>تست</button>
                                    <button className={styles.menuButton}>تست</button>
                                </Box>
                            )
                        }
                        <Button sx={{ color: "#a62626" }} style={{ padding: 0, minWidth: '0', width: "40px", height: "40px", borderRadius: "50%", margin: "7px" }} onClick={() => setShowMenu(menu => !menu)}>
                            <MoreVertIcon />
                        </Button>

                    </Box>
                </Box>
            </Grid>
            {showModal && <DeletePostModal showModal={showModal} onRequestClose={onRequestClose} deletePostHandler={deletePostHandler} isLoading={isLoading} />}
        </>
    )
}

export default PostsListCard