import Image from 'next/image';
import DrLogo from '../../assets/images/dr_logo.png'
import Input from '../input/Input';
import DoctorImage from '../../assets/svg/doctor-main-dark.svg'

export default function LoginApp() {
    return (
        < section className="flex lg:h-screen lg:items-center max-lg:flex-col" >

            <div className="max-lg:h-[15rem] w-full lg:h-full lg:w-fit flex items-center justify-center bg-primary-main/70">
                <div className='w-[50vw] flex items-center justify-center'>
                    <Image priority src={DoctorImage} alt="Logo da Dr. Contaí" width={500} height={500} style={{ width: '46rem', height: 'auto', margin: '0 auto' }} />
                </div>

            </div>

            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:min-w-[50vw] lg:px-8 lg:py-24">
                <div className='w-fit mb-2 mx-auto'>
                    <Image priority src={DrLogo} alt="Logo da Dr. Contaí" width={500} height={500} style={{ width: '13rem', height: 'auto', margin: '0 auto' }} />
                </div>
                <div className="mx-auto max-w-lg text-center">

                    <h1 className="text-2xl font-bold sm:text-3xl pb-4">Bem-vindo(a) de volta!</h1>
                    <p className="mt-4 text-gray-500">
                        Simplifique seu atendimento e concentre-se no que importa: o cuidado com seus pacientes.
                    </p>
                </div>

                <form className="mx-auto mb-0 mt-8 max-w-md space-y-4">

                    <div className="col-span-6">
                        <Input id="email" placeholder="Email" />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <Input id="password" placeholder='Senha' type="password" />
                    </div>

                    <div className="flex items-center justify-end">
                        <a

                            className="flex items-center justify-center rounded-lg bg-primary-main px-5 h-9 text-sm font-medium font-sans text-white"
                            href="/home"
                        >
                            Login
                        </a>
                    </div>
                </form>
            </div>


        </section >
    )
}