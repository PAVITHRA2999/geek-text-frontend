import React from 'react';
import './DashboardHome.css';
import {ManagePersonalInfo} from '../PersonalInfoManager/ManagePersonalInfo';
export const DashboardHome = () => {
	return (
		<div className='dashboard-home'>
			<ManagePersonalInfo />
		</div>
	);
};
