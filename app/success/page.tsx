export default function SuccessPage() {
  return (
    <div style={{ 
      textAlign: 'center', 
      padding: '100px 20px', 
      fontFamily: 'sans-serif', 
      backgroundColor: '#fff', 
      minHeight: '100vh',
      color: '#000' 
    }}>
      <div style={{ fontSize: '5rem', marginBottom: '20px' }}>✅</div>
      <h1 style={{ fontSize: '3rem', color: '#2ecc71', margin: '0' }}>Plată reușită! 🎉</h1>
      <p style={{ fontSize: '1.2rem', margin: '20px 0', color: '#333' }}>
        Felicitări! Tranzacția a fost finalizată cu succes.
      </p>
      <div style={{ 
        maxWidth: '500px', 
        margin: '40px auto', 
        padding: '30px', 
        border: '1px solid #eee', 
        borderRadius: '15px',
        backgroundColor: '#f9f9f9'
      }}>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.6' }}>
          Ți-am trimis un **email** pe adresa folosită la plată. 
          Apasă pe butonul din email pentru a-ți configura parola și a începe personalizarea invitației.
        </p>
      </div>
      <p style={{ color: '#888', fontSize: '0.9rem' }}>
        Nu ai primit nimic? Verifică și folderul **Spam** sau așteaptă 2 minute.
      </p>
    </div>
  );
}