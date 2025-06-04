import prisma from "@/lib/prisma";
import { log } from "console";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

//Em Api não estou acostumado passar parametros na URL como search params 
//SearchParams acabo usando mais pra filtro, já delete é na rota
//Mas ao mesmo tempo queria poder passar dados mais complexos

export async function DELETE(req: Request,{params}:Params) {
  try {
    await prisma.lead.delete({where:{id:params.id}})
    return NextResponse.json({}, {status:200})
  } catch (error: unknown) {
    log(error)
    return NextResponse.json({ error: "Internal Error on delete leads." }, { status: 500 });
  }
}
