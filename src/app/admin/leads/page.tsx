'use client'

import { Lead } from "@prisma/client"
import { useEffect, useState } from "react"
import { IoCheckboxOutline, IoTrash } from "react-icons/io5";


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

    const renderLeadList = leadList.map((lead) =>
        <li key={lead.id} className="list-row flex">
            <div className="w-[45%] border-r-2 border-neutral-400">
                <div>{lead.name}</div>
                <div className="text-md font-semibold opacity-60">{lead.email} - {lead.phone}</div>
            </div>
            <div className="w-[45%]">
                <div>{lead.city} - {lead.state.toUpperCase()}</div>
                <div className="text-md font-semibold opacity-60">Fatura: R${Number(lead.billValue).toFixed(2)}</div>
            </div>
            <div className="w-[10%] flex justify-end">
                <button className="btn btn-square btn-ghost">
                    <IoCheckboxOutline size={25}></IoCheckboxOutline>
                </button>
                <button onClick={() => { handleDelete(lead.id) }} className="btn btn-square btn-ghost hover:text-red-500">
                    <IoTrash size={25}></IoTrash>
                </button>
            </div>
        </li>
    );

    return (
        <div className="w-2/3">
            <ul className="h-full list bg-base-100 rounded-box shadow-md flex items-center">
                <div className="w-full items-start"><h1 className="mt-4 ml-4 text-2xl">Leads</h1></div>
                {leadList.length > 0 ?
                    <div className="w-full items-start">{renderLeadList}</div>
                :
                (
                    <h1 className="justify-center ">Nenhum lead cadastrado</h1>
                )}

            </ul>
        </div>
    )
}