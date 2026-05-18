import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(req: Request) {
  const body = await req.json();
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
  }
  // TODO: wire up email/CRM here
  return NextResponse.json({ ok: true });
}
