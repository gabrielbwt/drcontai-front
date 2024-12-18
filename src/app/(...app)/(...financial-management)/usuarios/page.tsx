"use client"
import UserLine from "@/components/(...app)/usuarios/userLine";
import { useState } from "react";
// import dayjs from "dayjs";
import { useGetUsers } from "@/services/hooks/users";
import { TypeUser } from "@/@types/user";

export default function Users() {

    const { data, isLoading: isLoadingGetUsers } = useGetUsers();

    const users = data?.users || [];

    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    // const [sortField, setSortField] = useState("");
    const itemsPerPage = 12;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const totalPages = Math.ceil(users.length / itemsPerPage);

    const filteredUsers = users.filter(
        (user: TypeUser) =>
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.cpf.includes(search) ||
            user.defaultContactInfo?.email.includes(search) ||
            user.defaultContactInfo?.phoneNumber.includes(search)
    );

    // const sortedUsers = [...filteredUsers].sort((a, b) => {
    //     if (!sortField) return 0;

    //     if (sortField === "name") return a.name.localeCompare(b.name);

    //     if (sortField === "updatedAt") {
    //         return dayjs(b.updatedAt).diff(dayjs(a.updatedAt));
    //     }

    //     const cleanValue = (value: string) =>
    //         parseFloat(value.replace("R$ ", "").replace(".", "").replace(",", "."));

    //     const aValue = cleanValue(a[sortField as keyof typeof a] as string);
    //     const bValue = cleanValue(b[sortField as keyof typeof b] as string);
    //     return bValue - aValue;
    // });

    const currentUsers = filteredUsers.slice(startIndex, endIndex);



    return (
        <div className="pt-[2rem] h-auto min-h-[calc(100vh-3.5rem)] bg-soft-white-main gap-[2rem] px-[2rem] max-xl:flex-col max-xl:pt-[2rem] max-xl:justify-start max-xl:items-center">
            <div className="mb-4 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold font-sans text-gray-800">Usuários</h1>
                    <p className="text-xs text-gray-500">Lista dos usuários integrados a Pluggy</p>
                </div>
            </div>
            <div className="w-full">
                <div className="text-xs flex">
                    <div className="flex-1 mb-4">
                        <input
                            type="text"
                            placeholder="Busque por Nome, CPF, Email ou Telefone."
                            className="p-2 border border-gray-300 rounded-md w-1/3 placeholder:text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    {/* <div>
                        <select
                            className="p-2 border border-gray-300 rounded-md placeholder:text-sm"
                            value={sortField}
                            onChange={(e) => setSortField(e.target.value)}
                        >
                            <option value="">Ordenar por</option>
                            <option value="name">Ordem Alfabética (Nome)</option>
                            <option value="balance">Saldo Bancário</option>
                            <option value="creditCardBill">Fatura</option>
                            <option value="totalInvested">Total Investido</option>
                            <option value="updatedAt">Última Atualização</option>
                        </select>
                    </div> */}

                </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm border mt-8 pb-6">
                <div className="grid grid-cols-6 gap-4 p-4 rounded-t-lg font-semibold text-sm text-dark-green-main mx-4 border-b-[1px]">
                    <div className="flex items-center justify-center">Nome</div>
                    <div className="flex items-center justify-center">CPF</div>
                    <div className="flex items-center justify-center">Telefone</div>
                    <div className="flex items-center justify-center">Email</div>
                    <div className="flex items-center justify-center">Criado em</div>
                    <div className="flex items-center justify-center">Mentoria</div>
                </div>
                <div>
                    {Array.from({ length: itemsPerPage }).map((_, index) => {
                        const user = currentUsers[index];
                        const key = user ? user.id : `user-${index}`;

                        return (
                            <UserLine
                                isLoading={isLoadingGetUsers}
                                key={key}
                                user={user}
                                index={index}
                            />
                        );
                    })}
                </div>
                <div className="flex justify-center space-x-4 mt-6 items-center">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        Anterior
                    </button>
                    <span className="text-gray-600">
                        Página {currentPage} de {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 disabled:opacity-50"
                    >
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    );
}
