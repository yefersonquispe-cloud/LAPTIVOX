import { Button } from "@/components/ui/button";

function CategoryFilter({ categorias, categoriaSeleccionada, onCategoriaChange }) {
  const estiloBoton = (activo) => `group flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm font-bold tracking-wide transition-all duration-300 ${activo ? "border-[#FF6A00] bg-[#FF6A00] text-white shadow-lg shadow-orange-500/20" : "border-[#383838] bg-[#171717] text-gray-400 hover:border-[#FF6A00]/60 hover:bg-[#222222] hover:text-white"}`;

  return (
    <section id="categorias" className="mx-auto max-w-7xl px-6 pt-12">
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-[2px] w-7 rounded-full bg-[#FF6A00]" />
          <span className="text-[10px] font-black uppercase tracking-[3px] text-[#FF6A00]">LAPTIVOX / COLLECTION</span>
        </div>
        <h2 className="text-3xl font-black tracking-tight text-white md:text-4xl">Explora nuestras <span className="text-[#FF6A00]">categorías.</span></h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed tracking-wide text-gray-400">Encuentra la tecnología que necesitas. Explora nuestra selección de laptops, accesorios y componentes.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-3 md:justify-start">
        <Button type="button" onClick={() => onCategoriaChange("Todas")} aria-pressed={categoriaSeleccionada === "Todas"} className={estiloBoton(categoriaSeleccionada === "Todas")}>
          <span className={`h-2 w-2 rounded-full ${categoriaSeleccionada === "Todas" ? "bg-white" : "bg-[#FF6A00] group-hover:bg-white"}`} />
          Todas
        </Button>
        {categorias.map((categoria) => (
          <Button key={categoria.id} type="button" onClick={() => onCategoriaChange(categoria.id)} aria-pressed={categoriaSeleccionada === categoria.id} className={estiloBoton(categoriaSeleccionada === categoria.id)}>
            <span className={`h-2 w-2 rounded-full ${categoriaSeleccionada === categoria.id ? "bg-white" : "bg-[#FF6A00] group-hover:bg-white"}`} />
            {categoria.nombre}
          </Button>
        ))}
      </div>
    </section>
  );
}

export default CategoryFilter;