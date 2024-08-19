import { useRef, useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import { addCategory as mutationFn } from 'src/services/admin'

import Loader from '../modules/Loader'

import styles from "./CategoryForm.module.css"


function CategoryForm() {

    const queryClient = useQueryClient()

    const [form, setForm] = useState({
        name: "",
        slug: "",
        icon: ""
    });

    const messageBox = useRef()

    const { mutate, data, isLoading, error } = useMutation({
        mutationFn
    })
    

    const changeHandler = event => {
        setForm(form => ({
            ...form,
            [event.target.name]: event.target.value
        }))
    }

    const submitHandler = (event) => {
        event.preventDefault();
        if (!form.name || !form.slug || !form.icon) return;
        mutate(form, { onSuccess: () => queryClient.invalidateQueries({ queryKey: ["get-categories"] }) })

        setForm({ name: "", slug: "", icon: "" })
    }

    if (data?.status === 201) {
        setTimeout(() => {
            if (messageBox.current) messageBox.current.style.display = "none"
        }, 4000)
    }
    return (
        <form onChange={changeHandler} className={styles.form}>
            <h3>دسته بندی جدید</h3>
            {data?.status === 201 && <p ref={messageBox}>دسته بندی با موفقیت ساخته شد!</p>}
            <label htmlFor="name">اسم دسته بندی</label>
            <input type="text" name='name' id='name' value={form.name} />
            <label htmlFor="slug">اسلاگ</label>
            <input type="text" name='slug' id='slug' value={form.slug} />
            <label htmlFor="icon">آیکون</label>
            <input type="text" name='icon' id='icon' value={form.icon} />
            <button type='submit' onClick={submitHandler} disabled={isLoading}>{isLoading ? <Loader fullScreen={false} /> : "ایجاد دسته بندی"}</button>
        </form>
    )
}

export default CategoryForm