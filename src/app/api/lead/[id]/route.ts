import prisma from "@/lib/prisma";
import { log } from "console";
import { NextResponse } from "next/server";

type Params = {
  params: { id: string };
};

export async function DELETE(req: Request,{params}:Params) {
  try {
    await prisma.lead.delete({where:{id:params.id}})
    return NextResponse.json({}, {status:200})
  } catch (error: unknown) {
    log(error)
    return NextResponse.json({ error: "Internal Error on delete leads." }, { status: 500 });
  }
}
