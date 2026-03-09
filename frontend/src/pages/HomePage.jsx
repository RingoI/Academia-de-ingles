import { useState } from "react";
import NavBar from "../components/landing/NavBar";
import Presentacion from "../components/landing/Presentacion";
import Card from "../components/landing/Card";
import {
  Award,
  BadgeCheck,
  CheckCircleIcon,
  ExternalLink,
  Footprints,
  Globe,
  GraduationCap,
  Sparkles,
  Facebook,
  Instagram,
  Target,
  Telescope,
  Handshake,
  MessageCircle
} from "lucide-react";
import CursoCard from "../components/landing/CursoCard";
import { cursosInfo } from "../utils/cursos";
import CardAnglia from "../components/landing/CardAnglia";
import Footer from "../components/landing/Footer";

function HomePage() {
  const [mostrarMas, setMostarMas] = useState(false);

  const cursosVisibles = mostrarMas ? cursosInfo : cursosInfo.slice(0, 3);

  console.log("cursos visibles: ", cursosVisibles);

  return (
    <div className=" w-full h-screen">
      <NavBar />
      <section id="inicio">
        <Presentacion />
      </section>
      <section id="nosotros" className="scroll-mt-18">
          <div className="relative h-100 bg-slate-200 bg-[url('/public/patron.png')] bg-repeat inset-0 flex items-center justify-center">
            <div className="absolute inset-0 bg-white/90"></div>
            <div className="relative z-10 grid grid-cols-3 gap-6 px-8">
              <Card
                titulo={"Misión"}
                Icono={Target}
                texto={
                  "Brindar a los estudiantes una enseñanza personalizada y de calidad basados en la importancia del error como medio para reformular hipótesis de conceptos equívocos con el fin de lograr un aprendizaje significativo internalizando el concepto de que el idioma es una herramienta fundamental que les permitirá no solo interactuar, pero también comunicarse y desenvolverse en su futuro personal y profesional. "
                }
              />
              <Card
                titulo={"Visión"}
                Icono={Telescope}
                fondo={true}
                texto={
                  "Nuestra vision es proveer a los estudiantes con las herramientas necesarias para prepararlos para un futuro brillante y exitoso."
                }
              />
              <Card
                titulo={"Valores"}
                Icono={Handshake}
                texto={
                  "En las clases los estudiantes trabajan de manera comprometida y en equipo cultivando su confianza por medio de su esfuerzo y responsabilidad en el proceso de enseñanza-aprendizaje."
                }
              />
            </div>
          </div>
      </section>
      <section id="cursos" className="scroll-mt-18">
          <div className="min-h-150 bg-slate-100 px-5 py-16">
            <div>
              <h2 className="text-[#0a2540] text-4xl px-8">
                Cursos diseñados <br /> para el mundo de hoy.
              </h2>
              <p className="text-slate-600 py-5 px-8">
                Selecciona el nivel que impulsará tu carrera. Clases presenciales o
                virtuales, <br /> materiales de calidad y certifiación oficial
              </p>
            </div>
            <div className="w-full px-20 grid grid-cols-3 gap-y-5 place-items-center transition-all duration-500 ease-in-out">
              {cursosVisibles?.map((curso, index) => (
                <CursoCard
                  key={curso.id ?? index}
                  img={curso.img}
                  titulo={curso.titulo}
                  descripcion={curso.descripcion}
                  nivel={curso.nivel}
                  cambioFondo={curso.cambioFondo}
                />
              ))}
            </div>       
            <div className="flex items-center justify-center mt-5">
              <button
                className="bg-[#0a2540] text-slate-300 font-semibold px-4 py-2 rounded-3xl cursor-pointer transition-transform hover:translate-y-1"
                onClick={() => setMostarMas(!mostrarMas)}
              >
                {mostrarMas ? "Mostrar menos cursos" : "Mostar más cursos"}
              </button>
            </div>
          </div>
      </section>
      <div className="relative h-[calc(100vh-4.5rem)] w-full flex bg-slate-50 items-center py-16 overflow-hidden px-5">
        <Award className="text-slate-400/15 absolute size-200 left-0 z-0 " />
        <div className="w-[40%] flex flex-col justify-center gap-3 h-full z-10">
          <h2 className="text-5xl text-[#0a2540] px-8">
            Tu pasaporte al <br /> mundo con{" "}
            <span className="text-5xl text-[#1b95d3]">
              Anglia Examinations.
            </span>
          </h2>
          <p className="text-slate-600 px-8">
            Anglia ofrece una estructura escalonada de exámenes de inglés que
            cubren todas las etapas del aprendizaje, desde los niveles más
            básicos hasta el dominio experto (C2). Al elegir Providence
            Institue, te aseguras una formación diseñada específicamente para
            superar estos desafíos internacionales
          </p>
          <ul className="pt-5 text-[#0a2540] font-semibold px-8">
            <li className="flex gap-1">
              <CheckCircleIcon />
              Reconocimiento internacional por UK NARIC y Ofqual.
            </li>
            <li className="flex gap-1">
              <CheckCircleIcon />
              Niveles alineados 100% con el MCER (A1 a C2).
            </li>
            <li className="flex gap-1">
              <CheckCircleIcon />
              Exámenes modulares para habilidades específicas.
            </li>
          </ul>
        <a
          href="https://www.anglia.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#0a2540] ml-8 text-slate-300 w-60 gap-1 mt-10 justify-center items-center flex font-semibold px-4 py-3 rounded-2xl cursor-pointer transition-transform hover:translate-y-1"
        >
          Ver más sobre Anglia
          <ExternalLink className="size-5" />
        </a>
        </div>
        <div className="grid grid-cols-2 w-[60%] place-items-center gap-5 z-10">
          <CardAnglia
            titulo={"Prestigio Británico"}
            descripcion={
              "Institución con base en el Reino Unido con más de 30 años de trayectoria global"
            }
            Icono={Sparkles}
          />
          <CardAnglia
            cambioFondo={true}
            Icono={BadgeCheck}
            titulo={"Centro Oficial"}
            descripcion={
              "Contamos con la habilitación oficial para administrar los exámenes en nuestras sedes o de forma remotra."
            }
          />
          <CardAnglia
            Icono={Footprints}
            titulo={"Niveles Step-by-Step"}
            descripcion={
              "Desde el First Step hasta Mastery, una ruta clara de crecimiento para niños y adultos."
            }
          />
          <CardAnglia
            Icono={Globe}
            titulo={"Validez sin Vencimiento"}
            descripcion={
              "A diferencia de otros exámenes, los certificados de Anglia no caducan, acompañándote siempre."
            }
          />
        </div>
      </div>
      <section id='contacto'>
          <div className="h-50 bg-white flex p-5 items-center justify-between px-13">
            <div className="flex flex-col">
              <span className="text-[#1b95d3] font-semibold">EMAIL</span>
              <span className="text-[#0a2540] font-semibold">
                providenceinstituto@gmail.com
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#1b95d3] font-semibold">TELÉFONO</span>
              <span className="text-[#0a2540] font-semibold">
                +54 9 11 3624-820112
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[#1b95d3] font-semibold">DIRECCIÓN</span>
              <span className="text-[#0a2540] font-semibold">
                Carlos Urioste 688, Capitán Sarmiento
              </span>
            </div>
          </div>
      </section>
      <Footer />

      {/* REDES LATERALES */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 flex flex-col z-50 hidden lg:flex">

          {/* FACEBOOK */}
          <a
            href="https://facebook.com/profile.php?id=100063897041979"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center bg-[#1877F2] text-white px-2 py-2 rounded-r-lg w-9 hover:w-34 transition-all duration-300 overflow-hidden"
          >
            <Facebook className="size-5 flex-shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Facebook
            </span>
          </a>

          {/* INSTAGRAM */}
          <a
            href="https://instagram.com/providence.english.institute"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center bg-[#E4405F] text-white px-2 py-2 rounded-r-lg w-9 hover:w-34 transition-all duration-300 overflow-hidden"
          >
            <Instagram className="size-5 flex-shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Instagram
            </span>
          </a>

          {/* WHATSAPP */}
          <a
            href="https://api.whatsapp.com/send?phone=543624820112&text=Hola%20%F0%9F%91%8B%0AVengo%20desde%20la%20web%20y%20quiero%20informaci%C3%B3n%20sobre%20los%20cursos%20de%20Providence%20Institute"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center bg-[#25D366] text-white px-2 py-2 rounded-r-lg w-9 hover:w-34 transition-all duration-300 overflow-hidden"
          >
            <MessageCircle className="size-5 flex-shrink-0" />
            <span className="ml-3 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              WhatsApp
            </span>
          </a>

        </div>
 
    </div>
  );
}

export default HomePage;
