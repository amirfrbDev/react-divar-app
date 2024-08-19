import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { deleteCategory, getCategories as queryFn } from 'src/services/admin';
import Loader from '../modules/Loader';


import styles from "./CategoryList.module.css"
function CategoryList() {

    const queryClient = useQueryClient()

    const queryKey = ["get-categories"];

    const { data, isLoading } = useQuery({
        queryKey,
        queryFn
    })

    const { mutate, } = useMutation({
        mutationKey: ['delete-category'],
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get-categories"] })
        },
        onError: (error) => {
            console.log("first")
            if (error.response && error.response.status === 409) {
                console.log("Conflict: The request could not be completed due to a conflict with the current state of the target resource.");
                // Handle the 409 error here, e.g., display a message to the user
            } else {
                console.log("An error occurred:", error);
            }
        }
    })


    return (
        <div className={styles.list}>
            {isLoading ? <Loader /> : (
                data.data.map(i =>
                (
                    <div key={i._id}>
                        <img src={`${i.icon}.svg`} alt="آیکون" />
                        <h5>{i.name}</h5>
                        <p>slug: {i.slug}</p>
                        <span onClick={() => mutate(i._id,
                        )}>×</span>
                    </div>
                )
                )
            )}
        </div>
    )
}

export default CategoryList