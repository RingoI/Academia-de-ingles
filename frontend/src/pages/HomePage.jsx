import { useState } from "react";
import NavBar from "../components/landing/NavBar";
import Presentacion from "../components/landing/Presentacion";
import Card from "../components/landing/Card";
import {
  Award,
  BadgeCheck,
  Check,
  CheckCircle,
  CheckCircle2,
  CheckCircle2Icon,
  CheckCircleIcon,
  ExternalLink,
  Footprints,
  Globe,
  GraduationCap,
  Sparkles,
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
      <Presentacion />
      <div className="relative h-100 bg-slate-200 bg-[url('/public/patron.png')] bg-repeat inset-0 flex items-center justify-center">
        <div className="absolute inset-0 bg-white/90"></div>
        <div className="relative z-10 grid grid-cols-3 gap-6 px-8">
          <Card
            titulo={"Misión"}
            Icono={GraduationCap}
            texto={
              "Brindar a los estudiantes una enseñanza personalizada y de calidad basados en la importancia del error como medio para reformular hipótesis de conceptos equívocos con el fin de lograr un aprendizaje significativo internalizando el concepto de que el idioma es una herramienta fundamental que les permitirá no solo interactuar, pero también comunicarse y desenvolverse en su futuro personal y profesional. "
            }
          />
          <Card
            titulo={"Visión"}
            Icono={GraduationCap}
            fondo={true}
            texto={
              "Nuestra vision es proveer a los estudiantes con las herramientas necesarias para prepararlos para un futuro brillante y exitoso."
            }
          />
          <Card
            titulo={"Valores"}
            Icono={GraduationCap}
            texto={
              "En las clases los estudiantes trabajan de manera comprometida y en equipo cultivando su confianza por medio de su esfuerzo y responsabilidad en el proceso de enseñanza-aprendizaje."
            }
          />
        </div>
      </div>
      <div className="min-h-150 bg-slate-100 px-5 py-16">
        <div>
          <h2 className="text-[#0a2540] text-4xl">
            Cursos diseñados <br /> para el mundo de hoy.
          </h2>
          <p className="text-slate-600 py-5">
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
            className="bg-[#0a2540] font-semibold px-4 py-2 rounded-3xl cursor-pointer transition-transform hover:translate-y-1"
            onClick={() => setMostarMas(!mostrarMas)}
          >
            {mostrarMas ? "Mostrar menos cursos" : "Mostar más cursos"}
          </button>
        </div>
      </div>
      <div className="relative h-[calc(100vh-4.5rem)] w-full flex bg-slate-50 items-center py-16 overflow-hidden px-5">
        <Award className="text-slate-400/15 absolute size-200 left-0 z-0 " />
        <div className="w-[40%] flex flex-col justify-center gap-3 h-full z-10">
          <h2 className="text-5xl text-[#0a2540]">
            Tu pasaporte al <br /> mundo con{" "}
            <span className="text-5xl text-[#1b95d3]">
              Anglia Examinations.
            </span>
          </h2>
          <p className="text-slate-600 ">
            Anglia ofrece una estructura escalonada de exámenes de inglés que
            cubren todas las etapas del aprendizaje, desde los niveles más
            básicos hasta el dominio experto (C2). Al elegir Providence
            Institue, te aseguras una formación diseñada específicamente para
            superar estos desafíos internacionales
          </p>
          <ul className="pt-5 text-[#0a2540] font-semibold">
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
          <button className="bg-[#0a2540] w-60 gap-1 mt-10 justify-center items-center flex font-semibold px-4 py-3 rounded-2xl cursor-pointer transition-transform hover:translate-y-1">
            Ver más sobre Anglia
            <ExternalLink className="size-5" />
          </button>
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
      <div className="h-50 bg-white flex p-5 items-center justify-between">
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
            Carlos Urioste 688, Capitan Sarmiento, Buenos Aires
          </span>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
