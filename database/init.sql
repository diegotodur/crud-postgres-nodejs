CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    series INTEGER NOT NULL,
    repeticiones INTEGER NOT NULL,
    descanso INTEGER NOT NULL
);
