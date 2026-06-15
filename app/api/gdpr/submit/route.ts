import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, date, signature } = await req.json();

    if (!name || !signature) {
      return NextResponse.json({ error: "Date lipsă" }, { status: 400 });
    }

    // Generate PDF
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 420]);
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const { width, height } = page.getSize();

    // Background
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(1, 1, 1) });

    // Header bar
    page.drawRectangle({ x: 0, y: height - 60, width, height: 60, color: rgb(0.07, 0.07, 0.07) });
    page.drawText("ACORD GDPR – VIBEINVITE.RO", {
      x: 40, y: height - 38, size: 16, font: fontBold, color: rgb(1, 1, 1),
    });
    page.drawText("Proiect Pilot · Consimțământ Digital", {
      x: 40, y: height - 52, size: 8, font, color: rgb(0.7, 0.7, 0.7),
    });

    // Fields
    const labelX = 40;
    const valueX = 200;

    const drawRow = (label: string, value: string, y: number) => {
      page.drawText(label, { x: labelX, y, size: 9, font, color: rgb(0.5, 0.5, 0.5) });
      page.drawText(value, { x: valueX, y, size: 9, font: fontBold, color: rgb(0.1, 0.1, 0.1) });
    };

    drawRow("Nume / Denumire firmă:", name, height - 100);
    drawRow("Data semnării:", date, height - 120);
    drawRow("Timestamp UTC:", new Date().toISOString(), height - 140);
    drawRow("Consimțământ GDPR:", "Acordat explicit prin semnătură digitală", height - 160);
    drawRow("Publicare VibeInvite.ro:", "Acordată", height - 180);
    drawRow("Indexare Google:", "Acordată", height - 200);

    // Divider
    page.drawLine({
      start: { x: labelX, y: height - 215 },
      end: { x: width - 40, y: height - 215 },
      thickness: 0.5,
      color: rgb(0.85, 0.85, 0.85),
    });

    // Signature label
    page.drawText("Semnătură digitală:", {
      x: labelX, y: height - 235, size: 9, font, color: rgb(0.5, 0.5, 0.5),
    });

    // Embed signature image
    const base64Data = signature.replace(/^data:image\/png;base64,/, "");
    const pngBytes = Buffer.from(base64Data, "base64");
    const pngImage = await pdfDoc.embedPng(pngBytes);
    page.drawImage(pngImage, { x: labelX, y: height - 340, width: 220, height: 90 });

    // Signature line
    page.drawLine({
      start: { x: labelX, y: height - 345 },
      end: { x: labelX + 220, y: height - 345 },
      thickness: 0.5,
      color: rgb(0.3, 0.3, 0.3),
    });
    page.drawText(name, { x: labelX, y: height - 358, size: 8, font, color: rgb(0.4, 0.4, 0.4) });

    // Footer
    page.drawRectangle({ x: 0, y: 0, width, height: 30, color: rgb(0.97, 0.97, 0.97) });
    page.drawText("VibeInvite.ro · office@vibeinvite.ro · Document generat automat cu semnătură digitală", {
      x: 40, y: 10, size: 7, font, color: rgb(0.6, 0.6, 0.6),
    });

    const pdfBytes = await pdfDoc.save();

    await resend.emails.send({
      from: "Vibe Invite <office@vibeinvite.ro>",
      to: ["office@vibeinvite.ro"],
      subject: `GDPR Consent - ${name} - ${date}`,
      html: `<p>Acord GDPR semnat digital de <strong>${name}</strong> în data de <strong>${date}</strong>.</p><p>PDF-ul este atașat.</p>`,
      attachments: [
        {
          filename: `GDPR_${name.replace(/\s+/g, "_")}_${date.replace(/\./g, "-")}.pdf`,
          content: Buffer.from(pdfBytes).toString("base64"),
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Eroare server" }, { status: 500 });
  }
}