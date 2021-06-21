import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { DashboardRoutes } from '../../routers/DashboardRoutes';
import { MemoryRouter } from 'react-router-dom';

describe('Pruebas en DashboardRoutes', () => {
  test('Debe mostrarse correctamente', () => {
    const wrapper = mount(
      <AuthContext.Provider
        value={{ user: { name: 'Gian', logged: true }, dispatch: jest.fn() }}
      >
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.text-info').text().trim()).toBe('Gian');
  });
});
