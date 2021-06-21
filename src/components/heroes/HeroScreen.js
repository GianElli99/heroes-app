import React, { useMemo } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { getHeroById } from '../../selectors/getHeroesById';

const heroesFolder = require.context('../../assets/heroes', true);

export const HeroScreen = ({ history }) => {
  const { heroId } = useParams();
  const hero = useMemo(() => getHeroById(heroId), [heroId]);

  if (!hero) {
    return <Redirect to="/" />;
  }
  const { superhero, alter_ego, publisher, first_appearance, characters } =
    hero;

  const handleReturn = () => {
    if (history.length <= 2) {
      history.push('/');
    } else {
      history.goBack();
    }
  };

  return (
    <div className="row mt-5 mx-0">
      <div className="col-4">
        <img
          src={heroesFolder(`./${heroId}.jpg`).default}
          alt="hero"
          className="img-thumbnail animate__animated animate__fadeInLeft"
        />
      </div>
      <div className="col-8 animate__animated animate__fadeIn">
        <h3>{superhero}</h3>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <b>Alter ego: </b>
            {alter_ego}
          </li>
          <li className="list-group-item">
            <b>Publisher: </b>
            {publisher}
          </li>
          <li className="list-group-item">
            <b>First appearance: </b>
            {first_appearance}
          </li>
        </ul>
        <h5>Characters</h5>
        <p>{characters}</p>

        <button className="btn btn-outline-info" onClick={handleReturn}>
          Return
        </button>
      </div>
    </div>
  );
};
