import { Button } from 'primereact/button'
import { FloatLabel } from 'primereact/floatlabel'
import { InputText } from 'primereact/inputtext'


const SignUpPage = () => {


    return (
        <div className="card justify-center items-center h-130">
            <div className='flex flex-col justify-center items-center gap-7 h-full  '>
                <h3>Kayıt Ol</h3>
                <FloatLabel>
                    <InputText id="username" />
                    <label htmlFor="username">username</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="username" />
                    <label htmlFor="e-mail">e-mail</label>
                </FloatLabel>
                <FloatLabel>
                    <InputText id="username" />
                    <label htmlFor="password">password</label>
                </FloatLabel>
                <Button
                    label="Giriş Yap"
                />
            </div>
        </div>
    )
}

export default SignUpPage