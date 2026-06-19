"use client";

import { useRef, useState, useEffect } from "react";

export default function PilotConsentPage() {
  const [nume, setNume] = useState("");
  const [prenume, setPrenume] = useState("");
  const [telefon, setTelefon] = useState("");
  const [email, setEmail] = useState("");
  const [agreed1, setAgreed1] = useState(false);
  const [agreed2, setAgreed2] = useState(false);
  const [agreed3, setAgreed3] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const lastPos = useRef<{ x: number; y: number } | null>(null);

  const fieldInvalid = (val: string) => submitted && !val.trim();
  const checkInvalid = (val: boolean) => submitted && !val;
  const sigInvalid = submitted && isSignatureEmpty();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawing.current = true;
    lastPos.current = getPos(e);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing.current || !lastPos.current) return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = "#0f172a";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
    lastPos.current = pos;
  };

  const endDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    isDrawing.current = false;
    lastPos.current = null;
  };

  const clearSignature = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  function isSignatureEmpty() {
    const canvas = canvasRef.current;
    if (!canvas) return true;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) return false;
    }
    return true;
  }

  const allValid = () =>
    prenume.trim() && nume.trim() && email.trim() && telefon.trim() &&
    agreed1 && agreed2 && agreed3 && !isSignatureEmpty();

  const handleSubmit = async () => {
    setSubmitted(true);
    if (!allValid()) return;
    setLoading(true);

    try {
      const signatureDataUrl = canvasRef.current!.toDataURL("image/png");
      const dateStr = new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
      const dateTimeStr = new Date().toISOString();

      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
      const W = 210;
      const M = 20;
      const CW = W - M * 2;
      let y = 0;

      const ln = (h = 5) => { y += h; };

      const txt = (text: string, size = 10, style: "normal" | "bold" = "normal", align: "left" | "center" = "left", hex = "#1a1a1a") => {
        doc.setFontSize(size);
        doc.setFont("helvetica", style);
        doc.setTextColor(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
        const lines: string[] = doc.splitTextToSize(text, CW);
        doc.text(lines, align === "center" ? W / 2 : M, y, { align });
        y += lines.length * size * 0.42 + 1.5;
      };

      const rule = () => {
        doc.setDrawColor(180, 180, 180);
        doc.setLineWidth(0.25);
        doc.line(M, y, W - M, y);
        ln(4);
      };

      const band = (fy: number, fh: number, hex: string) => {
        doc.setFillColor(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
        doc.rect(0, fy, W, fh, "F");
      };

      band(0, 35, "#0f172a");
      y = 10;
      txt("ACORD DE COLABORARE SI CONSIMTAMANT GDPR", 13, "bold", "center", "#ffffff");
      ln(3);
      txt("Proiect Pilot Marketplace VibeInvite  |  www.vibeinvite.ro", 8, "normal", "center", "#94a3b8");
      y = 40; ln(6);

      txt("PARTILE ACORDULUI", 8, "bold", "left", "#888888");
      ln(1); rule();
      txt("OPERATOR — Prestator servicii tehnice de publicare:", 9, "bold");
      ln(1);
      txt("MURGU ADRIAN PERSOANA FIZICA AUTORIZATA", 10, "bold");
      txt("Sediu: Aleea Parcului nr. 7, et. 9, Ap. 1, Municipiul Onesti, Judetul Bacau, Romania");
      txt("Platforma: www.vibeinvite.ro   |   Contact: office@vibeinvite.ro");
      ln(4);
      txt("FURNIZOR — Persoana care transmite materialele:", 9, "bold");
      ln(1);
      txt(`${prenume} ${nume}`, 10, "bold");
      txt(`Email: ${email}   |   Telefon: ${telefon}`);
      txt(`Data semnarii: ${dateStr}`);
      ln(6);

      const art = (nr: string, title: string) => {
        txt(`${nr} — ${title}`.toUpperCase(), 8, "bold", "left", "#888888");
        ln(1); rule();
      };

      art("ART. 1", "Obiectul acordului");
      txt("Prezentul acord reglementeaza termenii in care Furnizorul autorizeaza Operatorul sa prelucreze si sa publice materialele fotografice, video si/sau textuale transmise in mod voluntar, exclusiv in scopul crearii si afisarii unei pagini de prezentare in cadrul marketplace-ului vibeinvite.ro, pe durata proiectului pilot (pana in august 2026).");
      ln(6);

      art("ART. 2", "Declaratiile si asumarile furnizorului");
      const a2 = [
        "Declar pe propria raspundere ca detin toate drepturile legale asupra tuturor materialelor transmise si am capacitate legala deplina de a le pune la dispozitia Operatorului.",
        "Declar ca materialele transmise nu incalca drepturile de proprietate intelectuala ale tertilor si nu contin date personale ale altor persoane fara acordul expres al acestora.",
        "Imi asum in totalitate raspunderea juridica civila si penala pentru continutul materialelor furnizate. Operatorul MURGU ADRIAN PFA este exonerat de orice raspundere privind legalitatea continutului transmis.",
        "Inteleg ca activitatea paginii mele va fi inregistrata anonim, exclusiv in scopuri statistice interne, fara a fi comercializata sau transmisa tertilor.",
        "Inteleg ca proiectul are caracter pilot pana in august 2026 si ca materialele vor fi sterse la cererea mea scrisa sau la finalul perioadei.",
        "Confirm ca am varsta minima de 18 ani si capacitate juridica deplina de a incheia prezentul acord.",
      ];
      for (const item of a2) { txt(`• ${item}`); ln(2); }
      ln(4);

      art("ART. 3", "Obligatiile operatorului");
      const a3 = [
        "Utilizeaza materialele exclusiv in scopul declarat: crearea paginii de prezentare pe vibeinvite.ro.",
        "Nu vinde, inchiriaza, cedeaza sau transfera materialele Furnizorului catre terti.",
        "Sterge materialele la cererea scrisa a Furnizorului (office@vibeinvite.ro) in maximum 30 de zile lucratoare.",
        "Implementeaza masuri tehnice rezonabile pentru protejarea materialelor impotriva accesului neautorizat.",
      ];
      for (const item of a3) { txt(`• ${item}`); ln(2); }
      ln(4);

      art("ART. 4", "Drepturile furnizorului conform GDPR — Reg. UE 2016/679");
      txt("In calitate de persoana vizata, beneficiezi de: dreptul de acces, dreptul la rectificare, dreptul la stergere (dreptul de a fi uitat), dreptul la restrictionarea prelucrarii, dreptul la portabilitate, dreptul de opozitie. Solicitarile se transmit la office@vibeinvite.ro. Ai dreptul sa depui plangere la ANSPDCP, B-dul G-ral Gheorghe Magheru 28-30, Sector 1, Bucuresti.");
      ln(6);

      art("ART. 5", "Limitarea raspunderii operatorului");
      txt("MURGU ADRIAN PFA actioneaza exclusiv ca prestator de servicii tehnice de publicare si nu isi asuma nicio raspundere pentru: (i) drepturile de proprietate intelectuala ale continutului transmis de Furnizor; (ii) pretentiile oricaror terti legate de materialele furnizate; (iii) rezultatele comerciale obtinute de Furnizor prin pagina de prezentare; (iv) erorile sau inexactitatile din continutul furnizat.");
      ln(6);

      art("ART. 6", "Dispozitii finale");
      txt("Prezentul acord este guvernat de legislatia romana, inclusiv Regulamentul (UE) 2016/679 (GDPR) si Legea nr. 190/2018. Orice litigiu va fi solutionat pe cale amiabila, iar in caz de esec, de instantele judecatoresti competente din Romania.");
      ln(8);

      txt("SEMNATURA FURNIZORULUI", 8, "bold", "left", "#888888");
      ln(1); rule();
      txt(`${prenume} ${nume}`, 11, "bold");
      txt(`Data: ${dateStr}`);
      ln(4);

      const sigY = y;
      band(sigY - 2, 38, "#f8fafc");
      doc.addImage(signatureDataUrl, "PNG", M, sigY, 80, 32);
      y = sigY + 38;
      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(0.4);
      doc.line(M, y, M + 80, y);
      ln(3);
      txt(`${prenume} ${nume}  —  Semnatura olografa digitala`, 8, "normal", "left", "#666666");
      ln(10);

      band(y, 16, "#0f172a");
      const fy = y + 6;
      doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(148, 163, 184);
      doc.text("Document generat automat  |  vibeinvite.ro  |  office@vibeinvite.ro  |  Proiect Pilot 2025-2026", W / 2, fy, { align: "center" });
      doc.text(`ID: ${dateTimeStr.replace(/[:.]/g, "-")}`, W / 2, fy + 5, { align: "center" });

      const pdfBlob = doc.output("blob");
      const filename = `${prenume.replace(/\s+/g, "-")}-${nume.replace(/\s+/g, "-")}-${dateTimeStr.slice(0, 10)}.pdf`.toLowerCase();
      const fd = new FormData();
      fd.append("file", pdfBlob, filename);
      fd.append("filename", filename);

      const res = await fetch("/api/pilot/upload-consent", { method: "POST", body: fd });
      if (!res.ok) throw new Error();
      setDone(true);
    } catch {
      // error handled via validation state
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f1f5f9] px-4 py-16">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xl p-10 max-w-sm w-full text-center">
          <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-6 ring-8 ring-emerald-50/40">
            <svg className="w-7 h-7 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">Acord înregistrat cu succes</h2>
          <p className="text-sm text-slate-500 leading-relaxed">Documentul semnat a fost arhivat în siguranță. Echipa VibeInvite te va contacta în curând.</p>
          <div className="mt-8 pt-6 border-t border-slate-100">
            <p className="text-xs text-slate-400 font-medium tracking-wide">office@vibeinvite.ro · www.vibeinvite.ro</p>
          </div>
        </div>
      </div>
    );
  }

  const inputCls = (val: string) =>
    `w-full border rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 bg-white transition-all focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 ${
      fieldInvalid(val)
        ? "border-red-400 bg-red-50/30 focus:ring-red-400/20 focus:border-red-500"
        : "border-slate-200 hover:border-slate-300"
    }`;

  const clauses = [
    {
      nr: "Art. 1",
      title: "Obiectul Acordului",
      body: "Prezentul acord reglementează termenii în care Furnizorul autorizează Operatorul să prelucreze și să publice materialele fotografice, video și/sau textuale transmise în mod voluntar, exclusiv în scopul creării și afișării unei pagini de prezentare în cadrul marketplace-ului vibeinvite.ro, pe durata proiectului pilot (până în august 2026).",
    },
    {
      nr: "Art. 2",
      title: "Declarațiile și Asumarile Furnizorului",
      items: [
        "Declar pe propria răspundere că dețin toate drepturile legale (drepturi de autor, licențe, acorduri) asupra tuturor materialelor transmise și am capacitate legală deplină de a le pune la dispoziția Operatorului.",
        "Declar că materialele transmise nu încalcă drepturile de proprietate intelectuală ale terților și nu conțin date personale ale altor persoane fără acordul expres al acestora.",
        "Îmi asum în totalitate și exclusiv răspunderea juridică civilă și penală pentru conținutul materialelor furnizate. Operatorul MURGU ADRIAN PFA este exonerat complet de orice răspundere privind legalitatea conținutului transmis.",
        "Înțeleg că activitatea paginii mele (vizualizări, click-uri contact, click-uri social media) va fi înregistrată anonim, exclusiv în scopuri statistice interne, fără a fi comercializată sau transmisă terților.",
        "Înțeleg că proiectul are caracter pilot până în august 2026 și că materialele vor fi șterse la cererea mea scrisă sau la finalul perioadei.",
        "Confirm că am vârsta minimă de 18 ani și capacitate juridică deplină de a încheia prezentul acord.",
      ],
    },
    {
      nr: "Art. 3",
      title: "Obligațiile Operatorului",
      items: [
        "Utilizează materialele exclusiv în scopul declarat: crearea paginii de prezentare pe vibeinvite.ro.",
        "Nu vinde, închiriază, cedează sau transferă materialele Furnizorului către terți.",
        "Șterge materialele la cererea scrisă a Furnizorului (office@vibeinvite.ro) în maximum 30 de zile lucrătoare.",
        "Implementează măsuri tehnice rezonabile pentru protejarea materialelor împotriva accesului neautorizat.",
      ],
    },
    {
      nr: "Art. 4",
      title: "Drepturile Furnizorului — GDPR (Reg. UE 2016/679)",
      body: "În calitate de persoană vizată, beneficiezi de: dreptul de acces, dreptul la rectificare, dreptul la ștergere (dreptul de a fi uitat), dreptul la restricționarea prelucrării, dreptul la portabilitate și dreptul de opoziție. Solicitările se transmit la office@vibeinvite.ro. Ai dreptul să depui plângere la ANSPDCP, B-dul G-ral Gheorghe Magheru 28-30, Sector 1, București.",
    },
    {
      nr: "Art. 5",
      title: "Limitarea Răspunderii Operatorului",
      body: "MURGU ADRIAN PFA acționează exclusiv ca prestator de servicii tehnice de publicare și nu își asumă nicio răspundere pentru: (i) drepturile de proprietate intelectuală ale conținutului transmis de Furnizor; (ii) pretențiile oricăror terți legate de materialele furnizate; (iii) rezultatele comerciale obținute de Furnizor prin pagina de prezentare; (iv) erorile sau inexactitățile din conținutul furnizat.",
    },
    {
      nr: "Art. 6",
      title: "Dispoziții Finale",
      body: "Prezentul acord este guvernat de legislația română în vigoare, inclusiv Regulamentul (UE) 2016/679 (GDPR) și Legea nr. 190/2018. Orice litigiu va fi soluționat pe cale amiabilă, iar în caz de eșec, de instanțele judecătorești competente din România.",
    },
  ] as Array<{ nr: string; title: string; body?: string; items?: string[] }>;

  return (
    <div className="min-h-screen bg-[#eef2f7] py-8 md:py-14 px-4 sm:px-6 font-sans antialiased">
      <div className="max-w-3xl mx-auto space-y-0">

        {/* ── DOCUMENT SHEET ─────────────────────────────────────────── */}
        <div className="bg-white shadow-[0_4px_40px_rgba(0,0,0,0.10)] rounded-t-xl overflow-hidden">

          {/* Letterhead */}
          <div className="bg-[#0f172a] px-8 sm:px-12 py-8 sm:py-10">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.18em] text-slate-400 uppercase mb-2">Document Oficial · Proiect Pilot</p>
                <h1 className="text-white text-xl sm:text-2xl font-extrabold tracking-tight leading-snug">
                  Acord de Colaborare<br />
                  <span className="text-slate-300 font-medium text-base sm:text-lg">și Consimțământ privind Prelucrarea Datelor</span>
                </h1>
              </div>
              <div className="shrink-0 text-left sm:text-right">
                <p className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-1">Emis de</p>
                <p className="text-white font-black text-base tracking-tight">VibeInvite</p>
                <p className="text-slate-400 text-xs mt-0.5">www.vibeinvite.ro</p>
              </div>
            </div>

            {/* Meta band */}
            <div className="mt-7 pt-5 border-t border-slate-700/60 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <p className="text-slate-500 font-semibold uppercase tracking-widest text-[10px] mb-0.5">Tip document</p>
                <p className="text-slate-200 font-semibold">Acord bilateral</p>
              </div>
              <div>
                <p className="text-slate-500 font-semibold uppercase tracking-widest text-[10px] mb-0.5">Versiune</p>
                <p className="text-slate-200 font-semibold">v1.0 / 2025</p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-slate-500 font-semibold uppercase tracking-widest text-[10px] mb-0.5">Aplicabilitate</p>
                <p className="text-slate-200 font-semibold">Reg. UE 2016/679 · Legea 190/2018</p>
              </div>
            </div>
          </div>

          <div className="px-8 sm:px-12 py-10 space-y-10">

            {/* Parties */}
            <section>
              <SectionLabel>Părțile Acordului</SectionLabel>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-0 border border-slate-200 rounded-xl overflow-hidden text-sm">
                <div className="p-5 space-y-1.5 border-b md:border-b-0 md:border-r border-slate-200 bg-slate-50/50">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Operator</p>
                  <p className="font-bold text-slate-900">MURGU ADRIAN P.F.A.</p>
                  <p className="text-slate-500 text-xs leading-relaxed">Aleea Parcului nr. 7, et. 9, Ap. 1,<br />Municipiul Onești, Județul Bacău, România</p>
                  <p className="text-slate-500 text-xs">office@vibeinvite.ro · www.vibeinvite.ro</p>
                </div>
                <div className="p-5 space-y-1.5 bg-white">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Furnizor</p>
                  <p className="font-bold text-slate-900">
                    {prenume || nume ? `${prenume} ${nume}`.trim() : <span className="text-slate-300 font-normal italic">Se completează mai jos</span>}
                  </p>
                  <p className="text-slate-500 text-xs">{email || <span className="text-slate-300 italic">Email —</span>}</p>
                  <p className="text-slate-500 text-xs">{telefon || <span className="text-slate-300 italic">Telefon —</span>}</p>
                </div>
              </div>
            </section>

            {/* Clauses */}
            <section>
              <SectionLabel>Termeni și Condiții Contractuale</SectionLabel>
              <div className="mt-4 space-y-0 border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {clauses.map((a, idx) => (
                  <div key={idx} className="flex gap-0">
                    <div className="hidden sm:flex items-start justify-center w-16 shrink-0 bg-slate-50 border-r border-slate-100 pt-5 pb-5">
                      <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest writing-mode-vertical rotate-180" style={{ writingMode: "vertical-lr" }}>
                        {a.nr}
                      </span>
                    </div>
                    <div className="flex-1 p-5 sm:p-6 text-sm text-slate-600 leading-relaxed">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="sm:hidden text-[10px] font-black text-slate-400 uppercase tracking-wider">{a.nr} ·</span>
                        <h3 className="text-sm font-bold text-slate-900">{a.title}</h3>
                      </div>
                      {a.body && (
                        <p className="text-justify text-[13px] leading-[1.75]">{a.body}</p>
                      )}
                      {a.items && (
                        <ol className="space-y-2.5 mt-0.5">
                          {a.items.map((item, i) => (
                            <li key={i} className="flex gap-3 text-[13px] leading-[1.75]">
                              <span className="shrink-0 mt-[3px] w-5 h-5 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-[10px] font-black text-slate-400">{i + 1}</span>
                              <span className="text-justify">{item}</span>
                            </li>
                          ))}
                        </ol>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* ── SIGNING SECTION ────────────────────────────────────────── */}
        <div className="bg-white border-t-2 border-dashed border-slate-200 shadow-[0_4px_40px_rgba(0,0,0,0.07)] rounded-b-xl px-8 sm:px-12 py-10 space-y-8">

          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Secțiunea de Semnare</p>
            <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Validare și Semnătură Digitală</h2>
            <p className="text-sm text-slate-500 mt-1">Completează datele de identificare și semnează în spațiul dedicat pentru a valida acordul.</p>
          </div>

          {/* Fields */}
          <div>
            <SectionLabel>Date de Identificare</SectionLabel>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: "Prenume", val: prenume, set: setPrenume, placeholder: "ex: Alexandru", type: "text" },
                { label: "Nume", val: nume, set: setNume, placeholder: "ex: Popescu", type: "text" },
                { label: "Adresă de email", val: email, set: setEmail, placeholder: "ex: alex@studio.ro", type: "email" },
                { label: "Număr de telefon", val: telefon, set: setTelefon, placeholder: "ex: 07xx xxx xxx", type: "tel" },
              ].map(({ label, val, set, placeholder, type }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {label} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type={type}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    className={inputCls(val)}
                  />
                  {fieldInvalid(val) && (
                    <p className="text-[11px] text-red-500 mt-1 font-semibold">Câmp obligatoriu</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div>
            <SectionLabel>Confirmări Obligatorii</SectionLabel>
            <div className="mt-4 space-y-2.5">
              {[
                {
                  val: agreed1,
                  set: setAgreed1,
                  text: "Am citit, înțeles și sunt de acord cu toate clauzele prezentului Acord de Colaborare, inclusiv cu Art. 2 privind asumarile mele ca Furnizor.",
                },
                {
                  val: agreed2,
                  set: setAgreed2,
                  text: "Sunt de acord cu prelucrarea datelor mele cu caracter personal (nume, email, telefon) de către MURGU ADRIAN PFA în scopul gestionării acestui acord, conform Regulamentului (UE) 2016/679 (GDPR).",
                },
                {
                  val: agreed3,
                  set: setAgreed3,
                  text: "Confirm că toate informațiile completate sunt corecte, că am capacitate juridică deplină și că semnătura mea digitală are valoarea unei semnături olografe în contextul acestui acord.",
                },
              ].map(({ val, set, text }, i) => (
                <label
                  key={i}
                  className={`flex gap-3.5 items-start p-4 rounded-xl border cursor-pointer transition-all select-none text-sm ${
                    checkInvalid(val)
                      ? "border-red-300 bg-red-50/40"
                      : val
                      ? "border-slate-300 bg-slate-50/70"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40"
                  }`}
                >
                  <div className={`mt-[1px] w-4.5 h-4.5 shrink-0 rounded border-2 flex items-center justify-center transition-all ${val ? "bg-slate-900 border-slate-900" : "border-slate-300 bg-white"}`}>
                    {val && (
                      <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                    <input
                      type="checkbox"
                      checked={val}
                      onChange={(e) => set(e.target.checked)}
                      className="sr-only"
                    />
                  </div>
                  <span className={`text-[13px] leading-relaxed ${val ? "text-slate-700" : "text-slate-600"}`}>{text}</span>
                </label>
              ))}
              {submitted && (!agreed1 || !agreed2 || !agreed3) && (
                <div className="flex gap-2 items-start text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 font-semibold">
                  <svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Toate cele 3 confirmări sunt obligatorii pentru validarea acordului legal.
                </div>
              )}
            </div>
          </div>

          {/* Signature */}
          <div>
            <SectionLabel>Semnătură Olografă Digitală</SectionLabel>
            <div className={`mt-4 rounded-xl border-2 overflow-hidden transition-all ${sigInvalid ? "border-red-400" : "border-slate-200"}`}>
              <div className="flex items-center justify-between bg-slate-50 border-b border-slate-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Spațiu de semnătură</span>
                </div>
                <button
                  onClick={clearSignature}
                  type="button"
                  className="text-xs font-bold text-slate-500 hover:text-slate-700 bg-white border border-slate-200 hover:border-slate-300 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Șterge
                </button>
              </div>
              <div className="bg-[#fafafa] p-4">
                <div className="rounded-lg border border-slate-200 bg-white overflow-hidden relative">
                  <canvas
                    ref={canvasRef}
                    width={700}
                    height={160}
                    onPointerDown={startDraw}
                    onPointerMove={draw}
                    onPointerUp={endDraw}
                    onPointerLeave={endDraw}
                    onPointerCancel={endDraw}
                    className="w-full touch-none cursor-crosshair block"
                    style={{ height: "160px" }}
                  />
                  <div className="absolute bottom-3 left-4 right-4 border-b border-dashed border-slate-200 pointer-events-none" />
                  <p className="absolute bottom-1.5 left-4 text-[10px] text-slate-300 pointer-events-none select-none">Semnați deasupra liniei</p>
                </div>
              </div>
              {sigInvalid && (
                <div className="px-4 pb-3">
                  <p className="text-[11px] text-red-500 font-semibold">Semnătura este obligatorie.</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={loading}
              type="button"
              className="w-full bg-[#0f172a] hover:bg-[#1e293b] disabled:bg-slate-100 disabled:text-slate-300 text-white font-bold py-4 px-6 rounded-xl transition-all text-sm tracking-wide shadow-sm active:scale-[0.99] flex items-center justify-center gap-2.5"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white/70" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Se generează documentul PDF...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Semnez și Trimit Acordul Legal
                </>
              )}
            </button>
            <p className="text-center text-[11px] text-slate-400 mt-3 leading-relaxed">
              Prin trimiterea acestui formular confirmi că ai citit și ai înțeles toate clauzele de mai sus.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-6">
          <p className="text-[11px] text-slate-400">
            Document generat automat · Conform legislației române și normelor GDPR (Reg. UE 2016/679)
          </p>
          <p className="text-[11px] text-slate-400 mt-1">
            © {new Date().getFullYear()} MURGU ADRIAN P.F.A. · office@vibeinvite.ro
          </p>
        </div>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400 whitespace-nowrap">{children}</p>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}
