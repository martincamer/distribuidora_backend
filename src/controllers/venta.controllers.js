import Venta from "../models/venta.model.js"; // Asegúrate de tener el modelo Venta definido

// Obtener todas las ventas del usuario actual
export const getVentas = async (req, res) => {
  try {
    // Obtiene todas las ventas del usuario actual
    const ventas = await Venta.find({ user: req.user.id }); // Asume que req.user.id es el ID del usuario autenticado
    res.json(ventas); // Devuelve las ventas encontradas
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Crear una nueva venta
export const createVenta = async (req, res) => {
  try {
    const { tipo, total, productos, cliente } = req.body; // Datos de la venta

    const nuevaVenta = new Venta({
      tipo,
      total,
      productos, // Debería ser un array de productos
      cliente, // Información del cliente
      user: req.user.id, // El usuario que crea la venta
    });

    await nuevaVenta.save(); // Guarda la venta en la base de datos
    res.json(nuevaVenta); // Devuelve la venta creada
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Eliminar una venta por ID
export const deleteVenta = async (req, res) => {
  try {
    const deletedVenta = await Venta.findByIdAndDelete(req.params.id); // Elimina la venta por ID
    if (!deletedVenta)
      return res.status(404).json({ message: "Venta no encontrada" });

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Actualizar una venta por ID
export const updateVenta = async (req, res) => {
  try {
    const { tipo, total, productos, cliente } = req.body; // Datos a actualizar

    const ventaActualizada = await Venta.findOneAndUpdate(
      { _id: req.params.id }, // Buscar por ID
      {
        tipo,
        total,
        productos,
        cliente,
      },
      { new: true } // Devuelve el documento actualizado
    );

    if (!ventaActualizada)
      return res.status(404).json({ message: "Venta no encontrada" });

    return res.json(ventaActualizada); // Devuelve la venta actualizada
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

// Obtener una venta por ID
export const getVenta = async (req, res) => {
  try {
    const venta = await Venta.findById(req.params.id); // Buscar por ID
    if (!venta) return res.status(404).json({ message: "Venta no encontrada" });

    return res.json(venta); // Devuelve la venta encontrada
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
