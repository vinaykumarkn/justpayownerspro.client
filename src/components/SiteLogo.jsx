
import { useDispatch, useSelector } from 'react-redux';
import svglogo from '../assets/brand/justpayowner-logo1.jpeg'

import { Link } from 'react-router-dom'
const SiteLogo = () => {
	const { selectedCity } = useSelector(state => state.propertyByCity);
	const dispatch = useDispatch();
	const handleClickLogo = () => {
		dispatch(setCity("All India"));
	}
	return (
		<Link to="/" className="header-brand" onClick={handleClickLogo}>
			<img src={svglogo} className="header-brand-img" alt="tabler logo" />
		</Link>
	)
}

export default SiteLogo