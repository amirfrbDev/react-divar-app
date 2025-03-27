import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useRef } from 'react';
import Modal from 'react-modal'


Modal.setAppElement('#root');

function DeletePostModal({ title, showModal, onRequestClose, deletePostHandler, isLoading }) {

    const deleteBtnRef = useRef();
    const cancelBtnRef = useRef()

    useEffect(() => {
        const buttonKeyboardClickHandler = (event) => {
            if (event.key === "Enter") {
                deleteBtnRef.current.click()
            } else if (event.key === "Escape") {
                cancelBtnRef.current.click()
            }
        }

        document.addEventListener("keydown", buttonKeyboardClickHandler)

        return () => {
            document.removeEventListener("keydown", buttonKeyboardClickHandler)
        }
    }, [])

    return (

        <Grid container>
            <Grid item component="div" >
                <Modal isOpen={showModal} onRequestClose={onRequestClose} style={{
                    overlay: {
                        backgroundColor: "none",
                        backdropFilter: "blur(3px)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    },
                    content: {
                        width: "30%",
                        height: "fit-content",
                        margin: "0",
                        padding: "25px",
                        position: "relative",
                        inset: "0"
                    },

                }}>
                    <Typography component="h2" variant='h4' mb={1}>هشدار!</Typography>

                    <Typography component="p" variant='p' mt={3}>آیا میخواهید آگهی <span style={{ backgroundColor: "#e9e9e9", color: "#383838", margin: "2px", padding: "5px", borderRadius: "5px" }}>«{title}»</span> را حذف کنید؟</Typography>
                    <Box component="div" mt={4} display="flex" justifyContent="flex-end">
                        <Button variant='outlined' sx={{ bgcolor: "transparent", borderColor: "#575757", color: "#575757" }} onClick={onRequestClose} disabled={isLoading} ref={cancelBtnRef}>انصراف</Button>
                        <Button variant="contained" sx={{
                            bgcolor: "#a62626",
                            mr: 1,
                            '&:hover': {
                                backgroundColor: "#922323 !important"
                            },
                            "&:disabled": {
                                backgroundColor: "#eaeaea"
                            }
                        }} onClick={deletePostHandler} disabled={isLoading} ref={deleteBtnRef}>{isLoading ? "در حال حذف..." : "حذف"}</Button>
                    </Box>

                </Modal>
            </Grid>
        </Grid>

    )
}

export default DeletePostModal