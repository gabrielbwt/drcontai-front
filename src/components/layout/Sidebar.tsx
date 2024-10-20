import { usePathname } from "next/navigation";
import Image from 'next/image';
import DrLogo from '../../assets/images/dr_logo.png'
import dashboardSVG from '../../assets/svg/icons/dashboard.svg';
import transactionsSVG from '../../assets/svg/icons/transactions.svg';

interface SideBarProps {
    showSidebar: boolean;
}


export default function Sidebar({ showSidebar }: SideBarProps) {

    const router = usePathname();

    return (
        <>
            <div
                className={`fixed top-0 left-0 h-full w-[16rem] bg-white border-r text-white transform ${showSidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out min-[1110px]:translate-x-0 z-50`}>
                <div className="relative flex flex-col h-full max-h-full">
                    <div className="px-6 pt-4 items-center justify-center my-4">
                        <Image priority src={DrLogo} alt="Logo da Contabiliza Dr" width={500} height={500} style={{ width: '10rem', height: 'auto', margin: '0 auto' }} />
                        <div className="bg-gray-100 rounded-md w-auto h-24 mt-8 flex items-center justify-start">
                            <div className="rounded-full bg-primary-main w-10 h-10 text-white flex items-center justify-center text-xl font-bold ml-6">
                                J
                            </div>
                            <div className="text-black flex flex-col gap-[0.1rem] ml-4">
                                <div className="font-extrabold text-sm">Dr João</div>
                                <div className="text-sm text-gray-600">joão@gmail.com</div>
                                <div className="text-sm text-gray-600">Pediatra</div>
                            </div>
                        </div>
                    </div>

                    <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300  ">

                        <nav className="hs-accordion-group p-3 w-full flex flex-col flex-wrap" data-hs-accordion-always-open>

                            <ul className="flex flex-col space-y-1">
                                <li>
                                    <a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg  focus:outline-none ${router === '/home' ? 'bg-primary-main/15 bg-opacity-20' : 'hover:bg-gray-100'} focus:bg-gray-100`} href="/home">
                                        <Image priority src={dashboardSVG} alt="Dashboard SVG" width={500} height={500} style={{ width: '1.3rem', height: 'auto' }} />Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a className={`flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg  focus:outline-none ${router === '/transacoes' ? 'bg-primary-main bg-opacity-20' : 'hover:bg-gray-100'} focus:bg-gray-100`} href="/transacoes">
                                        <Image priority src={transactionsSVG} alt="Transactions SVG" width={500} height={500} style={{ width: '1.3rem', height: 'auto' }} />Transações
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </>
    )
}