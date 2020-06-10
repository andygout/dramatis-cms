import React from 'react';
import { Link } from 'react-router-dom';

export default props => {

	return (
		<nav className="navigation">

			<ul>

				<li><Link to={'/'}>Home</Link></li>

				<li><Link to={'/characters'}>Characters</Link></li>

				<li><Link to={'/people'}>People</Link></li>

				<li><Link to={'/playtexts'}>Playtexts</Link></li>

				<li><Link to={'/productions'}>Productions</Link></li>

				<li><Link to={'/theatres'}>Theatres</Link></li>

				<li><Link to={'/characters/new'}>New character</Link></li>

				<li><Link to={'/people/new'}>New person</Link></li>

				<li><Link to={'/playtexts/new'}>New playtext</Link></li>

				<li><Link to={'/productions/new'}>New production</Link></li>

				<li><Link to={'/theatres/new'}>New theatre</Link></li>

			</ul>

		</nav>
	);

};
