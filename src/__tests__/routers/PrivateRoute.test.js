import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en PrivateRoute', () => {
  const props = { location: { pathname: '/marvel' } };
  Storage.prototype.setItem = jest.fn();

  test('debe mostrar el componente si esta autenticado y guardar local storage', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <div>Hola</div>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('div').exists()).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  });

  test('debe blockear el componente si no esta autenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <div>Hola</div>}
          {...props}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('div').exists()).toBe(false);
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', '/marvel');
  });
});
