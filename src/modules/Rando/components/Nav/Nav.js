import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '@blueprintjs/core';
import classnames from 'classnames';

import { generateURI } from '../../config';

import './styles.scss';


export const Nav = ({ getAllLayersAction, resizingMap, layersList, t }) => {
  const [menuOpen, setMenuOpen] = useState(true);


  useEffect(() => {
    getAllLayersAction();
  }, []);

  useEffect(() => {
    resizingMap();
  }, [menuOpen]);

  return (
    <div
      className={classnames(
        'rando-nav',
        { 'rando-nav--active': menuOpen },
      )}
    >
      <div
        className="rando-nav__button"
      >
        <Button
          icon="align-right"
          aria-controls="rando-nav__menu"
          expandable={menuOpen ? 'true' : 'false'}
          aria-label={t(menuOpen ? 'rando.nav.foldMenu' : 'rando.nav.unfoldMenu')}
          onClick={() => setMenuOpen(!menuOpen)}
          minimal
        />
      </div>
      <ul
        id="rando-nav__menu"
        className="rando-nav__menu"
      >
        {layersList.map(({ name }) => (
          <li key={name}>
            <NavLink
              to={generateURI('layer', { layer: name })}
            >
              {name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Nav;