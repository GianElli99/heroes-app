import { mount, shallow } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import { AppRouter } from '../../routers/AppRouter';

describe('Pruebas en AppRouter', () => {
  test('should mostart el login si no estoy autenticado', () => {
    const contextValues = {
      user: {
        logged: false,
      },
      dispatch: jest.fn(),
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValues}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('debe mostar el componente marvel si esta autenticado', () => {
    const contextValues = {
      user: {
        name: 'Gian',
        logged: true,
      },
      dispatch: jest.fn(),
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValues}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper.find('.navbar').exists()).toBe(true);
  });
});
