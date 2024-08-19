import React, { useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { getCategories as queryFn } from 'src/services/admin';
import { getCookie } from 'src/utils/cookie';

import axios from 'axios';
import toast from 'react-hot-toast';
import { p2e } from 'src/utils/numbers';

import styles from "./AddPost.module.css";

function AddPost() {

    const queryClient = useQueryClient()

    const [form, setForm] = useState({
        title: "",
        content: "",
        category: "",
        city: "",
        amount: "",
        images: null
    });

    const fileInputRef = useRef(null);

    const mutationFn = (formData) => {
        const token = getCookie("accessToken");

        return axios.post(`${import.meta.env.VITE_BASE_URL}/post/create`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`
            }
        })

    }

    const { data: addPostData, isLoading, mutate } = useMutation({
        mutationFn,
        onSuccess: (res) => {
            setForm({
                title: "",
                content: "",
                category: "",
                city: "",
                amount: "",
                images: null
            });

            // Reset the file input value
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }

            toast.success(res.data.message);
            queryClient.invalidateQueries({ queryKey: ["my-post-list"] })
            // queryClient.invalidateQueries({ queryKey: ["post-list"] })
        },
        onError: (error) => {
            toast.warn("مشکلی پیش آمده است!")
        }

    })

    const { data } = useQuery({
        queryKey: ["get-categories"],
        queryFn
    });


    const changeHandler = (event) => {
        const name = event.target.name;

        if (name !== "images") {
            if (name === amount) {
                setForm(form => ({ ...form, [name]: p2e(event.target.value) }));
            }
            setForm(form => ({ ...form, [name]: event.target.value }));
        } else {
            setForm(form => ({ ...form, [name]: event.target.files[0] }));
        }
    };

    const submitHandler = (event) => {
        event.preventDefault();

        if (!form.title || !form.content || form.category === "-" || !form.city || !form.amount || !form.images) return;

        const formData = new FormData();
        for (let i in form) {
            formData.append(i, form[i]);
        }

        mutate(formData)


    };

    return (
        <form onChange={changeHandler} className={styles.form} style={{ marginRight: "20px" }}>
            <h3>افزودن آگهی</h3>
            <label htmlFor="title">عنوان آگهی</label>
            <input type="text" name='title' id='title' value={form.title} onChange={changeHandler} />
            <label htmlFor="content">توضیحات</label>
            <textarea name="content" id="content" value={form.content} onChange={changeHandler} />
            <label htmlFor="amount">قیمت</label>
            <input type="number" name='amount' id='amount' value={form.amount} onChange={changeHandler} />
            <label htmlFor="city">شهر</label>
            <input type="text" name='city' id='city' value={form.city} onChange={changeHandler} />
            <label htmlFor="category">دسته بندی</label>
            <select name="category" id="category" value={form.category} onChange={changeHandler}>
                <option value="-">-</option>
                {data?.data.map(i => <option key={i._id} value={i._id}>{i.name}</option>)}
            </select>
            <label htmlFor="images">عکس</label>
            <input type="file" name='images' id='images' ref={fileInputRef} filename={form.images} />
            <button onClick={submitHandler}>ایجاد</button>

        </form>
    );
}

export default AddPost;
