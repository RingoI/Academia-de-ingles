import "./cartelera.css";

function CarteleraPreview() {
  const notas = [
    {
      id: 1,
      texto: "Aula virtual\nEl viernes hay encuentro a las 8",
      color: "#fff3c4",
      meet: "https://meet.google.com/abc-defg-hij",
    },

    {
      id: 2,
      texto: "Importante:\nRecuerden entrar al apartado de avisos",
      color: "#fff3c4",
    },
    {
      id: 3,
      texto: "Contacto\n+54 9 11 3624-820112",
      color: "#fff3c4",
    },
  ];

  const randomOffset = () => Math.floor(Math.random() * 80 - 40);
  const randomRotation = () => Math.floor(Math.random() * 14 - 7);

  return (
    <div className="cartelera-container">
      <div className="tablero">
        {notas.map((nota) => {
          const offset = randomOffset();
          const rot = randomRotation();

          return (
            <div
              key={nota.id}
              className="nota"
              style={{
                background: nota.color,
                color: "#1e293b",
                transform: `translateY(${offset}px) rotate(${rot}deg)`,
              }}
            >
              <div className="pin"></div>

              <p style={{ whiteSpace: "pre-line" }}>{nota.texto}</p>

              {nota.meet && (
                <a href={nota.meet} target="_blank" rel="noopener noreferrer">
                  Unirse al Meet
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarteleraPreview;
