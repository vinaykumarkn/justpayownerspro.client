import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const useUserRole = () => {
	const [isAdmin, setIsAdmin] = useState(false);
	const [isAgent, setIsAgent] = useState(false);
	const { currentUser } = useSelector(state => state.user);
	useEffect(() => {
		const role = currentUser?.userRole;
		if (role === "Admin") {
			setIsAdmin(true)
		}
		else if (role === "Agent") {
			setIsAgent(true)
		} else {
			setIsAgent(false);
			setIsAdmin(false);
		}
	}, [currentUser]);
	return { isAgent, isAdmin };
};

export default useUserRole;
