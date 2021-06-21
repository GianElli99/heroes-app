import { authReducer } from '../../auth/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
  const userAuthenticated = { name: 'Gianfranco', logged: true };
  const userNotAuthenticated = { logged: false };

  test('debe retornar el estado por defecto', () => {
    const defaultState = authReducer(undefined, {});
    expect(defaultState).toEqual({});
  });

  test('debe autenticar y colocar el name del usuario', () => {
    const result = authReducer(undefined, {
      type: types.login,
      payload: { name: 'Gianfranco' },
    });

    expect(result).toEqual(userAuthenticated);
  });

  test('debe borrar el name del usuario y poner logged en false', () => {
    const result = authReducer(userAuthenticated, {
      type: types.logout,
    });

    expect(result).toEqual(userNotAuthenticated);
  });
});
