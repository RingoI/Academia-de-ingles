import "./cartelera.css";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function CarteleraPreview() {
  const notas = [
    {
      id: 0,
      texto: "📢 ¡Hoy se recibe Milton! 🎓",
      color: "#fde68a",
      destacada: true,
    },

    {
      id: 1,
      texto: "Aula virtual\nEl viernes hay encuentro a las 8",
      color: "#88d486",
      meet: "https://meet.google.com/abc-defg-hij",
    },

    {
      id: 2,
      texto: "Importante:\nRecuerden entrar periódicamente a la sección de",
      color: "#e0f2fe",
      link: "/avisos",
    },
    {
      id: 3,
      texto: "Contacto",
      color: "#fff3c4",
      whatsapp: "549113624820112",
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
              className={`nota ${nota.destacada ? "nota-destacada" : ""}`}
              style={{
                background: nota.color,
                color: "#1e293b",
                transform: nota.destacada
                  ? "rotate(-1deg)"
                  : `translateY(${offset}px) rotate(${rot}deg)`,
              }}
            >
              <div className="pin"></div>

              <div className="texto-nota">{nota.texto}</div>

              {nota.meet && (
                <a
                  href={nota.meet}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-meet"
                >
                  Unirse al Meet
                </a>
              )}

              {nota.whatsapp && (
                <a
                  href={`https://wa.me/${nota.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-whatsapp"
                >
                  <MessageCircle size={22} color="#25D366" />
                  WhatsApp
                </a>
              )}

              {nota.link && (
                <Link to={nota.link} className="link-aviso">
                  Avisos
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CarteleraPreview;
