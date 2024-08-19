import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { checkOtp } from 'services/auth';
import { setCookie } from 'utils/cookie';
import { getProfile as queryFn } from "src/services/user";

import styles from "components/templates/CheckOtpForm.module.css"
import { p2e } from 'src/utils/numbers';
import toast from 'react-hot-toast';

function CheckOtpForm({ code, setCode, setStep, phoneNumber, }) {


    const navigate = useNavigate()

    const queryKey = ["profile"];

    const { refetch } = useQuery({
        queryKey,
        queryFn
    })

    const submitHandler = async (event) => {
        event.preventDefault();

        const regex = /^\d{5}$/;
        const isValid = regex.test(code);
        if (!isValid) return

        const { response, error } = await checkOtp(p2e(phoneNumber), p2e(code));
        console.log(response)
        if (response) {
            setCookie(response.data)
            navigate("/")
            refetch()
        } else {
            toast.error("کد تایید صحیح نمی‌باشد!", {
                position:"top-left"
            });
            return;
        }
    }

    return (
        <form className={styles.form} >
            <p>تأیید کد ارسال شده</p>
            <span>کد پیامک‌شده به شمارۀ «{phoneNumber}» را وارد کنید.</span>
            <label htmlFor="input">کد تأیید شده را وارد نمایید:</label>
            <input
                type="text"
                id='input'
                placeholder='کد تایید'
                code={code}
                onChange={e => setCode(e.target.value)}
            />
            <button type='submit' onClick={submitHandler}>ورود</button>
            <button onClick={() => setStep(1)} className={styles.backButton}>تغییر شمارۀ موبایل</button>
        </form>
    )
}

export default CheckOtpForm