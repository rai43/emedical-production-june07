import { lazy } from 'solid-js';
import ManageAnnualCheckup from './components/ManageAnnualCheckup';

// const ManageBeneficiary = lazy(() => import('./components/ManageBeneficiary'));

function AnnualCheckup() {
	return (
		<>
			{/* <ManageBeneficiary /> */}
			<ManageAnnualCheckup />
		</>
	);
}

export default AnnualCheckup;
