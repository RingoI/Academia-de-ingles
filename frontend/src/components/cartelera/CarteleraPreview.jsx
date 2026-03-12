import "./cartelera.css";

function CarteleraPreview() {

  const notas = [
    { id: 1, texto: "Examen B2\nViernes 18, 19:00", color: "#fff3c4" },
    { id: 2, texto: "Nuevo curso:\nConversación avanzada", color: "#e3f2fd" },
    { id: 3, texto: "Feriado\nEl lunes No hay clases", color: "#e8f5e9" }
  ];

  const randomOffset = () => Math.floor(Math.random() * 80 - 40); 
  const randomRotation = () => Math.floor(Math.random() * 14 - 7);

  return (
    <div className="cartelera-container">
      <div className="tablero">

        {notas.map(nota => {

          const offset = randomOffset();
          const rot = randomRotation();

          return (
            <div
              key={nota.id}
              className="nota"
              style={{
                background: nota.color,
                transform: `translateY(${offset}px) rotate(${rot}deg)`
              }}
            >
              <div className="pin"></div>
              {nota.texto}
            </div>
          );
        })}

      </div>
    </div>
  );
}

export default CarteleraPreview;