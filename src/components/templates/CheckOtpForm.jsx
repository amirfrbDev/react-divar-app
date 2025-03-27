import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { checkOtp } from '@/services/auth';
import { setCookie } from '@/utils/cookie';
import { getProfile } from "@/services/user";

import { p2e, e2p } from '@/utils/numbers';
import toast from 'react-hot-toast';

import styles from "@/components/templates/CheckOtpForm.module.css"
import { useEffect, useRef, useState } from 'react';

function CheckOtpForm({ code, setCode, setStep, phoneNumber, }) {

    const [isLoading, setIsLoading] = useState(false)

    const buttonRef = useRef()
    const inputRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {

        const enterClickHandler = (event) => {
            if (event.key === "Enter") {
                buttonRef.current.click()
            }
        }

        document.addEventListener("keydown", enterClickHandler);

        return () => {
            document.removeEventListener("keydown", enterClickHandler)
        }
    }, [])

    useEffect(() => inputRef.current.focus(), [])

    const { refetch } = useQuery({
        queryKey: ["profile"],
        queryFn: getProfile
    })

    const submitHandler = async (event) => {
        event.preventDefault();

        setIsLoading(true)

        const regex = /^\d{5}$/;
        const isValid = regex.test(code);
        if (!isValid) {
            setIsLoading(false);
            return
        }

        const { response, error } = await checkOtp(p2e(phoneNumber), p2e(code));
        // console.log(response)
        if (response) {
            setCookie(response.data)
            navigate("/")
            refetch()
        } else {
            toast.error("کد تایید صحیح نمی‌باشد!", {
                position: "top-left"
            });
        }
        setIsLoading(false)
    }

    return (
        <form className={styles.form} >
            <p>تأیید کد ارسال شده</p>
            <span>کد پیامک‌شده به شمارۀ «{e2p(phoneNumber)}» را وارد کنید.</span>
            <label htmlFor="input">کد تأیید شده را وارد نمایید:</label>
            <input
                type="text"
                id='input'
                placeholder='کد تایید'
                code={code}
                onChange={e => setCode(e.target.value)}
                ref={inputRef}
            />
            <button type='submit' onClick={submitHandler} disabled={isLoading} ref={buttonRef}>
                {isLoading ? "در حال ورود..." : "ورود"}
            </button>
            <button onClick={() => setStep(1)} className={styles.backButton}>تغییر شمارۀ موبایل</button>
        </form>
    )
}

export default CheckOtpForm