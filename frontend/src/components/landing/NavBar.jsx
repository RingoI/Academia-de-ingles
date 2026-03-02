import { GraduationCap } from "lucide-react";
import { useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-18 bg-slate-300 flex items-center justify-between px-5 fixed top-0 z-20">
      <div className="flex items-center gap-2">
        <GraduationCap className="bg-[#0a2540] size-10 p-1 rounded-lg text-[#1b95d3]" />
        <div className="font-semibold italic">
          <span className="text-[#0a2540] text-lg ">PROVIDENCE </span>
          <span className="text-[#1b95d3] text-lg ">INSTITUTE</span>
        </div>
      </div>
      <div>
        <ul className="w-[33.3%] flex gap-10 font-semibold text-slate-500">
          <li className="cursor-pointer relative group">
            <span className="transition-colors duration-300 group-hover:text-[#1b95d3]">
              Inicio
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#1b95d3] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="cursor-pointer relative group">
            <span className="transition-colors duration-300 group-hover:text-[#1b95d3]">
              Cursos
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#1b95d3] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="cursor-pointer relative group">
            <span className="transition-colors duration-300 group-hover:text-[#1b95d3]">
              Nosotros
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#1b95d3] transition-all duration-300 group-hover:w-full"></span>
          </li>
          <li className="cursor-pointer relative group">
            <span className="transition-colors duration-300 group-hover:text-[#1b95d3]">
              Contacto
            </span>
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-[#1b95d3] transition-all duration-300 group-hover:w-full"></span>
          </li>
        </ul>
      </div>
      <div>
        <button
          className="bg-[#0a2540] text-white px-5 rounded-3xl font-semibold py-1.5 cursor-pointer transition-transform hover:scale-105"
          onClick={() => navigate("/login")}
        >
          Ingresar a Plataforma
        </button>
      </div>
    </div>
  );
}

export default NavBar;
