import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import { SearchScreen } from '../../../components/search/SearchScreen';

describe('Pruebas en SearchScreen', () => {
  test('debe mostrarse correctamente con valores por defecto', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('debe mostrara batman y el input con el valor del query string', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper.find('HeroCard').length).toBe(1);
  });

  test('debe mostrar un error si no se encuentra el Hero', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman22222']}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find('HeroCard').exists()).toBe(false);
  });

  test('debe llamar el push del history', () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={['/search?q=batman22222']}>
        <Route
          path="/search"
          component={(props) => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper
      .find('input')
      .simulate('change', { target: { name: 'searchText', value: 'batman' } });
    wrapper.find('form').simulate('submit', { preventDefault() {} });

    expect(history.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
