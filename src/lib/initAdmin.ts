import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { log } from "console";
let adminCreated = false;

export async function ensureAdminExists() {
  if (adminCreated) return;

  const admPassword = process.env.ADMIN_PASSWORD;
  const admEmail = process.env.ADMIN_EMAIL;

  if(!admPassword){
    throw new Error("Env Variable ADMIN_PASSWORD not exists.")
  }
  if(!admEmail){
    throw new Error("Env Variable ADMIN_EMAIL not exists.")
  }

  const exists = await prisma.admin.findFirst({
    where: { email: admEmail },
  });

  if (!exists) {
    const password = await bcrypt.hash(admPassword, 10);
    await prisma.admin.create({
      data: {
        email: admEmail,
        password,
      },
    });
    log("Created Admin");
  }

  adminCreated = true;
}
