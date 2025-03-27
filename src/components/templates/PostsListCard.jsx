import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deletePost } from '@/services/user';

import toast from 'react-hot-toast';
import { sp } from '@/utils/numbers';

import DeletePostModal from './DeletePostModal';

import { Box, Button, Grid } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from "./PostsListCard.module.css";

function PostsListCard({ post, BASE_URL, role }) {
    const queryClient = useQueryClient();

    const [showMenu, setShowMenu] = useState(false);
    const [showModal, setShowModal] = useState(false);


    const { _id, images, options, createdAt, amount } = post || {};

    const { data, mutate, isLoading } = useMutation({
        mutationFn: deletePost
    });

    const openModalHandler = () => {
        setShowModal(true);
        setShowMenu(false);
    };

    const onRequestClose = () => {
        setShowModal(false);
    };

    const whichQueryToInvalidate = (role) => {
        if (role === "ADMIN") {
            return ["post-list"];
        } else if (role === "USER") return ["my-post-list"];
    };

    const deletePostHandler = () => {
        mutate(_id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: whichQueryToInvalidate(role) });
                setShowModal(false);
                toast.success("آگهی با موفقیت حذف شد!");
                document.getElementById(`post${_id}`).style.opacity="0.4"
                document.getElementById(`post${_id}`).style.cursor= "not-allowed"
                document.getElementById(`post${_id}`).style.pointerEvents= "none"
            },
        });
    };

    return (
        <>
            <Grid item xs={12}>
                <Box component="div" key={_id} className={styles.post} id={`post${_id}`} display="flex" justifyContent="space-between">
                    <Box component="div" display="flex" >
                        <img src={`${BASE_URL}/${images?.[0] || "default.jpg"}`} alt="" height="100%" />
                        <div>
                            <p>{options?.title || "بدون عنوان"}</p>
                            <span>{options?.content || "بدون توضیحات"}</span>
                            <div className={styles.price}>
                                <p>{createdAt ? new Date(createdAt).toLocaleDateString("fa-IR") : "تاریخ ثبت نشده"}</p>
                                <span>{amount ? `${sp(amount)} تومان` : "No Price"}</span>
                            </div>
                        </div>
                    </Box>
                    <Box component="div" display="flex" justifyContent="flex-end" alignItems="center">
                        {showMenu && (
                            <Box component="div" width="fit-content !important" height="fit-content" display="flex" flexDirection="column" bgcolor="#f3f3f3" position="absolute" left="80px" sx={{ borderRadius: "10px" }}>
                                <button className={styles.menuButton} onClick={openModalHandler}>
                                    <DeleteIcon fontSize="10px" sx={{ ml: .4 }} />
                                    حذف آگهی
                                </button>
                                <button className={styles.menuButton}>تست</button>
                                <button className={styles.menuButton}>تست</button>
                            </Box>
                        )}
                        <Button sx={{ color: "#a62626" }} style={{ padding: 0, minWidth: '0', width: "40px", height: "40px", borderRadius: "50%", margin: "7px" }} onClick={() => setShowMenu(menu => !menu)}>
                            <MoreVertIcon />
                        </Button>
                    </Box>
                </Box>
            </Grid>
            {showModal && <DeletePostModal title={options?.title} showModal={showModal} onRequestClose={onRequestClose} deletePostHandler={deletePostHandler} isLoading={isLoading} />}
        </>
    );
}

export default PostsListCard;
