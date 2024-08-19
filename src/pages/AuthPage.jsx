import { useState } from 'react'

import SendOtpForm from 'components/templates/SendOtpForm'
import CheckOtpForm from 'components/templates/CheckOtpForm'

function AuthPage() {

    const [step, setStep] = useState(1)

    const [phoneNumber, setPhoneNumber] = useState("")
    const [code, setCode] = useState("")

    return (
        <div>
            {step === 1 && <SendOtpForm setStep={setStep} phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} />}
            {step === 2 && <CheckOtpForm code={code} setCode={setCode} setStep={setStep} phoneNumber={phoneNumber} />}
            
        </div>
    )
}

export default AuthPage