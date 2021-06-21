import { mount, shallow } from 'enzyme';
import { AuthContext } from '../../../auth/AuthContext';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { types } from '../../../types/types';

describe('Pruebas en LoginScreen', () => {
  const historyMock = {
    replace: jest.fn(),
  };
  const contextValues = {
    user: {
      name: 'Gian',
      logged: true,
    },
    dispatch: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValues}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );

  test('debe mostrarse correctamente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('debe realizar el dispatch y la navegación', () => {
    wrapper.find('button').simulate('click', {});

    expect(historyMock.replace).toHaveBeenCalled();
    expect(contextValues.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: { name: 'Gianfranco' },
    });
  });
});
