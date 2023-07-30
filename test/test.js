import { expect } from 'chai';
import sinon from 'sinon';
import { pool } from "../src/db.js";

import { crearEjercicio } from '../src/controllers/gym.controller.js';

describe('crearEjercicio', () => {
  it('inserto un registro y evaluo la respuesta', async () => {
    // Se prepara un objeto 'req' que simula una solicitud HTTP con datos de ejercicio.
    const req = {
      body: {
        nombre: 'Peso muerto',
        series: 3,
        repeticiones: 10,
        descanso: 30,
      },
    };

    // Se crea un objeto 'res' que simula la respuesta HTTP de la función 'res.json'.
    const res = {
      json: sinon.spy(),
    };

    // Se crea un objeto 'next' que simula el siguiente middleware en la cadena.
    const next = sinon.spy();

    // Se crea un objeto 'insertarEjercicio' que simula los datos del ejercicio a insertar en la base de datos.
    const insertarEjercicio = {
      id: 23,
      nombre: 'Peso Muerto',
      series: 3,
      repeticiones: 10,
      descanso: 30,
    };

    // Se utiliza 'sinon' para crear un stub que simula la función 'pool.query' y resuelve con el objeto 'insertarEjercicio'.
    const poolQueryStub = sinon.stub(pool, 'query').resolves({ rows: [insertarEjercicio] });

    // Se invoca la función 'crearEjercicio' con los objetos 'req', 'res' y 'next'.
    await crearEjercicio(req, res, next);


    // Verifica que la función 'res.json' haya sido llamada exactamente una vez.
    expect(res.json.calledOnce).to.be.true;

    // Verifica que la función 'next' no haya sido llamada en ningún momento.
    expect(next.notCalled).to.be.true;

    // Obtiene el primer argumento (en este caso, el objeto 'response') que fue pasado como argumento en la primera llamada a 'res.json'.
    const response = res.json.firstCall.args[0];
    expect(response).to.have.property('nombre').that.equals('Peso Muerto');
    expect(response).to.have.property('series').that.equals(3);
    expect(response).to.have.property('repeticiones').that.equals(10);
    expect(response).to.have.property('descanso').that.equals(30);
    expect(response).to.have.property('id');

    expect(Object.keys(response).length).to.equal(5);

    // Se restaura el stub para asegurarse de que no afecte a otras pruebas.
    poolQueryStub.restore();
  });
});

//en desarrollo