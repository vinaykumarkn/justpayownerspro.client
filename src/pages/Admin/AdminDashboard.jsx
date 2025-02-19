import React, { useState } from 'react'
import { BsFillHouseDownFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaShop } from 'react-icons/fa6';
import { MdAddHomeWork, MdConnectWithoutContact, MdDomainAdd, MdLandslide, MdManageAccounts, MdManageHistory, MdRoundaboutRight } from 'react-icons/md';
import { PiShoppingBagOpenFill } from 'react-icons/pi';
import { RiGitPullRequestFill } from 'react-icons/ri';
import { SiHomeassistantcommunitystore, SiManageiq } from 'react-icons/si';
import { TbShoppingBagCheck } from 'react-icons/tb';
import { TiThMenu } from 'react-icons/ti';
import { VscFeedback } from 'react-icons/vsc';
import { NavLink, Outlet } from "react-router-dom";
import useUserRole from '../../Hooks/useUserRole';
import { useSelector } from 'react-redux';
import ManagePendingProperties from '../../components/Admin/ManagePendingProperties';
import AdminProfile from '../../components/Admin/AdminProfile';
import ManageUsers from '../../components/Admin/ManageUsers';
import ManageReviews from '../../components/Admin/ManageReviews';
import ManagePublishProperties from '../../components/Admin/ManagePublishProperties';

const AdminDashboard = () => {
	const { isAdmin, isAgent } = useUserRole();
	const { currentUser } = useSelector(state => state.user);
	const [selectedTab, setSelectedTab] = useState("AdminProfile");

	const handleSelectedTab = (tab) => {
		setSelectedTab(tab);
	};

	const adminLinks = (
		<>
			
				<NavLink
					onClick={() => handleSelectedTab("AdminProfile")}
				className="list-group-item list-group-item-action"
					style={({ isActive }) => {
						return {
							backgroundColor: selectedTab == "AdminProfile" ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<CgProfile />
					Admin Profile
				</NavLink>
			
			
				<NavLink
					onClick={() => handleSelectedTab("ManagePendingProperties")}
				className="list-group-item list-group-item-action"
					style={({ isActive }) => {
						return {
							backgroundColor: selectedTab == "ManagePendingProperties" ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdManageHistory />
					Manage Pending Properties
				</NavLink>
			
				<NavLink
					onClick={() => handleSelectedTab("ManagePublishProperties")}
				className="list-group-item list-group-item-action"
					style={({ isActive }) => {
						return {
							backgroundColor: selectedTab == "ManagePublishProperties" ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdManageHistory />
					Manage Publish Properties
				</NavLink>
			
				<NavLink
					onClick={() => handleSelectedTab("ManageUsers")}
				className="list-group-item list-group-item-action"
					style={({ isActive }) => {
						return {
							backgroundColor: selectedTab == "ManageUsers" ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdManageAccounts />
					Manage Users
				</NavLink>
			
				<NavLink
					onClick={() => handleSelectedTab("ManageReviews")}
				className="list-group-item list-group-item-action"
					style={({ isActive }) => {
						return {
							backgroundColor: selectedTab == "ManageReviews" ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<SiManageiq />
					Manage reviews
				</NavLink>
			
		</>
	);

	// Agent Dashboard Links
	const agentLinks = (
		<>
			<li>
				<NavLink
					to="/dashboard/agentProfile"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<CgProfile />
					Agent Profile
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/addproperties"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdDomainAdd />
					Add Properties
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/addedProperties"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<FaShop />
					My added properties
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/soldProperties"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<TbShoppingBagCheck />
					My sold properties
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/requestProperties"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<RiGitPullRequestFill />
					Requested properties
				</NavLink>
			</li>
		</>
	);

	// User Dashboard Links
	const userLinks = (
		<>
			<li>
				<NavLink
					to="/dashboard/userProfile"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<CgProfile />
					My Profile
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/wishlist"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdAddHomeWork />
					My Wishlist{" "}
					{/* <span className="font-bold text-[#FC0]">( +{wishlist?.length} )</span> */}
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/offeredProperties"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<PiShoppingBagOpenFill />
					Offered Item
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/propertyBought"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<BsFillHouseDownFill />
					Property Bought
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/dashboard/Reviews"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<VscFeedback />
					My Reviews
				</NavLink>
			</li>
		</>
	);

	const navlinks = (
		<>
			<li>
				<NavLink
					to="/"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<SiHomeassistantcommunitystore />
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/allProperties"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdLandslide />
					All Properties
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/about"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdRoundaboutRight />
					About
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/contact"
					className="text-xl font-semibold"
					style={({ isActive }) => {
						return {
							backgroundColor: isActive ? "transparent" : "",
							color: isActive ? "#FC0" : "",
						};
					}}
				>
					<MdConnectWithoutContact />
					Contact
				</NavLink>
			</li>
		</>
	);

	return (

		<>

			<section className="grid-wrap3">
				<div className="mx-4">
					<div className="row gutters-40">
						<div className="col-lg-3 widget-break-lg sidebar-widget">
							<div className="widget widget-advanced-search">

								<div className="list-group list-group-transparent mb-0">
									

									{isAdmin ? (
										<>{adminLinks}</>
									) : isAgent ? (
										<>{agentLinks}</>
									) : (
										<>{adminLinks}</>
									)}
								</div>

								
							</div>						
						</div>

						<div className="col-lg-9">
							
								
									{
										selectedTab === "AdminProfile" ? (
											<AdminProfile />
										) : selectedTab === "ManagePendingProperties" ? (
											<ManagePendingProperties />
										) : selectedTab === "ManagePublishProperties" ? (
											<ManagePublishProperties />
										) : selectedTab === "ManageUsers" ? (
											<ManageUsers />
										) : selectedTab === "ManageReviews" ? (
											<ManageReviews />
										) : null
									}
									
							

							



						</div>
					</div>
				</div>
			</section>
			
		

		</>
	);
}

export default AdminDashboard