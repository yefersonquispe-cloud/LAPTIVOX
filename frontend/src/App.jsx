import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
import { obtenerProductos, obtenerCategorias } from "./services/api";

function App() {
  const [categoriaSeleccionada] = useState("Todas");
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError("");
        const datosProductos = await obtenerProductos();
        const datosCategorias = await obtenerCategorias();
        setProductos(datosProductos);
        setCategorias(datosCategorias);
      } catch (error) {
        setError("Ocurrió un error al cargar la información. Inténtalo nuevamente.");
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, []);

  return (
    <div className="min-h-screen bg-[#090909]">
      <Header />
      {cargando ? (
        <div className="mx-auto max-w-7xl px-6 py-10 text-center font-semibold text-[#FF6A00]">Cargando información...</div>
      ) : error ? (
        <div className="mx-auto max-w-7xl px-6 py-10 text-center font-semibold text-red-600">{error}</div>
      ) : (
        <ProductList productos={productos} categoriaSeleccionada={categoriaSeleccionada} />
      )}
    </div>
  );
}

export default App;