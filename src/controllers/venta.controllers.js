import Venta from "../models/venta.model.js"; // Asegúrate de tener el modelo Venta definido
import Producto from "../models/productos.model.js"; // Modelo para productos
import Cliente from "../models/clientes.model.js";
import mongoose from "mongoose";
import dayjs from "dayjs"; // Asegúrate de tener dayjs instalado y correctamente importado

export const getVentas = async (req, res) => {
  try {
    const userId = req.user.id; // ID del usuario autenticado

    // const inicioDelMes = dayjs().startOf("month").toDate(); // Inicio del mes actual
    // const finDelMes = dayjs().endOf("month").toDate(); // Fin del mes actual
    // Busca las ventas del usuario actual dentro del rango del mes actual
    const ventasMensuales = await Venta.find({
      user: userId,
      // date: { $gte: inicioDelMes, $lte: finDelMes },
    });

    res.json(ventasMensuales); // Devuelve las ventas encontradas para el mes actual
  } catch (error) {
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};

//FUNCIONAL NUEVO
// export const createVenta = async (req, res) => {
//   try {
//     const { tipo, total, productos, cliente } = req.body;

//     const productoIds = productos.map((p) => {
//       if (!mongoose.Types.ObjectId.isValid(p.ObjectId)) {
//         throw new Error(`Invalid ObjectId: ${p.ObjectId}`);
//       }
//       return new mongoose.Types.ObjectId(p.ObjectId);
//     });

//     const productosEnBD = await Producto.find({
//       _id: { $in: productoIds },
//     });

//     if (productosEnBD.length !== productoIds.length) {
//       throw new Error("No se encontraron todos los productos esperados.");
//     }

//     if (tipo === "venta") {
//       // Descontar el stock según los productos enviados
//       for (const productoEnviado of productos) {
//         const productoEnBD = productosEnBD.find(
//           (p) => p._id.toString() === productoEnviado.ObjectId
//         );

//         if (!productoEnBD) {
//           throw new Error(
//             `Producto con ObjectId ${productoEnviado.ObjectId} no encontrado.`
//           );
//         }

//         const cantidadEnviada = productoEnviado.cantidad;

//         if (productoEnBD.stock < cantidadEnviada) {
//           throw new Error(
//             `Stock insuficiente para el producto ${productoEnBD.detalle}`
//           );
//         }

//         productoEnBD.stock -= cantidadEnviada; // Descontar el stock

//         // Guardar cambios
//         await productoEnBD.save();
//       }
//     }

//     const nuevaVenta = new Venta({
//       tipo,
//       total,
//       productos,
//       cliente,
//       user: req.user.id,
//     });

//     await nuevaVenta.save();

//     res.json(nuevaVenta); // Devolver la venta creada
//   } catch (error) {
//     console.error("Error al crear venta:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const createVenta = async (req, res) => {
  try {
    const { tipo, total, productos, cliente } = req.body;

    // Validar ObjectId del cliente
    if (!mongoose.Types.ObjectId.isValid(cliente.id)) {
      throw new Error(`Invalid Client ObjectId: ${cliente.id}`);
    }

    // Buscar al cliente por su ObjectId
    const clienteEnBD = await Cliente.findById(cliente.id);

    if (!clienteEnBD) {
      throw new Error(`Cliente con ObjectId ${cliente.id} no encontrado.`);
    }

    const productoIds = productos.map((p) => {
      if (!mongoose.Types.ObjectId.isValid(p.ObjectId)) {
        throw new Error(`Invalid ObjectId: ${p.ObjectId}`);
      }
      return new mongoose.Types.ObjectId(p.ObjectId);
    });

    const productosEnBD = await Producto.find({
      _id: { $in: productoIds },
    });

    if (productosEnBD.length !== productoIds.length) {
      throw new Error("No se encontraron todos los productos esperados.");
    }

    if (tipo === "venta") {
      // Descontar el stock según los productos enviados
      for (const productoEnviado of productos) {
        const productoEnBD = productosEnBD.find(
          (p) => p._id.toString() === productoEnviado.ObjectId
        );

        if (!productoEnBD) {
          throw new Error(
            `Producto con ObjectId ${productoEnviado.ObjectId} no encontrado.`
          );
        }

        const cantidadEnviada = productoEnviado.cantidad;

        if (productoEnBD.stock < cantidadEnviada) {
          throw new Error(
            `Stock insuficiente para el producto, Desc:${productoEnBD.detalle}, cod:${productoEnBD.codigo}.`
          );
        }

        productoEnBD.stock -= cantidadEnviada;

        await productoEnBD.save(); // Guardar el producto con el stock actualizado
      }
    }

    // Calcular el total_dinero de la venta sumando el total de cada producto
    const totalVenta = productos.reduce(
      (acumulador, producto) => acumulador + producto.total_dinero,
      0
    );

    if (tipo === "venta") {
      // Actualizar el total del cliente con el total_dinero de la venta
      clienteEnBD.total += totalVenta;

      await clienteEnBD.save(); // Guardar el cliente con el total actualizado
    }

    const nuevaVenta = new Venta({
      tipo,
      total,
      productos,
      cliente, // Asignar el ObjectId del cliente
      user: req.user.id,
    });

    await nuevaVenta.save();

    res.json(nuevaVenta); // Devolver la venta creada
  } catch (error) {
    console.error("Error al crear venta:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteVenta = async (req, res) => {
  try {
    // Buscar la venta por ID con los productos y cliente poblados
    const venta = await Venta.findById(req.params.id).populate(
      "productos cliente"
    );

    if (!venta) return res.status(404).json({ message: "Venta no encontrada" });

    if (venta.tipo === "venta") {
      // Recuperar los productos asociados a la venta
      const productos = venta.productos;

      // Recuperar el cliente desde el objeto completo de la venta
      const cliente = venta.cliente;

      // Verificar si el cliente está presente
      if (!cliente) {
        return res.status(404).json({ message: "Cliente no encontrado" });
      }

      // Recuperar el stock de los productos
      for (const producto of productos) {
        const productoEnBD = await Producto.findById(producto._id);
        if (!productoEnBD) {
          console.error(`Producto con ObjectId ${producto._id} no encontrado.`);
          continue;
        }
        productoEnBD.stock += Number(producto.cantidad);
        await productoEnBD.save(); // Guardar el producto con el stock actualizado
      }

      // Actualizar el total del cliente
      cliente.total -= Number(venta.total);
      if (cliente.total < 0) cliente.total = 0; // Evitar valores negativos

      await cliente.save(); // Guardar el cliente con el total actualizado
    }

    // Eliminar la venta
    await Venta.findByIdAndDelete(req.params.id);

    return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
  } catch (error) {
    console.error("Error al eliminar venta:", error);
    return res.status(500).json({ message: error.message }); // Manejo de errores
  }
};
// // Eliminar una venta por ID
// export const deleteVenta = async (req, res) => {
//   try {
//     const deletedVenta = await Venta.findByIdAndDelete(req.params.id); // Elimina la venta por ID
//     if (!deletedVenta)
//       return res.status(404).json({ message: "Venta no encontrada" });

//     return res.sendStatus(204); // Retorna sin contenido si se elimina correctamente
//   } catch (error) {
//     return res.status(500).json({ message: error.message }); // Manejo de errores
//   }
// };

export const updateVenta = async (req, res) => {
  try {
    const { tipo, total, productos, cliente } = req.body; // Datos a actualizar

    // Validar ObjectId del cliente
    if (!mongoose.Types.ObjectId.isValid(cliente.id)) {
      throw new Error(`Invalid Client ObjectId: ${cliente.id}`);
    }

    // Buscar al cliente por su ObjectId
    const clienteEnBD = await Cliente.findById(cliente.id);

    if (!clienteEnBD) {
      throw new Error(`Cliente con ObjectId ${cliente.id} no encontrado.`);
    }

    const productoIds = productos.map((p) => {
      if (!mongoose.Types.ObjectId.isValid(p.ObjectId)) {
        throw new Error(`Invalid ObjectId: ${p.ObjectId}`);
      }
      return new mongoose.Types.ObjectId(p.ObjectId);
    });

    const productosEnBD = await Producto.find({
      _id: { $in: productoIds },
    });

    if (productosEnBD.length !== productoIds.length) {
      throw new Error("No se encontraron todos los productos esperados.");
    }

    if (tipo === "venta") {
      // Descontar el stock según los productos enviados
      for (const productoEnviado of productos) {
        const productoEnBD = productosEnBD.find(
          (p) => p._id.toString() === productoEnviado.ObjectId
        );

        if (!productoEnBD) {
          throw new Error(
            `Producto con ObjectId ${productoEnviado.ObjectId} no encontrado.`
          );
        }

        const cantidadEnviada = productoEnviado.cantidad;

        if (productoEnBD.stock < cantidadEnviada) {
          throw new Error(
            `Stock insuficiente para el producto ${productoEnBD.detalle} - codigo ${productoEnBD.codigo}`
          );
        }

        productoEnBD.stock -= cantidadEnviada;

        await productoEnBD.save(); // Guardar el producto con el stock actualizado
      }
    }

    // Calcular el total_dinero de la venta sumando el total de cada producto
    const totalVenta = productos.reduce(
      (acumulador, producto) => acumulador + producto.total_dinero,
      0
    );

    if (tipo === "venta") {
      // Actualizar el total del cliente con el total_dinero de la venta
      clienteEnBD.total += totalVenta;

      await clienteEnBD.save(); // Guardar el cliente con el total actualizado
    }

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

export const updateVentaEstado = async (req, res) => {
  try {
    const { estado } = req.body; // El nuevo estado a actualizar
    const { id } = req.params; // ID de la venta a actualizar

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID de venta no válido" });
    }

    // Actualiza solo el estado
    const ventaActualizada = await Venta.findByIdAndUpdate(
      id, // ID de la venta a buscar
      { estado }, // Solo el campo 'estado' a actualizar
      { new: true } // Devuelve la venta actualizada
    );

    if (!ventaActualizada) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    return res.json(ventaActualizada); // Devuelve la venta actualizada con solo el estado cambiado
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error actualizando el estado: ${error.message}` });
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
