'use client'

import { LogoutButton } from "@/components/LogoutButton";
import { Lead } from "@/interfaces/Lead";
import { useEffect, useState } from "react"
import { IoCheckbox, IoCheckboxOutline, IoTrash } from "react-icons/io5";


export default function LeadList() {

    const [leadList, setLeadList] = useState<Lead[]>([])

    useEffect(() => {
        refreshList()
    }, [])

    const refreshList = () => {
        fetch("/api/lead", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
            const leads = await response.json();
            setLeadList(leads)
        }).catch((err) => {
            setLeadList([])
            console.log("Error on refresh list", err)
        })
    }

    const handleDelete = (id: string) => {
        fetch("/api/lead/" + id, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
            if (response.ok) {
                refreshList()
            } else {
                console.log("Error on delete lead", response.status)
            }
        }).catch((err) => {
            console.log("Error on delete lead", err)
        })
    }

    const handleUpdate = (lead: Lead) => {
        lead.contacted = !lead.contacted
        fetch("/api/lead", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(lead)
        }).then(async (response) => {
            if (response.ok) {
                refreshList()
            } else {
                console.log("Error on update lead", response.status)
            }
        }).catch((err) => {
            console.log("Error on update lead", err)
        })
    }

    const renderLeadList = leadList.map((lead) =>
        <li key={lead.id} className="list-row flex">
            <div className="w-[45%] border-r-2 border-neutral-400">
                <div>{lead.name} - {lead.cpf}</div>
                <div className="text-md font-semibold opacity-60">{lead.email} - {lead.phone}</div>
            </div>
            <div className="w-[45%] px-10">
                <div>{lead.city} - {lead.state.toUpperCase()}</div>
                <div className="text-md font-semibold opacity-60">Fatura: R${Number(lead.billValue).toFixed(2)}</div>
            </div>
            <div className="w-[10%] flex justify-end">
                <button data-tip="Contatado" className="btn btn-square btn-ghost tooltip tooltip-top" onClick={() => handleUpdate(lead)}>
                    {lead.contacted ? (<IoCheckbox size={25}></IoCheckbox>) : (<IoCheckboxOutline size={25}></IoCheckboxOutline>)}
                </button>
                <button onClick={() => { handleDelete(lead.id) }} className="btn btn-square btn-ghost hover:text-red-500">
                    <IoTrash size={25}></IoTrash>
                </button>
            </div>
        </li>
    );
    return (
        <div className="w-2/3  h-[600px] overflow-hidden">
            <div>
                <LogoutButton />
            </div>
            <ul className="bg-base-100 rounded-box shadow-md overflow-y-auto h-[500px] space-y-8 p-4 flex-col justify-between">
                {leadList.length > 0 ? (
                    renderLeadList
                ) : (
                    <li className="text-center">Nenhum lead cadastrado</li>
                )}
            </ul>
        </div>
    );

}