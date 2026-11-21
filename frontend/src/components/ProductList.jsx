import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";

const LIMITE_RECOMENDACIONES = 4;
const MAX_POR_CATEGORIA = 2;
const DESCUENTO_DESTACADO = 20;
const formatearSoles = (valor) => valor.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const obtenerNombreCategoria = (categoria) => {
  const categorias = {
    1: "Laptops",
    2: "Accesorios",
    3: "Periféricos",
    4: "Componentes",
  };
  return categoria === "Todas"
    ? "Todas las categorías"
    : categorias[categoria] || categoria;
};

function obtenerRecomendaciones(productos, categoriaSeleccionada, busqueda) {
  const termino = busqueda.toLowerCase().trim();
  const hayCategoria = categoriaSeleccionada !== "Todas";
  const disponibles = productos
    .map((producto) => {
      const precio = Number(producto.precio) || 0;
      const descuento = Number(producto.descuento_porcentaje) || 0;
      const stock = Number(producto.cantidad_disponible) || 0;
      return { producto, precio, descuento, stock, ahorro: (precio * descuento) / 100 };
    })
    .filter((item) => item.stock > 0);
  if (disponibles.length === 0) return [];

  const coincideBusqueda = (producto) => termino !== "" && producto.nombre.toLowerCase().includes(termino);
  const categoriasBuscadas = new Set(disponibles.filter(({ producto }) => coincideBusqueda(producto)).map(({ producto }) => producto.categoria));
  const maxDescuento = Math.max(1, ...disponibles.map((item) => item.descuento));
  const maxAhorro = Math.max(1, ...disponibles.map((item) => item.ahorro));
  const candidatos = disponibles
    .map((item) => {
      const { producto, descuento, stock, ahorro } = item;
      const motivos = [];
      let afinidad = 0;
      if (coincideBusqueda(producto)) { afinidad += 20; motivos.push("Coincide con tu búsqueda"); }
      else if (categoriasBuscadas.has(producto.categoria)) { afinidad += 30; motivos.push("Relacionado con tu búsqueda"); }
      if (hayCategoria && producto.categoria === categoriaSeleccionada) { afinidad += 30; motivos.push(`Top en ${producto.categoria}`); }
      if (descuento >= 30) motivos.push("Súper oferta");
      else if (descuento >= DESCUENTO_DESTACADO) motivos.push("Gran descuento");
      if (stock <= 5) motivos.push("Últimas unidades");
      const puntaje = (descuento / maxDescuento) * 40 + (ahorro / maxAhorro) * 20 + (stock <= 5 ? 5 : 0) + afinidad;
      return { ...item, afinidad, puntaje, motivo: motivos[0] ?? "Recomendado" };
    })
    .filter((item) => item.descuento >= DESCUENTO_DESTACADO)
    .sort((a, b) => b.puntaje - a.puntaje || b.ahorro - a.ahorro);

  const seleccion = [];
  const porCategoria = {};
  for (const item of candidatos) {
    if (seleccion.length === LIMITE_RECOMENDACIONES) break;
    const categoria = item.producto.categoria;
    const sinLimite = hayCategoria && categoria === categoriaSeleccionada;
    if (!sinLimite && (porCategoria[categoria] || 0) >= MAX_POR_CATEGORIA) continue;
    porCategoria[categoria] = (porCategoria[categoria] || 0) + 1;
    seleccion.push(item);
  }

  for (const item of candidatos) {
    if (seleccion.length === LIMITE_RECOMENDACIONES) break;
    if (!seleccion.includes(item)) seleccion.push(item);
  }
  return seleccion;
}

function ProductList({ productos, categoriaSeleccionada }) {
  const [busqueda, setBusqueda] = useState("");
  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria = categoriaSeleccionada === "Todas" || producto.categoria === categoriaSeleccionada;
    const coincideBusqueda = producto.nombre.toLowerCase().includes(busqueda.toLowerCase().trim());
    return coincideCategoria && coincideBusqueda;
  });

  const recomendaciones = useMemo(() => obtenerRecomendaciones(productos, categoriaSeleccionada, busqueda), [productos, categoriaSeleccionada, busqueda]);
  const terminoBusqueda = busqueda.trim();
  const mayorDescuento = Math.max(0, ...recomendaciones.map((item) => item.descuento));
  const contexto = terminoBusqueda
    ? { etiqueta: `Búsqueda: ${terminoBusqueda}`, descripcion: "Productos relacionados con lo que estás buscando, priorizando ofertas y disponibilidad." }
    : categoriaSeleccionada !== "Todas"
      ? { etiqueta: `Categoría: ${obtenerNombreCategoria(categoriaSeleccionada)}`, descripcion: `Lo mejor de ${obtenerNombreCategoria(categoriaSeleccionada)} junto a ofertas destacadas de otras categorías.` }
      : { etiqueta: "Mejores ofertas", descripcion: "Analizamos descuento, ahorro real y stock para mostrarte las mejores oportunidades." };

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
              Tecnología que <br className="hidden sm:block" /> impulsa tu <span className="text-[#FF6A00]">futuro.</span>
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-7 text-gray-400">Explora nuestra colección de equipos y accesorios tecnológicos. Encuentra rendimiento, innovación y calidad en un solo lugar.</p>
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[2px] text-gray-300"><span className="h-2 w-2 rounded-full bg-[#FF6A00]"></span>Tecnología seleccionada</span>
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
            <span className="mt-4 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-green-400"><span className="h-2 w-2 animate-pulse rounded-full bg-green-500"></span>Catálogo activo</span>
          </div>
        </div>
        <div className="relative flex items-center justify-between border-t border-[#383838] bg-[#171717]/70 px-7 py-3 md:px-10">
          <span className="text-[9px] font-bold uppercase tracking-[3px] text-gray-500">LAPTIVOX — EST. TECHNOLOGY STORE</span>
          <span className="font-heading text-[10px] font-bold tracking-[2px] text-[#FF6A00]">01 / COLLECTION</span>
        </div>
      </div>

      {recomendaciones.length > 0 && (
        <div className="relative mb-16 overflow-hidden rounded-3xl border border-[#383838] bg-[#111111] px-5 py-8 md:px-8">
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-[#FF6A00]/[0.06] blur-3xl"></div>

          <div className="relative mb-7 flex flex-col items-center text-center">
            <div className="mb-2 flex items-center justify-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]"></span>
              <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#FF6A00]">Selección especial</span>
            </div>
            <h3 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">Recomendados <span className="text-[#FF6A00]">para ti.</span></h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">{contexto.descripcion}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <span className="rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-[#FF6A00]">{contexto.etiqueta}</span>
              <span className="rounded-full border border-[#383838] bg-[#171717] px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-gray-400">Solo con stock</span>
              {mayorDescuento > 0 && <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-green-400">Hasta -{mayorDescuento}%</span>}
            </div>
          </div>

          <div className="relative mx-auto grid max-w-5xl grid-cols-1 gap-5 md:grid-cols-2">
            {recomendaciones.map(({ producto, precio, descuento, stock, ahorro, motivo }, indice) => (
              <article key={`recomendado-${producto.id}`} className={`group relative flex gap-4 overflow-hidden rounded-2xl border border-[#383838] bg-gradient-to-br from-[#181818] to-[#121212] p-3.5 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF6A00]/60 hover:shadow-[0_14px_40px_rgba(255,106,0,0.14)] sm:p-4 ${recomendaciones.length % 2 !== 0 && indice === recomendaciones.length - 1 ? "md:col-span-2 md:w-[calc(50%-0.625rem)] md:justify-self-center" : ""}`}>
                <div className="absolute left-0 top-0 h-full w-[3px] bg-[#FF6A00]/0 transition-colors duration-300 group-hover:bg-[#FF6A00]"></div>
                <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#FF6A00]/[0.05] blur-2xl transition-all duration-500 group-hover:bg-[#FF6A00]/10"></div>

                <div className="relative flex min-h-44 w-32 shrink-0 items-center justify-center self-stretch overflow-hidden rounded-xl bg-[radial-gradient(circle_at_50%_45%,#ffffff_0%,#ececec_80%)] sm:w-40">
                  <div className="absolute bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-[#FF6A00]/50"></div>
                  <div className="absolute bottom-3 h-5 w-3/5 rounded-full bg-black/10 blur-lg"></div>
                  <img src={producto.imagen} alt={producto.nombre} className="relative z-10 h-full max-h-48 w-full object-contain p-4 transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute left-2 top-2 z-20 flex flex-col items-center rounded-lg bg-gradient-to-br from-red-600 to-[#FF6A00] px-2.5 py-1.5 text-white shadow-lg shadow-red-600/30">
                    <span className="font-heading text-base font-black leading-none">-{descuento}%</span>
                    <span className="mt-0.5 text-[7px] font-black tracking-[2px]">OFF</span>
                  </div>
                </div>

                <div className="relative flex min-w-0 flex-1 flex-col">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading text-xs font-black tracking-[2px] text-gray-500"><span className="text-[#FF6A00]">#</span>{String(indice + 1).padStart(2, "0")}</span>
                    <span title={motivo} className="truncate rounded-full border border-[#FF6A00]/30 bg-[#FF6A00]/10 px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-[#FF6A00]">✦ {motivo}</span>
                  </div>

                  <h4 className="mt-2 line-clamp-2 font-heading text-base font-bold leading-5 text-white transition-colors duration-300 group-hover:text-[#FF6A00]">{producto.nombre}</h4>
                  <span className="mt-0.5 truncate text-[9px] font-bold uppercase tracking-[2px] text-gray-500">{obtenerNombreCategoria(producto.categoria)}</span>
                  <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-gray-400">{producto.descripcion}</p>

                  <div className="mt-3 rounded-xl border border-[#FF6A00]/25 bg-gradient-to-r from-[#FF6A00]/[0.12] to-transparent px-3 py-2.5">
                    <div className="flex flex-wrap items-end justify-between gap-2">
                      <div>
                        <p className="text-[11px] font-bold text-gray-500 line-through">S/ {formatearSoles(precio)}</p>
                        <p className="font-heading text-xl font-black leading-tight text-[#FF6A00]">S/ {formatearSoles(precio - ahorro)}</p>
                      </div>
                      <span className="shrink-0 rounded-md border border-green-500/25 bg-green-500/10 px-2 py-1 text-[9px] font-black uppercase tracking-wider text-green-400">Ahorras S/ {formatearSoles(ahorro)}</span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#2A2A2A]">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#FF6A00] to-red-500 transition-all duration-700 group-hover:brightness-125" style={{ width: `${Math.min(descuento, 100)}%` }}></div>
                    </div>
                    <p className="mt-1 text-[8px] font-bold uppercase tracking-[2px] text-gray-500">{descuento}% de descuento aplicado</p>
                  </div>

                  <div className="mt-2.5 flex items-center justify-between gap-2">
                    <span className={`flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider ${stock <= 5 ? "text-yellow-400" : "text-green-400"}`}>
                      <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${stock <= 5 ? "bg-yellow-400" : "bg-green-400"}`}></span>
                      {stock <= 5 ? "Últimas unidades" : "Disponible"} · {stock} und.
                    </span>
                    <span className="text-[8px] font-black uppercase tracking-[2px] text-[#FF6A00]/70">Oferta destacada</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF6A00]"></span>
            <span className="text-[9px] font-bold uppercase tracking-[3px] text-[#FF6A00]">Descubre nuestra selección</span>
          </div>
          <h3 className="font-heading text-2xl font-bold tracking-tight text-white md:text-3xl">Catálogo <span className="text-[#FF6A00]">destacado.</span></h3>
        </div>
        <span className="rounded-lg border border-[#383838] bg-[#171717] px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {obtenerNombreCategoria(categoriaSeleccionada) === "Todas las categorías" ? "Todas las categorías" : `Categoría seleccionada: ${obtenerNombreCategoria(categoriaSeleccionada)}`}
        </span>
      </div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row">
        <input type="text" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Buscar productos por nombre..." className="w-full rounded-xl border border-[#383838] bg-[#171717] px-5 py-4 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#FF6A00] sm:flex-1" />
        <button type="button" onClick={() => setBusqueda("")} className="rounded-xl border border-[#383838] bg-[#222222] px-6 py-4 text-xs font-bold uppercase tracking-widest text-gray-300 transition hover:border-[#FF6A00] hover:text-[#FF6A00]">Limpiar búsqueda</button>
      </div>
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} nombre={producto.nombre} descripcion={producto.descripcion} precio={producto.precio} imagen={producto.imagen} categoria={producto.categoria} cantidadDisponible={producto.cantidad_disponible} descuentoPorcentaje={producto.descuento_porcentaje} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#383838] bg-[#171717] px-6 py-14 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-[#FF6A00]/30 bg-[#FF6A00]/10 text-2xl text-[#FF6A00]">!</div>
          <h3 className="font-heading text-xl font-bold text-white">No hay productos disponibles</h3>
          <p className="mt-2 text-sm text-gray-400">No encontramos productos que coincidan con tu búsqueda o categoría.</p>
        </div>
      )}
    </section>
  );
}
export default ProductList;