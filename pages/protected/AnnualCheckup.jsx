import { createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import toast from 'solid-toast';
import { setPageTitle } from '../../data/mainStoreFunctions';
import AnnualCheckup from '../../features/annualCheckup';
import { isUserLoggedIn } from '../../components/helpers/AuthenticationService';

function InternalPage() {
	const navigate = useNavigate();
	createEffect(() => {
		setPageTitle('Bilan de santé annuel');
		if (!isUserLoggedIn()) {
			toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
			setTimeout(() => {
				return navigate('/login', { replace: true });
			}, 3000);
		}
	});

	return <AnnualCheckup />;
}

export default InternalPage;
