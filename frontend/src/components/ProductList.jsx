import ProductCard from "./ProductCard";

function ProductList({ productos, categoriaSeleccionada }) {
  const productosFiltrados = categoriaSeleccionada === "Todas"
    ? productos
    : productos.filter((producto) => producto.categoria === categoriaSeleccionada);

  return (
    <section id="productos" className="mx-auto max-w-7xl px-6 pb-20 pt-10">
      <div className="relative mb-10 overflow-hidden rounded-3xl border border-[#383838] bg-[#111111]">
        <div className="absolute right-0 top-0 h-full w-1/3 bg-[#FF6A00]/[0.035]"></div>
        <div className="absolute -right-16 -top-24 h-72 w-72 rounded-full border border-[#FF6A00]/10"></div>
        <div className="absolute -right-5 -top-14 h-52 w-52 rounded-full border border-[#FF6A00]/10"></div>

        <div className="relative grid gap-8 p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
          <div>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="h-[2px] w-8 bg-[#FF6A00]"></span>
              <span className="font-heading text-[10px] font-bold uppercase tracking-[4px] text-[#FF6A00]">LAPTIVOX / TECHNOLOGY</span>
              <span className="rounded border border-[#FF6A00]/30 bg-[#FF6A00]/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-[#FF6A00]">Premium selection</span>
            </div>

            <h2 className="max-w-2xl font-heading text-4xl font-bold leading-[1.12] tracking-tight text-white md:text-5xl">
              Tecnología que <br className="hidden sm:block" />
              impulsa tu <span className="text-[#FF6A00]">futuro.</span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400">
              Explora nuestra colección de equipos y accesorios tecnológicos. Encuentra rendimiento, innovación y calidad en un solo lugar.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-gray-300">
                <span className="h-2 w-2 rounded-full bg-[#FF6A00]"></span>
                Tecnología seleccionada
              </span>
              <span className="h-4 w-px bg-[#383838]"></span>
              <span className="text-[10px] font-bold uppercase tracking-[2px] text-gray-500">Calidad / Rendimiento / Innovación</span>
            </div>
          </div>

          <div className="relative flex min-w-44 flex-col items-center justify-center rounded-2xl border border-[#383838] bg-[#171717] px-7 py-8 text-center shadow-2xl shadow-black/30">
            <div className="absolute left-3 top-3 h-2 w-2 border-l border-t border-[#FF6A00]"></div>
            <div className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-[#FF6A00]"></div>
            <span className="font-heading text-5xl font-bold tracking-tighter text-white">{productosFiltrados.length.toString().padStart(2, "0")}</span>
            <span className="mt-2 text-[10px] font-bold uppercase tracking-[3px] text-[#FF6A00]">Productos</span>
            <div className="mt-5 h-px w-full bg-[#383838]"></div>
            <span className="mt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-green-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>
              Catálogo activo
            </span>
          </div>
        </div>

        <div className="relative flex items-center justify-between border-t border-[#383838] bg-[#171717]/70 px-7 py-3 md:px-10">
          <span className="text-[9px] font-bold uppercase tracking-[3px] text-gray-500">LAPTIVOX — EST. TECHNOLOGY STORE</span>
          <span className="font-heading text-[10px] font-bold tracking-[2px] text-[#FF6A00]">01 / COLLECTION</span>
        </div>
      </div>

      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]"></span>
            <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#FF6A00]">Descubre nuestra selección</span>
          </div>

          <h3 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">
            Catálogo <span className="text-[#FF6A00]">destacado.</span>
          </h3>
        </div>

        <span className="rounded-lg border border-[#383838] bg-[#171717] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {categoriaSeleccionada === "Todas" ? "Todas las categorías" : "Categoría seleccionada"}
        </span>
      </div>

      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              nombre={producto.nombre}
              descripcion={producto.descripcion}
              precio={producto.precio}
              imagen={producto.imagen}
              categoria={producto.categoria}
              cantidadDisponible={producto.cantidad_disponible}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#383838] bg-[#171717] px-6 py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FF6A00]/30 bg-[#FF6A00]/10 text-2xl text-[#FF6A00]">!</div>
          <h3 className="font-heading text-xl font-bold text-white">No hay productos disponibles</h3>
          <p className="mt-2 text-sm text-gray-400">No encontramos productos en la categoría seleccionada.</p>
        </div>
      )}
    </section>
  );
}

export default ProductList;