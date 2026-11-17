import { Button } from "@/components/ui/button";

function ProductCard({ nombre, descripcion, precio, imagen, categoria, cantidadDisponible }) {
  const stock = Number(cantidadDisponible) || 0;

  const estadoStock = stock === 0
    ? { texto: "Agotado", color: "border-red-500/20 bg-red-500/10 text-red-400", punto: "bg-red-400" }
    : stock <= 5
      ? { texto: "Últimas unidades", color: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400", punto: "bg-yellow-400" }
      : { texto: "Disponible", color: "border-green-500/20 bg-green-500/10 text-green-400", punto: "bg-green-400" };

  return (
    <article className="group relative flex h-full min-h-[660px] flex-col overflow-hidden rounded-2xl border border-[#383838] bg-[#151515] shadow-xl shadow-black/30 transition-all duration-500 hover:-translate-y-2 hover:border-[#FF6A00]/70 hover:shadow-[0_20px_55px_rgba(255,106,0,0.13)]">
      <div className="absolute left-0 top-0 z-20 h-[3px] w-0 bg-[#FF6A00] transition-all duration-700 group-hover:w-full"></div>
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#FF6A00]/[0.035] blur-3xl transition-all duration-500 group-hover:bg-[#FF6A00]/10"></div>

      <div className="relative flex h-60 shrink-0 items-center justify-center overflow-hidden bg-[#F7F7F7]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#f0f0f0_75%)]"></div>
        <div className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-[#FF6A00]/50"></div>
        <div className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-[#FF6A00]/50"></div>
        <div className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-[#FF6A00]/50"></div>
        <div className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-[#FF6A00]/50"></div>
        <div className="absolute bottom-5 h-8 w-3/5 rounded-full bg-black/10 blur-xl"></div>

        <img src={imagen} alt={nombre} className="relative z-10 h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-110" />

        <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-md bg-[#FF6A00] px-3 py-2 text-[9px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-500/20">
          <span>✦</span> Selección premium
        </div>

        <div className="absolute bottom-4 right-4 z-10 rounded-md bg-[#171717] px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-lg">
          LAPTIVOX
        </div>
      </div>

      <div className="relative flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-center gap-2">
          <span className="h-px w-6 bg-[#FF6A00]/60"></span>
          <span className="text-[9px] font-black uppercase tracking-[3px] text-[#FF6A00]">Technology collection</span>
          <span className="h-px w-6 bg-[#FF6A00]/60"></span>
        </div>

        <h3 className="flex min-h-[3.5rem] items-center justify-center text-center font-heading text-lg font-bold leading-7 tracking-tight text-white transition-colors duration-300 group-hover:text-[#FF6A00]">
          {nombre}
        </h3>

        <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-center text-sm leading-6 text-gray-400">
          {descripcion}
        </p>

        <div className="mt-auto">
          <div className="mb-4 mt-5 border-t border-[#383838] pt-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase tracking-[2px] text-gray-500">Precio de venta</span>
              <span className="text-[9px] font-bold uppercase tracking-wider text-gray-600">PEN / SOLES</span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <p className="font-heading text-2xl font-black tracking-tight text-[#FF6A00]">
                S/ {Number(precio).toLocaleString("es-PE", { minimumFractionDigits: 2 })}
              </p>

              <span className={`flex shrink-0 items-center gap-1.5 rounded-lg border px-2.5 py-2 text-[9px] font-bold uppercase tracking-wide ${estadoStock.color}`}>
                <span className={`h-1.5 w-1.5 rounded-full ${estadoStock.punto} ${stock > 0 ? "animate-pulse" : ""}`}></span>
                {estadoStock.texto}
              </span>
            </div>
          </div>

          <div className="mb-4 flex items-center justify-between rounded-lg border border-[#383838] bg-[#1B1B1B] px-3 py-3">
            <span className="text-[9px] font-bold uppercase tracking-[1.5px] text-gray-500">Unidades disponibles</span>
            <span className={`font-heading text-sm font-black ${stock > 0 ? "text-white" : "text-red-400"}`}>
              {stock.toString().padStart(2, "0")} <span className="text-[9px] font-bold text-gray-500">UND.</span>
            </span>
          </div>

          <Button
            disabled={stock === 0}
            className="group/button relative w-full overflow-hidden rounded-xl border border-[#FF6A00]/40 bg-[#FF6A00] py-5 text-sm font-black text-white shadow-lg shadow-orange-600/10 transition-all duration-300 hover:border-[#FF8533] hover:bg-[#E65F00] hover:shadow-[0_5px_25px_rgba(255,106,0,0.25)] disabled:cursor-not-allowed disabled:border-gray-700 disabled:bg-gray-700 disabled:text-gray-400 disabled:shadow-none"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {stock > 0 ? "Ver producto" : "Producto agotado"}
              {stock > 0 && <span className="text-lg transition-transform duration-300 group-hover/button:translate-x-1.5">→</span>}
            </span>
            {stock > 0 && <span className="absolute inset-0 -translate-x-full bg-white/10 transition-transform duration-500 group-hover/button:translate-x-0"></span>}
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-[#383838]/70 pt-3">
          <span className="text-[8px] font-bold uppercase tracking-[2px] text-gray-600">LAPTIVOX TECHNOLOGY STORE</span>
          <span className="text-[9px] font-black tracking-widest text-[#FF6A00]/70">LV / 01</span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;