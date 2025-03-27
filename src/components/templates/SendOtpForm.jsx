import { useEffect, useRef, useState } from 'react';

import { sendOtp } from '@/services/auth';

import { p2e } from '@/utils/numbers';
import toast from 'react-hot-toast';

import styles from '@/components/templates/SendOtpForm.module.css';

function SendOtpForm({ setStep, phoneNumber, setPhoneNumber }) {

  const [isSending, setIsSending] = useState(false)

  const buttonRef = useRef()
  const inputRef = useRef()

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

  const submitHandler = async (event) => {
    event.preventDefault();

    setIsSending(true)

    const number = phoneNumber;
    const regex = /^(?:\+98|0098|0|98)?9\d{9}$/;
    const isValid = regex.test(number);

    if (!isValid) {
      toast.error("شماره موبایل نامعتبر می باشد!", {
        position: "top-left"
      });
      setIsSending(false)
      return
    }

    const { response, error } = await sendOtp(p2e(phoneNumber));

    if (error) {
      console.log(error.response.data.message);
    }

    if (response) {
      setStep(2)
    };
    setIsLoading(false)
  };

  return (

    <form className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span >
        برای استفاده از امکانات دیوار، لطفا شمارۀ موبایل خود را وارد کنید. کد تأیید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor='input' >
        شماره موبایل خود را وارد نمایید:
      </label>
      <input
        type='text'
        id='input'
        placeholder='شماره موبایل'
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        ref={inputRef}
      />
      <button type='submit' onClick={submitHandler} disabled={isSending} ref={buttonRef}>
        {isSending ? "در حال پردازش..." : "ارسال کد تأیید"}
      </button>
      <div className={styles.formFooter}>
        <span>نیاز به کمک دارید؟</span> <a href='#'>تماس با پشتیبانی</a>
      </div>
    </form>

  );
}

export default SendOtpForm;
