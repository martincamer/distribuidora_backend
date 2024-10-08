import Producto from "../models/productos.model.js";

export const getProductos = async (req, res) => {
  try {
    const tasks = await Producto.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createProductos = async (req, res) => {
  try {
    const {
      codigo,
      detalle,
      tipo,
      imagen,
      color,
      categoria,
      kg_barra_estimado,
      stock,
      stock_minimo,
      stock_maximo,
      date,
    } = req.body;

    // Verificar si todos los campos requeridos están presentes
    const requiredFields = [
      "codigo",
      "detalle",
      "tipo",
      // "imagen",
      "color",
      "categoria",
      "kg_barra_estimado",
      "stock",
      "stock_minimo",
      "stock_maximo",
      "date",
    ];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `El ${field} es necesario/a` });
      }
    }

    const newProducto = new Producto({
      codigo,
      detalle,
      tipo,
      imagen,
      color,
      categoria,
      kg_barra_estimado,
      stock,
      stock_minimo,
      stock_maximo,
      date,
      user: req.user.id,
    });
    await newProducto.save();
    res.json(newProducto);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteProductos = async (req, res) => {
  try {
    const deletedTask = await Producto.findByIdAndDelete(req.params.id);
    if (!deletedTask)
      return res.status(404).json({ message: "Producto not found" });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProductos = async (req, res) => {
  try {
    const {
      codigo,
      detalle,
      tipo,
      imagen,
      color,
      categoria,
      kg_barra_estimado,
      stock,
      stock_minimo,
      stock_maximo,
      date,
    } = req.body;

    const productoUpdated = await Producto.findOneAndUpdate(
      { _id: req.params.id },
      {
        codigo,
        detalle,
        tipo,
        imagen,
        color,
        categoria,
        kg_barra_estimado,
        stock,
        stock_minimo,
        stock_maximo,
        date,
      },
      { new: true }
    );
    return res.json(productoUpdated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getProducto = async (req, res) => {
  try {
    const task = await Producto.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Producto not found" });
    return res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
