import { useState } from "react";
function Header() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  return (
    <header className="w-full bg-[#090909] border-b border-[#383838] shadow-lg">
      <div className="max-w-[1400px] mx-auto px-5 md:px-8">
        <div className="h-20 md:h-[88px] flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-[#FF6A00] flex items-center justify-center shadow-lg shadow-orange-500/20">
              <span className="text-white text-3xl font-black italic">L</span>
            </div>
            <div>
              <h1 className="text-xl md:text-[25px] font-black tracking-tight text-white leading-none">LAPTI<span className="text-[#FF6A00]">VOX</span></h1>
              <span className="text-[8px] md:text-[9px] tracking-[3px] text-[#A3A3A3] font-bold">TECHNOLOGY STORE</span>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-9 whitespace-nowrap">
            <a href="#" className="text-sm font-bold text-[#FF6A00] border-b-2 border-[#FF6A00] pb-2">Inicio</a>
            <a href="#productos" className="text-sm font-medium text-gray-300 hover:text-[#FF6A00] transition-colors">Productos</a>
            <a href="#categorias" className="text-sm font-medium text-gray-300 hover:text-[#FF6A00] transition-colors">Categorías</a>
            <a href="#nosotros" className="text-sm font-medium text-gray-300 hover:text-[#FF6A00] transition-colors">Nosotros</a>
          </nav>

          <a href="#productos" className="hidden md:flex items-center gap-3 bg-[#FF6A00] hover:bg-[#E65F00] text-white px-6 py-3.5 rounded-xl text-sm font-bold shadow-lg shadow-orange-600/20 transition-all hover:-translate-y-0.5">
            Explorar tienda <span className="text-lg">→</span>
          </a>
          <button type="button" onClick={() => setMenuAbierto(!menuAbierto)} className="md:hidden flex flex-col justify-center items-center gap-1.5 w-11 h-11 rounded-xl border border-[#383838] text-white hover:bg-[#222222] transition-colors" aria-label="Abrir menú" aria-expanded={menuAbierto}>
            <span className={`w-5 h-0.5 bg-white transition-transform ${menuAbierto ? "translate-y-2 rotate-45" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-opacity ${menuAbierto ? "opacity-0" : ""}`}></span>
            <span className={`w-5 h-0.5 bg-white transition-transform ${menuAbierto ? "-translate-y-2 -rotate-45" : ""}`}></span>
          </button>
        </div>

        {menuAbierto && (
          <nav className="md:hidden flex flex-col gap-2 pb-5 border-t border-[#383838] pt-4">
            <a href="#" onClick={() => setMenuAbierto(false)} className="rounded-lg px-4 py-3 text-sm font-semibold text-[#FF6A00] hover:bg-[#222222]">Inicio</a>
            <a href="#productos" onClick={() => setMenuAbierto(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#222222]">Productos</a>
            <a href="#categorias" onClick={() => setMenuAbierto(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#222222]">Categorías</a>
            <a href="#nosotros" onClick={() => setMenuAbierto(false)} className="rounded-lg px-4 py-3 text-sm font-medium text-gray-300 hover:bg-[#222222]">Nosotros</a>
            <a href="#productos" onClick={() => setMenuAbierto(false)} className="mt-2 rounded-xl bg-[#FF6A00] px-4 py-3 text-center text-sm font-bold text-white hover:bg-[#E65F00]">Explorar tienda →</a>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;