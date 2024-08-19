import React, { useState } from 'react';
import { sendOtp } from 'services/auth';

import styles from 'components/templates/SendOtpForm.module.css';
import { p2e } from 'src/utils/numbers';
import toast from 'react-hot-toast';

function SendOtpForm({ setStep, phoneNumber, setPhoneNumber }) {

  const [isSending, setIsSending] = useState(false)

  const submitHandler = async (event) => {
    event.preventDefault();

    const number = phoneNumber;
    const regex = /^(?:\+98|0098|0|98)?9\d{9}$/;
    const isValid = regex.test(number);

    if (!isValid) {
      toast.error("شماره موبایل نامعتبر می باشد!", {
        position:"top-left"
    });
      return
    }

    const { response, error } = await sendOtp(p2e(phoneNumber));

    // console.log(response)

    if (error) console.log(error.response.data.message);

    if (response) {
      setIsSending(true)
      setStep(2)
    };
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

      />
      <button type='submit' onClick={submitHandler} disabled={isSending}>
        ارسال کد تأیید
      </button>
      <div className={styles.formFooter}>
        <span>نیاز به کمک دارید؟</span> <a href='#'>تماس با پشتیبانی</a>
      </div>
    </form>

  );
}

export default SendOtpForm;
