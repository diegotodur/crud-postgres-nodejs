import { pool } from "../db.js";

export const crearEjercicio = async (req, res, next) => {
  try {
    const { nombre, series, repeticiones, descanso } = req.body;
    if (!nombre || !series || !repeticiones || !descanso) {
      throw new Error ("Faltan datos")
    }
    const result = await pool.query({
      text: 'INSERT INTO exercises (nombre, series, repeticiones, descanso) VALUES($1, $2, $3, $4) RETURNING *',
      values: [nombre, series, repeticiones, descanso],
    });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

export const obtenerEjercicios = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT * FROM exercises");
    return res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

export const actualizarEjercicio = async (req, res, next) => {3
  try {
    const { id, nombre, series, repeticiones, descanso } = req.body;
    if ( !id || !nombre || !series || !repeticiones || !descanso) {
      throw new Error ("Faltan datos")
    }
    const result = await pool.query({
      text:'UPDATE exercises SET nombre = $1, series = $2, repeticiones = $3, descanso = $4 WHERE id = $5 RETURNING *',
      values: [nombre, series, repeticiones, descanso, id],
    });
    if (result.rows.length === 0)
      return res.status(404).json({ message: "Ejercicio no encontrado" });
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};



export const eliminarEjercicio = async (req, res, next) => {
  try {
    const { id } = req.query;
    const result = await pool.query({
      text: 'DELETE FROM exercises WHERE id = $1',
      values: [id],
    });
    if (result.rowCount === 0)
    return res.status(404).json({ message: "Ejercicio no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
