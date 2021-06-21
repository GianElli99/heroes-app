import { mount, shallow } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { HeroScreen } from '../../../components/heroes/HeroScreen';

describe('Pruebas en HeroScreen', () => {
  let historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    goBack: jest.fn(),
    length: 5,
  };

  test('should mostrar el redirect si no hay argumentos en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero']}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('debe mostrar un heroe si esta existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route path="/hero/:heroId" component={HeroScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('.row').exists()).toBe(true);
  });

  test('debe regresar a la pantalla anterior con push', () => {
    historyMock.length = 1;

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click', {});
    expect(historyMock.push).toHaveBeenCalledWith('/');
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test('debe regresar a la pantalla anterior', () => {
    historyMock.length = 10;

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider']}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find('button').simulate('click', {});
    expect(historyMock.push).not.toHaveBeenCalled();
    expect(historyMock.goBack).toHaveBeenCalled();
  });

  test('debe llamar el redirect si el hero no existe', () => {
    historyMock.length = 1;

    const wrapper = mount(
      <MemoryRouter initialEntries={['/hero/marvel-spider22222222']}>
        <Route
          path="/hero/:heroId"
          component={(props) => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    expect(wrapper.find('.row').exists()).toBe(false);
  });
});
