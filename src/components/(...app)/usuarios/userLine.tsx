import { TypeUser } from "@/@types/user";
import { useMedic } from "@/store/medic";
import { useRouter } from "next/navigation";
import { truncateString } from "@/utils";
import dayjs from "dayjs";

interface userLineProps {
    user: TypeUser
    index: number;
    isLoading: boolean;
}

export default function UserLine({ user, index, isLoading }: userLineProps) {

    const router = useRouter()

    const hasUser = user?.name ? true : false;

    const date = dayjs(user?.createdAt).format("DD/MM/YYYY");

    const { setMedic } = useMedic()

    function redirectToUser() {
        setMedic({ name: user.name, cpf: user.cpf, id: user.id })
        router.push(`/usuarios/${user.id}`)
    }

    if (isLoading) {
        return (
            <div
                key={index}
                className={`grid grid-cols-6 gap-4 p-4 bg-white text-gray-900 text-sm cursor-pointer hover:bg-gray-200/50 h-14 place-items-center border-b-[1px] mx-4`}
            >
                <div className="font-medium flex items-center justify-center text-sm text-dark-green-main">
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-48 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-24 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
                <div className="text-sm flex items-center justify-center text-dark-green-main">
                    <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                </div>
            </div>
        )
    }

    else if (!hasUser) {
        return (
            <div
                key={`empty-${index}`}
                className={`grid grid-cols-6 gap-4 p-4 bg-white text-gray-900 text-sm hover:bg-gray-200/50 h-14 place-items-center  border-b-[1px] mx-4 cursor-not-allowed`
                }
            >
                <div className="font-medium text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
                <div className="text-sm"></div>
            </div >
        )
    }

    return (

        <div
            key={user.id}
            onClick={redirectToUser}
            className={`grid grid-cols-6 gap-4 p-4 bg-white text-gray-900 text-sm cursor-pointer hover:bg-gray-200/50 h-14 place-items-center  border-b-[1px] mx-4`
            }
        >
            <div className="font-medium flex items-center justify-center text-sm text-dark-green-main">{truncateString(user.name, 40)}</div>
            <div className="text-sm flex items-center justify-center text-dark-green-main">{user.cpf}</div>
            <div className="text-sm flex items-center justify-center text-dark-green-main">{user.defaultContactInfo?.phoneNumber}</div>
            <div className="text-sm flex items-center justify-center text-dark-green-main">{user.defaultContactInfo?.email}</div>
            <div className="text-sm flex items-center justify-center text-dark-green-main">{date}</div>
            <div className="text-sm flex items-center justify-center text-dark-green-main">{user.mentoring}</div>
        </div >


    )
}


