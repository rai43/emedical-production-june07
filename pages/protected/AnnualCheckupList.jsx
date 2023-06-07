import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import toast from 'solid-toast';
import { setPageTitle } from '../../data/mainStoreFunctions';
import AnnualCheckupExamsList from '../../features/annualCheckup/components/AnnualCheckupExamsList';
import { isUserLoggedIn } from '../../components/helpers/AuthenticationService';

function InternalPage() {
	const navigate = useNavigate();
	createEffect(() => {
		setPageTitle('Liste des examens du bilan de santé annuel');
		if (!isUserLoggedIn()) {
			toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
			setTimeout(() => {
				return navigate('/login', { replace: true });
			}, 3000);
		}
	});

	return <AnnualCheckupExamsList />;
}

export default InternalPage;
