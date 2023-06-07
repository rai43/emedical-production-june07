import AgGridSolid from 'ag-grid-solid';
import { Show, createEffect, createResource, createSignal, lazy } from 'solid-js';
import moment from 'moment';
import axios from 'axios';
import toast from 'solid-toast';
import { useNavigate } from '@solidjs/router';

const TitleCard = lazy(() => import('../../../components/Cards/TitleCard'));

import { openBeneficiaryModal } from '../../../data/modalState/beneficiarySlice';
import { reloadAppAfterOperation, setBeneficiariesList } from '../../../data/mainStoreFunctions';
import { isUserLoggedIn } from '../../../components/helpers/AuthenticationService';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import SuspenseContent from '../../../containers/SuspenseContent';
import { openModal } from '../../../data/modalState';

const checkIfCheckupExistsForThisYear = async () => {
	if (localStorage.getItem('token') || appStore.userLoginInfo.token) {
		let response;
		try {
			response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/checkup/check/cicefty`, {
				headers: {
					'Content-Type': 'application/json',
				},
				authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
			});
		} catch (err) {
			toast.error('Erreur lors du check');
		}
		return response;
	}
};

const [fetcherSgn, setFetcherSgn] = createSignal(1);
export const [checkRessource, { checkMutate, checkrefetch }] = createResource(fetcherSgn(), checkIfCheckupExistsForThisYear);

const annualCheckupModalConfig = {
	title: `Bilan de santé du personnel`,
	size: 'lg',
	bodyType: GLOBAL_CONSTANTS.MODAL_BODY_TYPES.ANNUAL_CHECKUP_NEW,
	extraObject: {},
};

const onSelectionChanged = () => {
	const selectedRows = gridOptions.api.getSelectedRows();
};

const saveNewCheckup = async (collectedJsonValues) => {
	const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/checkup/create-new-checkup', collectedJsonValues, {
		headers: {
			'Content-Type': 'application/json',
		},
		authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
	});
	return response;
};

const submit = () => {
	const collectedJsonValues = JSON.stringify({ created_by: localStorage.getItem('userId') });

	toast.promise(saveNewCheckup(collectedJsonValues), {
		loading: `Ajout du bilan pour l'année ${new Date().getFullYear()}`,
		success: (val) => {
			reloadAppAfterOperation();
			return <span>le bilan pour l'année ${new Date().getFullYear()} a été ajouté</span>;
		},
		error: () => {
			return <span>Erreur lors de la création. Verifier les données et réessayer</span>;
		},
	});
};

const TopSideButtons = () => {
	return (
		<div class='inline-block float-right'>
			<button
				class='btn px-6 btn-sm normal-case btn-primary'
				onClick={submit}
			>
				Créer bilan de santé du personnel - {new Date().getFullYear()}
			</button>
		</div>
	);
};

const fetchAnnualChecks = async () => {
	if (localStorage.getItem('token') || appStore.userLoginInfo.token) {
		let response;
		try {
			response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/checkup/gcfael`);
		} catch (err) {
			toast.error("Erreur lors de l'obtention de la liste des bénéficiaires");
		}
		return response;
	}
};

const [fetcherSignal, setFetcherSignal] = createSignal(1);
export const [annualChecksRessource, { mutate, refetch }] = createResource(fetcherSignal(), fetchAnnualChecks);

const ManageAnnualCheckup = (props) => {
	const navigate = useNavigate();

	createEffect(() => {
		if (annualChecksRessource.error) {
			if (!isUserLoggedIn()) {
				toast.error('Oops! il semble que votre session a expiré. Reconnectez-vous.');
				setTimeout(() => {
					return navigate('/login', { replace: true });
				}, 3000);
			}
		}
	});

	const containFilterParams = {
		filterOptions: ['contains', 'notContains'],
		debounceMs: 200,
		maxNumConditions: 1,
	};

	const columnsDefs = [
		{
			field: 'id_number',
			headerName: 'Date de creation',
			width: 250,
			pinned: true,
			filterParams: containFilterParams,
			rowSelection: 'single',
			onSelectionChanged: onSelectionChanged,
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>{moment(cellValue).format('DD/MM/YYYY HH:mm')}</span>;
			},
			// onCellClicked: (params) => cellClickedHandler(params.data),
		},
		{
			field: 'label',
			headerName: 'Libélé',
			width: 300,
			filter: 'agDateColumnFilter',
		},
		{
			field: 'year',
			headerName: 'Année',
			width: 250,
			filter: 'agDateColumnFilter',
		},
		{
			field: 'exams_list',
			headerName: "Nombre d'agents",
			width: 250,
			filterParams: containFilterParams,
			valueGetter: (val) => {
				const value = val.data.exams_list.length;
				return value;
			},
		},
		{
			field: 'created_by.family_name',
			headerName: 'Crée par',
			width: 250,
			pinned: 'right',
			filter: 'agDateColumnFilter',
			cellRenderer: (value) => {
				const cellValue = value.valueFormatted ? value.valueFormatted : value.value;
				return <span class='font-bold'>Dr. {cellValue}</span>;
			},
		},
	];

	return (
		<>
			<Show
				when={!annualChecksRessource.loading && !checkRessource.loading}
				fallback={<SuspenseContent />}
			>
				<TitleCard
					title={'Bilan de santé du personnel'}
					topMargin='mt-1'
					TopSideButtons={!checkRessource().data.exists && TopSideButtons}
				>
					<div
						class={'ag-theme-alpine'}
						style={{ height: '32rem' }}
					>
						<AgGridSolid
							columnDefs={columnsDefs}
							// rowData={appStore.beneficiariesList}
							rowData={annualChecksRessource().data.checkup}
							defaultColDef={GLOBAL_CONSTANTS.BENEFICIARY_DEFAULT_COL_DEF}
							pagination={true}
							paginationPageSize={15}
							onSelectionChanged={(val) => {
								const selectedObject = val.api.getSelectedRows()[0];
								openModal({
									...annualCheckupModalConfig,
									title: selectedObject.label,
									extraObject: {
										data: selectedObject,
										config: { openInReadOnlyMode: true },
									},
								});
							}}
							rowSelection='single'
						/>
					</div>
				</TitleCard>
			</Show>
		</>
	);
};

export default ManageAnnualCheckup;
