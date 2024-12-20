"use client"

import Image from 'next/image';
import LogoSelvia from '../../assets/images/logo_selvia.png'
import Input from '../input/Input';
import DoctorImage from '../../assets/svg/doctor-main-dark.svg'
import { useLogin } from '@/services/hooks/auth';
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react';
import { useToken } from '@/store/token';
import React from 'react';


export interface setInputProps {
    email: string
    password: string
}

export default function LoginApp() {

    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { setToken, setRefreshToken } = useToken()

    const body = {
        email,
        password
    }

    const { mutate, isLoading: isLoadingUseLogin } = useLogin(body)

    function handleLogin(e: FormEvent) {
        e.preventDefault()
        mutate(void 0, {
            onSuccess: (data) => {
                setToken(data.token)
                setRefreshToken(data.refresh_token)
                setIsLoading(false)
                router.push('/home')
            }
        })
    }

    const mainLoading = isLoading || isLoadingUseLogin

    return (
        < section className="flex lg:h-screen lg:items-center max-lg:flex-col" >

            <div className="max-lg:h-[15rem] w-full lg:h-full lg:w-fit flex items-center justify-center bg-vibrant-green-dark/70">
                <div className='w-[50vw] flex items-center justify-center'>
                    <Image priority src={DoctorImage} alt="Logo da Dr. Contaí" width={500} height={500} style={{ width: '46rem', height: 'auto', margin: '0 auto' }} />
                </div>
            </div>

            <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:min-w-[50vw] lg:px-8 lg:py-24">
                <div className='w-fit mb-2 mx-auto'>
                    <Image priority src={LogoSelvia} alt="Logo da Dr. Contaí" width={500} height={500} style={{ width: '13rem', height: 'auto', margin: '0 auto' }} />
                </div>
                <div className="mx-auto max-w-lg text-center">

                    <h1 className="text-2xl font-bold sm:text-3xl pb-4">Bem-vindo(a) de volta!</h1>
                    <p className="mt-4 text-gray-500">
                        Simplifique suas economias e concentre-se no que importa: o cuidado com seus pacientes.
                    </p>
                </div>

                <form onSubmit={(e) => handleLogin(e)} className="mx-auto mb-0 mt-8 max-w-md space-y-4">

                    <div className="col-span-6">
                        <Input id="email" placeholder="Email" setInput={setEmail} value={email} disabled={mainLoading} />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                        <Input id="password" placeholder='Senha' type="password" setInput={setPassword} value={password} disabled={mainLoading} />
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            className="flex items-center justify-center rounded-lg bg-vibrant-green-dark px-5 h-9 text-sm font-medium font-sans text-white disabled:bg-vibrant-green-dark disabled:cursor-not-allowed"
                            type='submit'
                            disabled={mainLoading}
                        >
                            {mainLoading ? <svg className="w-4 h-4 text-gray-300 animate-spin mr-2" viewBox="0 0 64 64" fill="none"
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                                <path
                                    d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
                                <path
                                    d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                                    stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-vibrant-green-dark">
                                </path>
                            </svg> : null}
                            {mainLoading ? 'Carregando...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </section >
    )
}
