import { Box, Button, Typography } from '@mui/material';
import Modal from 'react-modal'


Modal.setAppElement('#root');

function DeletePostModal({ showModal, onRequestClose, deletePostHandler, isLoading }) {


    return (
        <Modal isOpen={showModal} onRequestClose={onRequestClose} style={{
            overlay: {
                backgroundColor: "none",
                backdropFilter: "blur(3px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            },
            content: {
                width: "40%",
                height: "fit-content",
                margin: "0",
                position: "relative",
                inset: "0"
            },

        }}>
            <Typography component="h2" variant='h5' mb={1}>هشدار!</Typography>

            <Typography component="p" variant='p' mt={3}>آیا میخواهید این آگهی را حذف کنید؟</Typography>
            <Box component="div" mt={4} display="flex" justifyContent="flex-end">
                <Button variant='outlined' onClick={onRequestClose}>انصراف</Button>
                <Button variant="contained" sx={{
                    bgcolor: "#a62626",
                    mr: 1,
                    '&:hover': {
                        backgroundColor: "#922323 !important"
                    },
                    "&:disabled": {
                        backgroundColor: "#eaeaea"
                    }
                }} onClick={deletePostHandler} disabled={isLoading}>{isLoading ? "در حال حذف..." : "حذف"}</Button>
            </Box>
            {/* <Button onClick={onRequestClose} sx={{ color: "#a62626", fontSize: "30px", padding: 0, minWidth: 0, height: "20px", position: "absolute", top: "10px", right: "10px" }} >&times;</Button> */}
        </Modal>

    )
}

export default DeletePostModal