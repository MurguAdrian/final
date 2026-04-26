export default function SuccessPage() {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '3rem', color: '#2ecc71' }}>Plată reușită! 🎉</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
        Ți-am trimis un **Magic Link** pe adresa de email pentru a-ți configura contul.
      </p>
      <p style={{ color: '#666' }}>
        Verifică și folderul Spam dacă nu primești email-ul în 2 minute.
      </p>
    </div>
  );
}