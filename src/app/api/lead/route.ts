import prisma from "@/lib/prisma";
import { LeadInput, leadValidation } from "@/validation/leadValidation";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod/v4";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = leadValidation.parse(body)

    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        cpf: data.cpf,
        contacted: data.contacted,
        billValue: data.billValue,
        city: data.city,
        state: data.state,
        supplyType: data.supplyType,
      },
    });

    return new Response(JSON.stringify(lead), { status: 201 });
  } catch (error: unknown) {
    log(error)
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    return new Response("Internal Error", { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const data: LeadInput = leadValidation.parse(body)

    const lead = await prisma.lead.update({
      data: {
        contacted: data.contacted
      },
      where: {
        id: data.id
      }
    });

    return new Response(JSON.stringify(lead), { status: 201 });
  } catch (error: unknown) {
    log(error)
    if (error instanceof ZodError) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    return new Response("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const leadList = await prisma.lead.findMany({
      orderBy: [
        { contacted: "asc" },
        { createdAt: "desc" }
      ]
    })

    return NextResponse.json(leadList)
  } catch (error: unknown) {
    log(error)
    return NextResponse.json({ error: "Internal Error on search leads" }, { status: 500 });
  }
}
