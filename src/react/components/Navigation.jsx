import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {

	return (
		<nav className="navigation">

			<ul>

				<li><Link to={'/'}>Home</Link></li>

				<li><Link to={'/awards'}>Awards</Link></li>

				<li><Link to={'/awards/ceremonies'}>Award ceremonies</Link></li>

				<li><Link to={'/characters'}>Characters</Link></li>

				<li><Link to={'/companies'}>Companies</Link></li>

				<li><Link to={'/materials'}>Materials</Link></li>

				<li><Link to={'/people'}>People</Link></li>

				<li><Link to={'/productions'}>Productions</Link></li>

				<li><Link to={'/venues'}>Venues</Link></li>

				<li><Link to={'/awards/new'}>New award</Link></li>

				<li><Link to={'/awards/ceremonies/new'}>New award ceremony</Link></li>

				<li><Link to={'/characters/new'}>New character</Link></li>

				<li><Link to={'/companies/new'}>New company</Link></li>

				<li><Link to={'/materials/new'}>New material</Link></li>

				<li><Link to={'/people/new'}>New person</Link></li>

				<li><Link to={'/productions/new'}>New production</Link></li>

				<li><Link to={'/venues/new'}>New venue</Link></li>

			</ul>

		</nav>
	);

};

export default Navigation;
