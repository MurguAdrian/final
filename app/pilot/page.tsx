// // app/pilot/page.tsx
// "use client";

// import { useRef, useState, useEffect } from "react";

// export default function PilotConsentPage() {
//   const [nume, setNume] = useState("");
//   const [prenume, setPrenume] = useState("");
//   const [telefon, setTelefon] = useState("");
//   const [email, setEmail] = useState("");
//   const [agreed1, setAgreed1] = useState(false);
//   const [agreed2, setAgreed2] = useState(false);
//   const [agreed3, setAgreed3] = useState(false);
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [done, setDone] = useState(false);
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const isDrawing = useRef(false);
//   const lastPos = useRef<{ x: number; y: number } | null>(null);

//   const fieldInvalid = (val: string) => submitted && !val.trim();
//   const checkInvalid = (val: boolean) => submitted && !val;
//   const sigInvalid = submitted && isSignatureEmpty();

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d")!;
//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//   }, []);

//   const getPos = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     const canvas = canvasRef.current!;
//     const rect = canvas.getBoundingClientRect();
//     return {
//       x: (e.clientX - rect.left) * (canvas.width / rect.width),
//       y: (e.clientY - rect.top) * (canvas.height / rect.height),
//     };
//   };

//   const startDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     e.preventDefault();
//     isDrawing.current = true;
//     lastPos.current = getPos(e);
//   };

//   const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     e.preventDefault();
//     if (!isDrawing.current || !lastPos.current) return;
//     const canvas = canvasRef.current!;
//     const ctx = canvas.getContext("2d")!;
//     const pos = getPos(e);
//     ctx.beginPath();
//     ctx.moveTo(lastPos.current.x, lastPos.current.y);
//     ctx.lineTo(pos.x, pos.y);
//     ctx.strokeStyle = "#0f172a";
//     ctx.lineWidth = 2;
//     ctx.lineJoin = "round";
//     ctx.lineCap = "round";
//     ctx.stroke();
//     lastPos.current = pos;
//   };

//   const endDraw = (e: React.PointerEvent<HTMLCanvasElement>) => {
//     e.preventDefault();
//     isDrawing.current = false;
//     lastPos.current = null;
//   };

//   const clearSignature = () => {
//     const canvas = canvasRef.current!;
//     const ctx = canvas.getContext("2d")!;
//     ctx.fillStyle = "#fff";
//     ctx.fillRect(0, 0, canvas.width, canvas.height);
//   };

//   function isSignatureEmpty() {
//     const canvas = canvasRef.current;
//     if (!canvas) return true;
//     const ctx = canvas.getContext("2d")!;
//     const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
//     for (let i = 0; i < data.length; i += 4) {
//       if (data[i] < 250 || data[i + 1] < 250 || data[i + 2] < 250) return false;
//     }
//     return true;
//   }

//   const allValid = () =>
//     prenume.trim() && nume.trim() && email.trim() && telefon.trim() &&
//     agreed1 && agreed2 && agreed3 && !isSignatureEmpty();

//   const handleSubmit = async () => {
//     setSubmitted(true);
//     if (!allValid()) return;
//     setLoading(true);

//     try {
//       const signatureDataUrl = canvasRef.current!.toDataURL("image/png");
//       const dateStr = new Date().toLocaleDateString("ro-RO", { day: "2-digit", month: "long", year: "numeric" });
//       const dateTimeStr = new Date().toISOString();

//       const { jsPDF } = await import("jspdf");
//       const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
//       const W = 210;
//       const M = 20;
//       const CW = W - M * 2;
//       let y = 0;

//       const ln = (h = 5) => { y += h; };

//       const txt = (text: string, size = 10, style: "normal" | "bold" = "normal", align: "left" | "center" = "left", hex = "#1a1a1a") => {
//         doc.setFontSize(size);
//         doc.setFont("helvetica", style);
//         doc.setTextColor(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
//         const lines: string[] = doc.splitTextToSize(text, CW);
//         doc.text(lines, align === "center" ? W / 2 : M, y, { align });
//         y += lines.length * size * 0.42 + 1.5;
//       };

//       const rule = () => {
//         doc.setDrawColor(180, 180, 180);
//         doc.setLineWidth(0.25);
//         doc.line(M, y, W - M, y);
//         ln(4);
//       };

//       const band = (fy: number, fh: number, hex: string) => {
//         doc.setFillColor(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
//         doc.rect(0, fy, W, fh, "F");
//       };

//       band(0, 35, "#0f172a");
//       y = 10;
//       txt("ACORD DE COLABORARE SI CONSIMTAMANT GDPR", 13, "bold", "center", "#ffffff");
//       ln(3);
//       txt("Proiect Pilot Marketplace VibeInvite  |  www.vibeinvite.ro", 8, "normal", "center", "#94a3b8");
//       y = 40; ln(6);

//       txt("PARTILE ACORDULUI", 8, "bold", "left", "#888888");
//       ln(1); rule();
//       txt("OPERATOR — Prestator servicii tehnice de publicare:", 9, "bold");
//       ln(1);
//       txt("MURGU ADRIAN PERSOANA FIZICA AUTORIZATA", 10, "bold");
//       txt("Sediu: Aleea Parcului nr. 7, et. 9, Ap. 1, Municipiul Onesti, Judetul Bacau, Romania");
//       txt("Platforma: www.vibeinvite.ro   |   Contact: office@vibeinvite.ro");
//       ln(4);
//       txt("FURNIZOR — Persoana care transmite materialele:", 9, "bold");
//       ln(1);
//       txt(`${prenume} ${nume}`, 10, "bold");
//       txt(`Email: ${email}   |   Telefon: ${telefon}`);
//       txt(`Data semnarii: ${dateStr}`);
//       ln(6);

//       const art = (nr: string, title: string) => {
//         txt(`${nr} — ${title}`.toUpperCase(), 8, "bold", "left", "#888888");
//         ln(1); rule();
//       };

//       art("ART. 1", "Obiectul acordului");
//       txt("Prezentul acord reglementeaza termenii in care Furnizorul autorizeaza Operatorul sa prelucreze si sa publice materialele fotografice, video si/sau textuale transmise in mod voluntar, exclusiv in scopul crearii si afisarii unei pagini de prezentare in cadrul marketplace-ului vibeinvite.ro, pe durata proiectului pilot (pana in august 2026).");
//       ln(6);

//       art("ART. 2", "Declaratiile si asumarile furnizorului");
//       const a2 = [
//         "Declar pe propria raspundere ca detin toate drepturile legale asupra tuturor materialelor transmise si am capacitate legala deplina de a le pune la dispozitia Operatorului.",
//         "Declar ca materialele transmise nu incalca drepturile de proprietate intelectuala ale tertilor si nu contin date personale ale altor persoane fara acordul expres al acestora.",
//         "Imi asum in totalitate raspunderea juridica civila si penala pentru continutul materialelor furnizate. Operatorul MURGU ADRIAN PFA este exonerat de orice raspundere privind legalitatea continutului transmis.",
//         "Inteleg ca activitatea paginii mele va fi inregistrata anonim, exclusiv in scopuri statistice interne, fara a fi comercializata sau transmisa tertilor.",
//         "Inteleg ca proiectul are caracter pilot pana in august 2026 si ca materialele vor fi sterse la cererea mea scrisa sau la finalul perioadei.",
//         "Confirm ca am varsta minima de 18 ani si capacitate juridica deplina de a incheia prezentul acord.",
//       ];
//       for (const item of a2) { txt(`• ${item}`); ln(2); }
//       ln(4);

//       art("ART. 3", "Obligatiile operatorului");
//       const a3 = [
//         "Utilizeaza materialele exclusiv in scopul declarat: crearea paginii de prezentare pe vibeinvite.ro.",
//         "Nu vinde, inchiriaza, cedeaza sau transfera materialele Furnizorului catre terti.",
//         "Sterge materialele la cererea scrisa a Furnizorului (office@vibeinvite.ro) in maximum 30 de zile lucratoare.",
//         "Implementeaza masuri tehnice rezonabile pentru protejarea materialelor impotriva accesului neautorizat.",
//       ];
//       for (const item of a3) { txt(`• ${item}`); ln(2); }
//       ln(4);

//       art("ART. 4", "Drepturile furnizorului conform GDPR — Reg. UE 2016/679");
//       txt("In calitate de persoana vizata, beneficiezi de: dreptul de acces, dreptul la rectificare, dreptul la stergere (dreptul de a fi uitat), dreptul la restrictionarea prelucrarii, dreptul la portabilitate, dreptul de opozitie. Solicitarile se transmit la office@vibeinvite.ro. Ai dreptul sa depui plangere la ANSPDCP, B-dul G-ral Gheorghe Magheru 28-30, Sector 1, Bucuresti.");
//       ln(6);

//       art("ART. 5", "Limitarea raspunderii operatorului");
//       txt("MURGU ADRIAN PFA actioneaza exclusiv ca prestator de servicii tehnice de publicare si nu isi asuma nicio raspundere pentru: (i) drepturile de proprietate intelectuala ale continutului transmis de Furnizor; (ii) pretentiile oricaror terti legate de materialele furnizate; (iii) rezultatele comerciale obtinute de Furnizor prin pagina de prezentare; (iv) erorile sau inexactitatile din continutul furnizat.");
//       ln(6);

//       art("ART. 6", "Dispozitii finale");
//       txt("Prezentul acord este guvernat de legislatia romana, inclusiv Regulamentul (UE) 2016/679 (GDPR) si Legea nr. 190/2018. Orice litigiu va fi solutionat pe cale amiabila, iar in caz de esec, de instantele judecatoresti competente din Romania.");
//       ln(8);

//       txt("SEMNATURA FURNIZORULUI", 8, "bold", "left", "#888888");
//       ln(1); rule();
//       txt(`${prenume} ${nume}`, 11, "bold");
//       txt(`Data: ${dateStr}`);
//       ln(4);

//       const sigY = y;
//       band(sigY - 2, 38, "#f8fafc");
//       doc.addImage(signatureDataUrl, "PNG", M, sigY, 80, 32);
//       y = sigY + 38;
//       doc.setDrawColor(15, 23, 42);
//       doc.setLineWidth(0.4);
//       doc.line(M, y, M + 80, y);
//       ln(3);
//       txt(`${prenume} ${nume}  —  Semnatura olografa digitala`, 8, "normal", "left", "#666666");
//       ln(10);

//       band(y, 16, "#0f172a");
//       const fy = y + 6;
//       doc.setFontSize(7); doc.setFont("helvetica", "normal"); doc.setTextColor(148, 163, 184);
//       doc.text("Document generat automat  |  vibeinvite.ro  |  office@vibeinvite.ro  |  Proiect Pilot 2025-2026", W / 2, fy, { align: "center" });
//       doc.text(`ID: ${dateTimeStr.replace(/[:.]/g, "-")}`, W / 2, fy + 5, { align: "center" });

//       const pdfBlob = doc.output("blob");
//       const filename = `${prenume.replace(/\s+/g, "-")}-${nume.replace(/\s+/g, "-")}-${dateTimeStr.slice(0, 10)}.pdf`.toLowerCase();
//       const fd = new FormData();
//       fd.append("file", pdfBlob, filename);
//       fd.append("filename", filename);

//       const res = await fetch("/api/pilot/upload-consent", { method: "POST", body: fd });
//       if (!res.ok) throw new Error();
//       setDone(true);
//     } catch {
//       // error handled via validation state
//     } finally {
//       setLoading(false);
//     }
//   };

//   const styles = {
//     wrapper: {
//       backgroundColor: "#eef2f7",
//       minHeight: "100vh",
//       padding: "40px 16px",
//       fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
//       WebkitFontSmoothing: "antialiased" as const,
//     },
//     container: {
//       maxWidth: "768px",
//       margin: "0 auto",
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "0px",
//     },
//     sheet: {
//       backgroundColor: "#ffffff",
//       borderRadius: "16px 16px 0 0",
//       boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
//       overflow: "hidden",
//       border: "1px solid #e2e8f0",
//     },
//     letterhead: {
//       backgroundColor: "#0f172a",
//       padding: "40px",
//       color: "#ffffff",
//     },
//     lhFlex: {
//       display: "flex",
//       flexDirection: "row" as const,
//       justifyContent: "space-between",
//       alignItems: "flex-start",
//       flexWrap: "wrap" as const,
//       gap: "20px",
//     },
//     lhMeta: {
//       marginTop: "28px",
//       paddingTop: "20px",
//       borderTop: "1px solid rgba(148, 163, 184, 0.2)",
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
//       gap: "16px",
//       fontSize: "12px",
//     },
//     sheetBody: {
//       padding: "40px",
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "32px",
//     },
//     partiesBox: {
//       marginTop: "16px",
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//       border: "1px solid #e2e8f0",
//       borderRadius: "12px",
//       overflow: "hidden",
//       fontSize: "14px",
//     },
//     partyOperator: {
//       padding: "20px",
//       backgroundColor: "#f8fafc",
//       borderBottom: "1px solid #e2e8f0",
//     },
//     partyProvider: {
//       padding: "20px",
//       backgroundColor: "#ffffff",
//     },
//     clausesContainer: {
//       marginTop: "16px",
//       border: "1px solid #e2e8f0",
//       borderRadius: "12px",
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column" as const,
//     },
//     clauseRow: {
//       display: "flex",
//       borderBottom: "1px solid #f1f5f9",
//     },
//     clauseSide: {
//       width: "64px",
//       backgroundColor: "#f8fafc",
//       borderRight: "1px solid #f1f5f9",
//       display: "flex",
//       alignItems: "flex-start",
//       justifyContent: "center",
//       paddingTop: "20px",
//     },
//     clauseSideText: {
//       writingMode: "vertical-lr" as const,
//       transform: "rotate(180deg)",
//       fontSize: "10px",
//       fontWeight: 900,
//       color: "#cbd5e1",
//       letterSpacing: "0.15em",
//       textTransform: "uppercase" as const,
//     },
//     clauseMain: {
//       flex: 1,
//       padding: "24px",
//       fontSize: "13.5px",
//       color: "#334155",
//       lineHeight: "1.75",
//     },
//     signingSection: {
//       backgroundColor: "#ffffff",
//       borderTop: "2px dashed #e2e8f0",
//       borderRadius: "0 0 16px 16px",
//       boxShadow: "0 20px 30px rgba(15, 23, 42, 0.04)",
//       padding: "40px",
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "32px",
//     },
//     gridInputs: {
//       marginTop: "16px",
//       display: "grid",
//       gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//       gap: "20px",
//     },
//     inputGroup: {
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "6px",
//     },
//     label: {
//       fontSize: "12px",
//       fontWeight: 700,
//       color: "#334155",
//     },
//     checkboxesList: {
//       marginTop: "16px",
//       display: "flex",
//       flexDirection: "column" as const,
//       gap: "10px",
//     },
//     signatureBorder: {
//       marginTop: "16px",
//       borderRadius: "12px",
//       border: "2px solid #e2e8f0",
//       overflow: "hidden",
//     },
//     canvasContainer: {
//       backgroundColor: "#fafafa",
//       padding: "16px",
//     },
//     canvasFrame: {
//       borderRadius: "8px",
//       border: "1px solid #e2e8f0",
//       backgroundColor: "#ffffff",
//       overflow: "hidden",
//       position: "relative" as const,
//     },
//     submitBtn: {
//       width: "100%",
//       backgroundColor: "#0f172a",
//       color: "#ffffff",
//       fontWeight: 700,
//       padding: "16px 24px",
//       borderRadius: "12px",
//       border: "none",
//       fontSize: "14px",
//       cursor: "pointer",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       gap: "10px",
//       transition: "background-color 0.2s ease",
//     },
//     successWrapper: {
//       minHeight: "100vh",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       backgroundColor: "#f1f5f9",
//       padding: "16px",
//       fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
//     },
//     successCard: {
//       backgroundColor: "#ffffff",
//       border: "1px solid #e2e8f0",
//       borderRadius: "24px",
//       boxShadow: "0 20px 45px rgba(0,0,0,0.05)",
//       padding: "40px",
//       maxWidth: "400px",
//       width: "100%",
//       textAlign: "center" as const,
//     },
//   };

//   if (done) {
//     return (
//       <div style={styles.successWrapper}>
//         <div style={styles.successCard}>
//           <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
//             <svg style={{ width: "28px", height: "28px", color: "#22c55e" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
//             </svg>
//           </div>
//           <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Acord înregistrat cu succes</h2>
//           <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>Documentul semnat a fost arhivat în siguranță. Echipa VibeInvite te va contacta în curând.</p>
//           <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #f1f5f9", fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
//             office@vibeinvite.ro · www.vibeinvite.ro
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const clauses = [
//     {
//       nr: "Art. 1",
//       title: "Obiectul Acordului",
//       body: "Prezentul acord reglementează termenii în care Furnizorul autorizează Operatorul să prelucreze și să publice materialele fotografice, video și/sau textuale transmise în mod voluntar, exclusiv în scopul creării și afișării unei pagini de prezentare în cadrul marketplace-ului vibeinvite.ro, pe durata proiectului pilot (până în august 2026).",
//     },
//     {
//       nr: "Art. 2",
//       title: "Declarațiile și Asumarile Furnizorului",
//       items: [
//         "Declar pe propria răspundere că dețin toate drepturile legale (drepturi de autor, licențe, acorduri) asupra tuturor materialelor transmise și am capacitate legală deplină de a le pune la dispoziția Operatorului.",
//         "Declar că materialele transmise nu încalcă drepturile de proprietate intelectuală ale terților și nu conțin date personale ale altor persoane fără acordul expres al acestora.",
//         "Îmi asum în totalitate și exclusiv răspunderea juridică civilă și penală pentru conținutul materialelor furnizate. Operatorul MURGU ADRIAN PFA este exonerat complet de orice răspundere privind legalitatea conținutului transmis.",
//         "Înțeleg că activitatea paginii mele (vizualizări, click-uri contact, click-uri social media) va fi înregistrată anonim, exclusiv în scopuri statistice interne, fără a fi comercializată sau transmisă terților.",
//         "Înțeleg că proiectul are caracter pilot până în august 2026 și că materialele vor fi șterse la cererea mea scrisă sau la finalul perioadei.",
//         "Confirm că am vârsta minimă de 18 ani și capacitate juridică deplină de a încheia prezentul acord.",
//       ],
//     },
//     {
//       nr: "Art. 3",
//       title: "Obligațiile Operatorului",
//       items: [
//         "Utilizează materialele exclusiv în scopul declarat: crearea paginii de prezentare pe vibeinvite.ro.",
//         "Nu vinde, închiriază, cedează sau transferă materialele Furnizorului către terți.",
//         "Șterge materialele la cererea scrisă a Furnizorului (office@vibeinvite.ro) în maximum 30 de zile lucrătoare.",
//         "Implementează măsuri tehnice rezonabile pentru protejarea materialelor împotriva accesului neautorizat.",
//       ],
//     },
//     {
//       nr: "Art. 4",
//       title: "Drepturile Furnizorului — GDPR (Reg. UE 2016/679)",
//       body: "În calitate de persoană vizată, beneficiezi de: dreptul de acces, dreptul la rectificare, dreptul la ștergere (dreptul de a fi uitat), dreptul la restricționarea prelucrarii, dreptul la portabilitate și dreptul de opoziție. Solicitările se transmit la office@vibeinvite.ro. Ai dreptul să depui plangere la ANSPDCP, B-dul G-ral Gheorghe Magheru 28-30, Sector 1, București.",
//     },
//     {
//       nr: "Art. 5",
//       title: "Limitarea Răspunderii Operatorului",
//       body: "MURGU ADRIAN PFA acționează exclusiv ca prestator de servicii tehnice de publicare și nu își asumă nicio răspundere pentru: (i) drepturile de proprietate intelectuală ale continutului transmis de Furnizor; (ii) pretențiile oricăror terți legate de materialele furnizate; (iii) rezultatele comerciale obținute de Furnizor prin pagina de prezentare; (iv) erorile sau inexactitățile din conținutul furnizat.",
//     },
//     {
//       nr: "Art. 6",
//       title: "Dispoziții Finale",
//       body: "Prezentul acord este guvernat de legislația română în vigoare, inclusiv Regulamentul (UE) 2016/679 (GDPR) si Legea nr. 190/2018. Orice litigiu va fi soluționat pe cale amiabilă, iar in caz de eșec, de instanțele judecătorești competente din România.",
//     },
//   ] as Array<{ nr: string; title: string; body?: string; items?: string[] }>;

//   return (
//     <div style={styles.wrapper}>
//       <div style={styles.container}>

//         {/* ── DOCUMENT SHEET ─────────────────────────────────────────── */}
//         <div style={styles.sheet}>

//           {/* Letterhead */}
//           <div style={styles.letterhead}>
//             <div style={styles.lhFlex}>
//               <div>
//                 <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px" }}>Document Oficial · Proiect Pilot</p>
//                 <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: "1.3" }}>
//                   Acord de Colaborare<br />
//                   <span style={{ color: "#cbd5e1", fontWeight: 500, fontSize: "16px" }}>și Consimțământ privind Prelucrarea Datelor</span>
//                 </h1>
//               </div>
//               <div>
//                 <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#64748b", textTransform: "uppercase" }}>Emis de</p>
//                 <p style={{ margin: "4px 0 0 0", fontWeight: 900, fontSize: "18px", letterSpacing: "-0.025em" }}>VibeInvite</p>
//                 <p style={{ margin: "2px 0 0 0", color: "#94a3b8", fontSize: "12px" }}>www.vibeinvite.ro</p>
//               </div>
//             </div>

//             {/* Meta band */}
//             <div style={styles.lhMeta}>
//               <div>
//                 <p style={{ margin: 0, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>Tip document</p>
//                 <p style={{ margin: "2px 0 0 0", color: "#e2e8f0", fontWeight: 600 }}>Acord bilateral</p>
//               </div>
//               <div>
//                 <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>Versiune</p>
//                 <p style={{ margin: "2px 0 0 0", color: "#e2e8f0", fontWeight: 600 }}>v1.0 / 2026</p>
//               </div>
//               <div>
//                 <p style={{ margin: 0, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>Aplicabilitate</p>
//                 <p style={{ margin: "2px 0 0 0", color: "#e2e8f0", fontWeight: 600 }}>Reg. UE 2016/679 · Legea 190</p>
//               </div>
//             </div>
//           </div>

//           <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "32px" }}>
//             {/* Parties */}
//             <section>
//               <SectionLabel>Părțile Acordului</SectionLabel>
//               <div style={styles.partiesBox}>
//                 <div style={styles.partyOperator}>
//                   <p style={{ margin: "0 0 8px 0", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>Operator</p>
//                   <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#0f172a" }}>MURGU ADRIAN P.F.A.</p>
//                   <p style={{ margin: 0, color: "#475569", fontSize: "12px", lineHeight: "1.6" }}>Aleea Parcului nr. 7, et. 9, Ap. 1,<br />Municipiul Onești, Județul Bacău, România</p>
//                   <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "12px" }}>office@vibeinvite.ro · www.vibeinvite.ro</p>
//                 </div>
//                 <div style={styles.partyProvider}>
//                   <p style={{ margin: "0 0 8px 0", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>Furnizor</p>
//                   <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#0f172a" }}>
//                     {prenume || nume ? `${prenume} ${nume}`.trim() : <span style={{ color: "#cbd5e1", fontWeight: 400, fontStyle: "italic" }}>Se completează mai jos</span>}
//                   </p>
//                   <p style={{ margin: 0, color: "#475569", fontSize: "12px" }}>{email || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Email —</span>}</p>
//                   <p style={{ margin: "4px 0 0 0", color: "#475569", fontSize: "12px" }}>{telefon || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Telefon —</span>}</p>
//                 </div>
//               </div>
//             </section>

//             {/* Clauses */}
//             <section>
//               <SectionLabel>Termeni și Condiții Contractuale</SectionLabel>
//               <div style={styles.clausesContainer}>
//                 {clauses.map((a, idx) => (
//                   <div key={idx} style={{ ...styles.clauseRow, borderBottom: idx === clauses.length - 1 ? "none" : "1px solid #f1f5f9" }}>
//                     <div style={styles.clauseSide}>
//                       <span style={styles.clauseSideText}>{a.nr}</span>
//                     </div>
//                     <div style={styles.clauseMain}>
//                       <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
//                         <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{a.title}</h3>
//                       </div>
//                       {a.body && (
//                         <p style={{ margin: 0, textAlign: "justify", fontSize: "13px", lineHeight: "1.75", color: "#475569" }}>{a.body}</p>
//                       )}
//                       {a.items && (
//                         <ol style={{ margin: "8px 0 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
//                           {a.items.map((item, i) => (
//                             <li key={i} style={{ display: "flex", gap: "12px", fontSize: "13px", lineHeight: "1.75", color: "#475569" }}>
//                               <span style={{ flexShrink: 0, marginTop: "2px", width: "20px", height: "20px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 900, color: "#94a3b8" }}>{i + 1}</span>
//                               <span style={{ textAlign: "justify" }}>{item}</span>
//                             </li>
//                           ))}
//                         </ol>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
//         </div>

//         {/* ── SIGNING SECTION ────────────────────────────────────────── */}
//         <div style={styles.signingSection}>
//           <div>
//             <p style={{ margin: 0, fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8" }}>Secțiunea de Semnare</p>
//             <h2 style={{ margin: "4px 0 0 0", fontSize: "18px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Validare și Semnătură Digitală</h2>
//             <p style={{ margin: "4px 0 0 0", fontSize: "13.5px", color: "#64748b" }}>Completează datele de identificare și semnează în spațiul dedicat pentru a valida acordul.</p>
//           </div>

//           {/* Fields */}
//           <div>
//             <SectionLabel>Date de Identificare</SectionLabel>
//             <div style={styles.gridInputs}>
//               {[
//                 { label: "Prenume", val: prenume, set: setPrenume, placeholder: "ex: Alexandru", type: "text" },
//                 { label: "Nume", val: nume, set: setNume, placeholder: "ex: Popescu", type: "text" },
//                 { label: "Adresă de email", val: email, set: setEmail, placeholder: "ex: alex@studio.ro", type: "email" },
//                 { label: "Număr de telefon", val: telefon, set: setTelefon, placeholder: "ex: 07xx xxx xxx", type: "tel" },
//               ].map(({ label, val, set, placeholder, type }) => (
//                 <div key={label} style={styles.inputGroup}>
//                   <label style={styles.label}>
//                     {label} <span style={{ color: "#ef4444" }}>*</span>
//                   </label>
//                   <input
//                     type={type}
//                     value={val}
//                     onChange={(e) => set(e.target.value)}
//                     placeholder={placeholder}
//                     style={{
//                       width: "100%",
//                       boxSizing: "border-box",
//                       border: "1px solid #cbd5e1",
//                       borderRadius: "8px",
//                       padding: "10px 14px",
//                       fontSize: "14px",
//                       color: "#0f172a",
//                       backgroundColor: "#ffffff",
//                       outline: "none",
//                       transition: "all 0.15s ease",
//                       ...(fieldInvalid(val) ? { border: "1px solid #ef4444", backgroundColor: "rgba(254, 226, 226, 0.3)" } : {})
//                     }}
//                     onFocus={(e) => {
//                       if (!fieldInvalid(val)) {
//                         e.target.style.borderColor = "#0f172a";
//                         e.target.style.boxShadow = "0 0 0 4px rgba(15, 23, 42, 0.05)";
//                       }
//                     }}
//                     onBlur={(e) => {
//                       if (!fieldInvalid(val)) {
//                         e.target.style.borderColor = "#cbd5e1";
//                         e.target.style.boxShadow = "none";
//                       }
//                     }}
//                   />
//                   {fieldInvalid(val) && (
//                     <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "#ef4444", fontWeight: 600 }}>Câmp obligatoriu</p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Checkboxes */}
//           <div>
//             <SectionLabel>Confirmări Obligatorii</SectionLabel>
//             <div style={styles.checkboxesList}>
//               {[
//                 { val: agreed1, set: setAgreed1, text: "Am citit, înțeles și sunt de acord cu toate clauzele prezentului Acord de Colaborare, inclusiv cu Art. 2 privind asumarile mele ca Furnizor." },
//                 { val: agreed2, set: setAgreed2, text: "Sunt de acord cu prelucrarea datelor mele cu caracter personal (nume, email, telefon) de către MURGU ADRIAN PFA în scopul gestionării acestui acord, conform Regulamentului (UE) 2016/679 (GDPR)." },
//                 { val: agreed3, set: setAgreed3, text: "Confirm că toate informațiile completate sunt corecte, că am capacitate juridică deplină și că semnătura mea digitală are valoarea unei semnături olografe în contextul acestui acord." },
//               ].map(({ val, set, text }, i) => (
//                 <label
//                   key={i}
//                   style={{
//                     display: "flex",
//                     gap: "14px",
//                     alignItems: "flex-start",
//                     padding: "16px",
//                     borderRadius: "12px",
//                     border: "1px solid #e2e8f0",
//                     cursor: "pointer",
//                     backgroundColor: checkInvalid(val) ? "rgba(254, 226, 226, 0.2)" : val ? "#f8fafc" : "#ffffff",
//                     borderColor: checkInvalid(val) ? "#fca5a5" : val ? "#cbd5e1" : "#e2e8f0",
//                     fontSize: "13.5px",
//                     userSelect: "none",
//                   }}
//                 >
//                   <div 
//                     onClick={() => set(!val)}
//                     style={{
//                       marginTop: "2px",
//                       width: "18px",
//                       height: "18px",
//                       flexShrink: 0,
//                       borderRadius: "4px",
//                       border: `2px solid ${val ? "#0f172a" : "#cbd5e1"}`,
//                       backgroundColor: val ? "#0f172a" : "#ffffff",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       transition: "all 0.1s ease",
//                     }}
//                   >
//                     {val && (
//                       <svg style={{ width: "10px", height: "10px", color: "#ffffff" }} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
//                       </svg>
//                     )}
//                   </div>
//                   <span style={{ color: val ? "#334155" : "#475569", textAlign: "justify" }}>{text}</span>
//                 </label>
//               ))}
//               {submitted && (!agreed1 || !agreed2 || !agreed3) && (
//                 <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12px", color: "#b91c1c", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px 16px", fontWeight: 600 }}>
//                   <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   Toate cele 3 confirmări sunt obligatorii pentru validarea acordului legal.
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Signature */}
//           <div>
//             <SectionLabel>Semnătură Olografă Digitală</SectionLabel>
//             <div style={{ ...styles.signatureBorder, borderColor: sigInvalid ? "#f87171" : "#e2e8f0" }}>
//               <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 16px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
//                   <svg style={{ width: "16px", height: "16px", color: "#94a3b8" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
//                   </svg>
//                   <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Spațiu de semnătură</span>
//                 </div>
//                 <button
//                   onClick={clearSignature}
//                   type="button"
//                   style={{ fontSize: "12px", fontWeight: 700, color: "#475569", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }}
//                 >
//                   Șterge
//                 </button>
//               </div>
//               <div style={styles.canvasContainer}>
//                 <div style={styles.canvasFrame}>
//                   <canvas
//                     ref={canvasRef}
//                     width={700}
//                     height={160}
//                     onPointerDown={startDraw}
//                     onPointerMove={draw}
//                     onPointerUp={endDraw}
//                     onPointerLeave={endDraw}
//                     onPointerCancel={endDraw}
//                     className="touch-none block"
//                     style={{ width: "100%", height: "160px", cursor: "crosshair" }}
//                   />
//                   <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px", borderBottom: "1px dashed #e2e8f0", pointerEvents: "none" }} />
//                   <p style={{ position: "absolute", bottom: "4px", left: "16px", margin: 0, fontSize: "10px", color: "#cbd5e1", pointerEvents: "none", userSelect: "none" }}>Semnați deasupra liniei</p>
//                 </div>
//               </div>
//               {sigInvalid && (
//                 <div style={{ padding: "0 16px 12px 16px" }}>
//                   <p style={{ margin: 0, fontSize: "11px", color: "#ef4444", fontWeight: 600 }}>Semnătura este obligatorie.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Submit */}
//           <div style={{ paddingTop: "8px" }}>
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               type="button"
//               style={styles.submitBtn}
//               onMouseEnter={(e) => { if(!loading) e.currentTarget.style.backgroundColor = "#1e293b"; }}
//               onMouseLeave={(e) => { if(!loading) e.currentTarget.style.backgroundColor = "#0f172a"; }}
//             >
//               {loading ? (
//                 <>
//                   <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 24 24" fill="none">
//                     <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
//                     <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
//                   </svg>
//                   Se generează documentul PDF...
//                 </>
//               ) : (
//                 <>
//                   <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                   </svg>
//                   Semnez și Trimit Acordul Legal
//                 </>
//               )}
//             </button>
//             <p style={{ textAlign: "center", fontSize: "11px", color: "#94a3b8", marginTop: "12px", lineHeight: "1.5" }}>
//               Prin trimiterea acestui formular confirmi că ai citit și ai înțeles toate clauzele de mai sus.
//             </p>
//           </div>
//         </div>

//         {/* Footer subsol */}
//         <div style={{ textAlign: "center", padding: "24px 0" }}>
//           <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>
//             Document generat automat · Conform legislației române și normelor GDPR (Reg. UE 2016/679)
//           </p>
//           <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "#94a3b8" }}>
//             © {new Date().getFullYear()} MURGU ADRIAN P.F.A. · office@vibeinvite.ro
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// }

// function SectionLabel({ children }: { children: React.ReactNode }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
//       <p style={{ margin: 0, fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: "#94a3b8", whiteSpace: "nowrap" }}>{children}</p>
//       <div style={{ flex: 1, height: "1px", backgroundColor: "#f1f5f9" }} />
//     </div>
//   );
// }
// app/pilot/page.tsx
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
      const PAGE_H = 297;
      const BOTTOM = 22;
      const M = 20;
      const CW = W - M * 2;
      let y = 0;

      const checkBreak = (h: number) => {
        if (y + h > PAGE_H - BOTTOM) {
          doc.addPage();
          y = 20;
        }
      };

      const ln = (h = 5) => { y += h; };

      const txt = (text: string, size = 10, style: "normal" | "bold" = "normal", align: "left" | "center" = "left", hex = "#1a1a1a") => {
        doc.setFontSize(size);
        doc.setFont("helvetica", style);
        const lines: string[] = doc.splitTextToSize(text, CW);
        const blockH = lines.length * size * 0.42 + 1.5;
        checkBreak(blockH);
        doc.setTextColor(parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16));
        doc.text(lines, align === "center" ? W / 2 : M, y, { align });
        y += blockH;
      };

      const rule = () => {
        checkBreak(6);
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
        checkBreak(14);
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

      checkBreak(60);
      txt("SEMNATURA FURNIZORULUI", 8, "bold", "left", "#888888");
      ln(1); rule();
      txt(`${prenume} ${nume}`, 11, "bold");
      txt(`Data: ${dateStr}`);
      ln(4);

      checkBreak(42);
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

      checkBreak(16);
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

  const styles = {
    wrapper: {
      backgroundColor: "#eef2f7",
      minHeight: "100vh",
      padding: "40px 16px",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      WebkitFontSmoothing: "antialiased" as const,
    },
    container: {
      maxWidth: "768px",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column" as const,
      gap: "0px",
    },
    sheet: {
      backgroundColor: "#ffffff",
      borderRadius: "16px 16px 0 0",
      boxShadow: "0 10px 30px rgba(15, 23, 42, 0.08)",
      overflow: "hidden",
      border: "1px solid #e2e8f0",
    },
    letterhead: {
      backgroundColor: "#0f172a",
      padding: "40px",
      color: "#ffffff",
    },
    lhFlex: {
      display: "flex",
      flexDirection: "row" as const,
      justifyContent: "space-between",
      alignItems: "flex-start",
      flexWrap: "wrap" as const,
      gap: "20px",
    },
    lhMeta: {
      marginTop: "28px",
      paddingTop: "20px",
      borderTop: "1px solid rgba(148, 163, 184, 0.2)",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
      gap: "16px",
      fontSize: "12px",
    },
    sheetBody: {
      padding: "40px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "32px",
    },
    partiesBox: {
      marginTop: "16px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      overflow: "hidden",
      fontSize: "14px",
    },
    partyOperator: {
      padding: "20px",
      backgroundColor: "#f8fafc",
      borderBottom: "1px solid #e2e8f0",
    },
    partyProvider: {
      padding: "20px",
      backgroundColor: "#ffffff",
    },
    clausesContainer: {
      marginTop: "16px",
      border: "1px solid #e2e8f0",
      borderRadius: "12px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column" as const,
    },
    clauseRow: {
      display: "flex",
      borderBottom: "1px solid #f1f5f9",
    },
    clauseSide: {
      width: "64px",
      backgroundColor: "#f8fafc",
      borderRight: "1px solid #f1f5f9",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "20px",
    },
    clauseSideText: {
      writingMode: "vertical-lr" as const,
      transform: "rotate(180deg)",
      fontSize: "10px",
      fontWeight: 900,
      color: "#cbd5e1",
      letterSpacing: "0.15em",
      textTransform: "uppercase" as const,
    },
    clauseMain: {
      flex: 1,
      padding: "24px",
      fontSize: "13.5px",
      color: "#334155",
      lineHeight: "1.75",
    },
    signingSection: {
      backgroundColor: "#ffffff",
      borderTop: "2px dashed #e2e8f0",
      borderRadius: "0 0 16px 16px",
      boxShadow: "0 20px 30px rgba(15, 23, 42, 0.04)",
      padding: "40px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "32px",
    },
    gridInputs: {
      marginTop: "16px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "20px",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column" as const,
      gap: "6px",
    },
    label: {
      fontSize: "12px",
      fontWeight: 700,
      color: "#334155",
    },
    checkboxesList: {
      marginTop: "16px",
      display: "flex",
      flexDirection: "column" as const,
      gap: "10px",
    },
    signatureBorder: {
      marginTop: "16px",
      borderRadius: "12px",
      border: "2px solid #e2e8f0",
      overflow: "hidden",
    },
    canvasContainer: {
      backgroundColor: "#fafafa",
      padding: "16px",
    },
    canvasFrame: {
      borderRadius: "8px",
      border: "1px solid #e2e8f0",
      backgroundColor: "#ffffff",
      overflow: "hidden",
      position: "relative" as const,
    },
    submitBtn: {
      width: "100%",
      backgroundColor: "#0f172a",
      color: "#ffffff",
      fontWeight: 700,
      padding: "16px 24px",
      borderRadius: "12px",
      border: "none",
      fontSize: "14px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "10px",
      transition: "background-color 0.2s ease",
    },
    successWrapper: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f1f5f9",
      padding: "16px",
      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
    },
    successCard: {
      backgroundColor: "#ffffff",
      border: "1px solid #e2e8f0",
      borderRadius: "24px",
      boxShadow: "0 20px 45px rgba(0,0,0,0.05)",
      padding: "40px",
      maxWidth: "400px",
      width: "100%",
      textAlign: "center" as const,
    },
  };

  if (done) {
    return (
      <div style={styles.successWrapper}>
        <div style={styles.successCard}>
          <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
            <svg style={{ width: "28px", height: "28px", color: "#22c55e" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "8px" }}>Acord înregistrat cu succes</h2>
          <p style={{ fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>Documentul semnat a fost arhivat în siguranță. Echipa VibeInvite te va contacta în curând.</p>
          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid #f1f5f9", fontSize: "12px", color: "#94a3b8", fontWeight: 500 }}>
            office@vibeinvite.ro · www.vibeinvite.ro
          </div>
        </div>
      </div>
    );
  }

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
      body: "În calitate de persoană vizată, beneficiezi de: dreptul de acces, dreptul la rectificare, dreptul la ștergere (dreptul de a fi uitat), dreptul la restricționarea prelucrarii, dreptul la portabilitate și dreptul de opoziție. Solicitările se transmit la office@vibeinvite.ro. Ai dreptul să depui plangere la ANSPDCP, B-dul G-ral Gheorghe Magheru 28-30, Sector 1, București.",
    },
    {
      nr: "Art. 5",
      title: "Limitarea Răspunderii Operatorului",
      body: "MURGU ADRIAN PFA acționează exclusiv ca prestator de servicii tehnice de publicare și nu își asumă nicio răspundere pentru: (i) drepturile de proprietate intelectuală ale continutului transmis de Furnizor; (ii) pretențiile oricăror terți legate de materialele furnizate; (iii) rezultatele comerciale obținute de Furnizor prin pagina de prezentare; (iv) erorile sau inexactitățile din conținutul furnizat.",
    },
    {
      nr: "Art. 6",
      title: "Dispoziții Finale",
      body: "Prezentul acord este guvernat de legislația română în vigoare, inclusiv Regulamentul (UE) 2016/679 (GDPR) si Legea nr. 190/2018. Orice litigiu va fi soluționat pe cale amiabilă, iar in caz de eșec, de instanțele judecătorești competente din România.",
    },
  ] as Array<{ nr: string; title: string; body?: string; items?: string[] }>;

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>

        {/* ── DOCUMENT SHEET ─────────────────────────────────────────── */}
        <div style={styles.sheet}>

          {/* Letterhead */}
          <div style={styles.letterhead}>
            <div style={styles.lhFlex}>
              <div>
                <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.18em", color: "#94a3b8", textTransform: "uppercase", marginBottom: "8px" }}>Document Oficial · Proiect Pilot</p>
                <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 800, letterSpacing: "-0.025em", lineHeight: "1.3" }}>
                  Acord de Colaborare<br />
                  <span style={{ color: "#cbd5e1", fontWeight: 500, fontSize: "16px" }}>și Consimțământ privind Prelucrarea Datelor</span>
                </h1>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em", color: "#64748b", textTransform: "uppercase" }}>Emis de</p>
                <p style={{ margin: "4px 0 0 0", fontWeight: 900, fontSize: "18px", letterSpacing: "-0.025em" }}>VibeInvite</p>
                <p style={{ margin: "2px 0 0 0", color: "#94a3b8", fontSize: "12px" }}>www.vibeinvite.ro</p>
              </div>
            </div>

            {/* Meta band */}
            <div style={styles.lhMeta}>
              <div>
                <p style={{ margin: 0, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>Tip document</p>
                <p style={{ margin: "2px 0 0 0", color: "#e2e8f0", fontWeight: 600 }}>Acord bilateral</p>
              </div>
              <div>
                <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>Versiune</p>
                <p style={{ margin: "2px 0 0 0", color: "#e2e8f0", fontWeight: 600 }}>v1.0 / 2026</p>
              </div>
              <div>
                <p style={{ margin: 0, color: "#64748b", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "10px" }}>Aplicabilitate</p>
                <p style={{ margin: "2px 0 0 0", color: "#e2e8f0", fontWeight: 600 }}>Reg. UE 2016/679 · Legea 190</p>
              </div>
            </div>
          </div>

          <div style={{ padding: "40px", display: "flex", flexDirection: "column", gap: "32px" }}>
            {/* Parties */}
            <section>
              <SectionLabel>Părțile Acordului</SectionLabel>
              <div style={styles.partiesBox}>
                <div style={styles.partyOperator}>
                  <p style={{ margin: "0 0 8px 0", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>Operator</p>
                  <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#0f172a" }}>MURGU ADRIAN P.F.A.</p>
                  <p style={{ margin: 0, color: "#475569", fontSize: "12px", lineHeight: "1.6" }}>Aleea Parcului nr. 7, et. 9, Ap. 1,<br />Municipiul Onești, Județul Bacău, România</p>
                  <p style={{ margin: "8px 0 0 0", color: "#64748b", fontSize: "12px" }}>office@vibeinvite.ro · www.vibeinvite.ro</p>
                </div>
                <div style={styles.partyProvider}>
                  <p style={{ margin: "0 0 8px 0", fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#94a3b8" }}>Furnizor</p>
                  <p style={{ margin: "0 0 6px 0", fontWeight: 700, color: "#0f172a" }}>
                    {prenume || nume ? `${prenume} ${nume}`.trim() : <span style={{ color: "#cbd5e1", fontWeight: 400, fontStyle: "italic" }}>Se completează mai jos</span>}
                  </p>
                  <p style={{ margin: 0, color: "#475569", fontSize: "12px" }}>{email || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Email —</span>}</p>
                  <p style={{ margin: "4px 0 0 0", color: "#475569", fontSize: "12px" }}>{telefon || <span style={{ color: "#cbd5e1", fontStyle: "italic" }}>Telefon —</span>}</p>
                </div>
              </div>
            </section>

            {/* Clauses */}
            <section>
              <SectionLabel>Termeni și Condiții Contractuale</SectionLabel>
              <div style={styles.clausesContainer}>
                {clauses.map((a, idx) => (
                  <div key={idx} style={{ ...styles.clauseRow, borderBottom: idx === clauses.length - 1 ? "none" : "1px solid #f1f5f9" }}>
                    <div style={styles.clauseSide}>
                      <span style={styles.clauseSideText}>{a.nr}</span>
                    </div>
                    <div style={styles.clauseMain}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
                        <h3 style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#0f172a" }}>{a.title}</h3>
                      </div>
                      {a.body && (
                        <p style={{ margin: 0, textAlign: "justify", fontSize: "13px", lineHeight: "1.75", color: "#475569" }}>{a.body}</p>
                      )}
                      {a.items && (
                        <ol style={{ margin: "8px 0 0 0", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                          {a.items.map((item, i) => (
                            <li key={i} style={{ display: "flex", gap: "12px", fontSize: "13px", lineHeight: "1.75", color: "#475569" }}>
                              <span style={{ flexShrink: 0, marginTop: "2px", width: "20px", height: "20px", borderRadius: "50%", border: "1px solid #e2e8f0", backgroundColor: "#f8fafc", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 900, color: "#94a3b8" }}>{i + 1}</span>
                              <span style={{ textAlign: "justify" }}>{item}</span>
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
        <div style={styles.signingSection}>
          <div>
            <p style={{ margin: 0, fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: "#94a3b8" }}>Secțiunea de Semnare</p>
            <h2 style={{ margin: "4px 0 0 0", fontSize: "18px", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>Validare și Semnătură Digitală</h2>
            <p style={{ margin: "4px 0 0 0", fontSize: "13.5px", color: "#64748b" }}>Completează datele de identificare și semnează în spațiul dedicat pentru a valida acordul.</p>
          </div>

          {/* Fields */}
          <div>
            <SectionLabel>Date de Identificare</SectionLabel>
            <div style={styles.gridInputs}>
              {[
                { label: "Prenume", val: prenume, set: setPrenume, placeholder: "ex: Alexandru", type: "text" },
                { label: "Nume", val: nume, set: setNume, placeholder: "ex: Popescu", type: "text" },
                { label: "Adresă de email", val: email, set: setEmail, placeholder: "ex: alex@studio.ro", type: "email" },
                { label: "Număr de telefon", val: telefon, set: setTelefon, placeholder: "ex: 07xx xxx xxx", type: "tel" },
              ].map(({ label, val, set, placeholder, type }) => (
                <div key={label} style={styles.inputGroup}>
                  <label style={styles.label}>
                    {label} <span style={{ color: "#ef4444" }}>*</span>
                  </label>
                  <input
                    type={type}
                    value={val}
                    onChange={(e) => set(e.target.value)}
                    placeholder={placeholder}
                    style={{
                      width: "100%",
                      boxSizing: "border-box",
                      border: "1px solid #cbd5e1",
                      borderRadius: "8px",
                      padding: "10px 14px",
                      fontSize: "14px",
                      color: "#0f172a",
                      backgroundColor: "#ffffff",
                      outline: "none",
                      transition: "all 0.15s ease",
                      ...(fieldInvalid(val) ? { border: "1px solid #ef4444", backgroundColor: "rgba(254, 226, 226, 0.3)" } : {})
                    }}
                    onFocus={(e) => {
                      if (!fieldInvalid(val)) {
                        e.target.style.borderColor = "#0f172a";
                        e.target.style.boxShadow = "0 0 0 4px rgba(15, 23, 42, 0.05)";
                      }
                    }}
                    onBlur={(e) => {
                      if (!fieldInvalid(val)) {
                        e.target.style.borderColor = "#cbd5e1";
                        e.target.style.boxShadow = "none";
                      }
                    }}
                  />
                  {fieldInvalid(val) && (
                    <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "#ef4444", fontWeight: 600 }}>Câmp obligatoriu</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Checkboxes */}
          <div>
            <SectionLabel>Confirmări Obligatorii</SectionLabel>
            <div style={styles.checkboxesList}>
              {[
                { val: agreed1, set: setAgreed1, text: "Am citit, înțeles și sunt de acord cu toate clauzele prezentului Acord de Colaborare, inclusiv cu Art. 2 privind asumarile mele ca Furnizor." },
                { val: agreed2, set: setAgreed2, text: "Sunt de acord cu prelucrarea datelor mele cu caracter personal (nume, email, telefon) de către MURGU ADRIAN PFA în scopul gestionării acestui acord, conform Regulamentului (UE) 2016/679 (GDPR)." },
                { val: agreed3, set: setAgreed3, text: "Confirm că toate informațiile completate sunt corecte, că am capacitate juridică deplină și că semnătura mea digitală are valoarea unei semnături olografe în contextul acestui acord." },
              ].map(({ val, set, text }, i) => (
                <label
                  key={i}
                  style={{
                    display: "flex",
                    gap: "14px",
                    alignItems: "flex-start",
                    padding: "16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    cursor: "pointer",
                    backgroundColor: checkInvalid(val) ? "rgba(254, 226, 226, 0.2)" : val ? "#f8fafc" : "#ffffff",
                    borderColor: checkInvalid(val) ? "#fca5a5" : val ? "#cbd5e1" : "#e2e8f0",
                    fontSize: "13.5px",
                    userSelect: "none",
                  }}
                >
                  <div 
                    onClick={() => set(!val)}
                    style={{
                      marginTop: "2px",
                      width: "18px",
                      height: "18px",
                      flexShrink: 0,
                      borderRadius: "4px",
                      border: `2px solid ${val ? "#0f172a" : "#cbd5e1"}`,
                      backgroundColor: val ? "#0f172a" : "#ffffff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "all 0.1s ease",
                    }}
                  >
                    {val && (
                      <svg style={{ width: "10px", height: "10px", color: "#ffffff" }} fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span style={{ color: val ? "#334155" : "#475569", textAlign: "justify" }}>{text}</span>
                </label>
              ))}
              {submitted && (!agreed1 || !agreed2 || !agreed3) && (
                <div style={{ display: "flex", gap: "8px", alignItems: "center", fontSize: "12px", color: "#b91c1c", backgroundColor: "#fef2f2", border: "1px solid #fca5a5", borderRadius: "8px", padding: "12px 16px", fontWeight: 600 }}>
                  <svg style={{ width: "16px", height: "16px", flexShrink: 0 }} fill="currentColor" viewBox="0 0 20 20">
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
            <div style={{ ...styles.signatureBorder, borderColor: sigInvalid ? "#f87171" : "#e2e8f0" }}>
              <div style={{ display: "flex", justifyContent: "space-between", backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <svg style={{ width: "16px", height: "16px", color: "#94a3b8" }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>Spațiu de semnătură</span>
                </div>
                <button
                  onClick={clearSignature}
                  type="button"
                  style={{ fontSize: "12px", fontWeight: 700, color: "#475569", backgroundColor: "#ffffff", border: "1px solid #cbd5e1", padding: "6px 12px", borderRadius: "8px", cursor: "pointer" }}
                >
                  Șterge
                </button>
              </div>
              <div style={styles.canvasContainer}>
                <div style={styles.canvasFrame}>
                  <canvas
                    ref={canvasRef}
                    width={700}
                    height={160}
                    onPointerDown={startDraw}
                    onPointerMove={draw}
                    onPointerUp={endDraw}
                    onPointerLeave={endDraw}
                    onPointerCancel={endDraw}
                    className="touch-none block"
                    style={{ width: "100%", height: "160px", cursor: "crosshair" }}
                  />
                  <div style={{ position: "absolute", bottom: "16px", left: "16px", right: "16px", borderBottom: "1px dashed #e2e8f0", pointerEvents: "none" }} />
                  <p style={{ position: "absolute", bottom: "4px", left: "16px", margin: 0, fontSize: "10px", color: "#cbd5e1", pointerEvents: "none", userSelect: "none" }}>Semnați deasupra liniei</p>
                </div>
              </div>
              {sigInvalid && (
                <div style={{ padding: "0 16px 12px 16px" }}>
                  <p style={{ margin: 0, fontSize: "11px", color: "#ef4444", fontWeight: 600 }}>Semnătura este obligatorie.</p>
                </div>
              )}
            </div>
          </div>

          {/* Submit */}
          <div style={{ paddingTop: "8px" }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              type="button"
              style={styles.submitBtn}
              onMouseEnter={(e) => { if(!loading) e.currentTarget.style.backgroundColor = "#1e293b"; }}
              onMouseLeave={(e) => { if(!loading) e.currentTarget.style.backgroundColor = "#0f172a"; }}
            >
              {loading ? (
                <>
                  <svg style={{ width: "16px", height: "16px" }} viewBox="0 0 24 24" fill="none">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Se generează documentul PDF...
                </>
              ) : (
                <>
                  <svg style={{ width: "16px", height: "16px" }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Semnez și Trimit Acordul Legal
                </>
              )}
            </button>
            <p style={{ textAlign: "center", fontSize: "11px", color: "#94a3b8", marginTop: "12px", lineHeight: "1.5" }}>
              Prin trimiterea acestui formular confirmi că ai citit și ai înțeles toate clauzele de mai sus.
            </p>
          </div>
        </div>

        {/* Footer subsol */}
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>
            Document generat automat · Conform legislației române și normelor GDPR (Reg. UE 2016/679)
          </p>
          <p style={{ margin: "4px 0 0 0", fontSize: "11px", color: "#94a3b8" }}>
            © {new Date().getFullYear()} MURGU ADRIAN P.F.A. · office@vibeinvite.ro
          </p>
        </div>

      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
      <p style={{ margin: 0, fontSize: "10px", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.16em", color: "#94a3b8", whiteSpace: "nowrap" }}>{children}</p>
      <div style={{ flex: 1, height: "1px", backgroundColor: "#f1f5f9" }} />
    </div>
  );
}