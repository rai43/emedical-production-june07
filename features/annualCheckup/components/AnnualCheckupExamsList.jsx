import { Show, createEffect, createResource, createSignal } from 'solid-js';
import SuspenseContent from '../../../containers/SuspenseContent';
import TitleCard from '../../../components/Cards/TitleCard';

import { BsPlusLg } from 'solid-icons/bs';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';
import CheckupElement from './CheckupElement';
import toast from 'solid-toast';
import axios from 'axios';

const fetchAnnualCheckExams = async () => {
	if (localStorage.getItem('token') || appStore.userLoginInfo.token) {
		let response;
		try {
			response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/checkup/all-exams`);
		} catch (err) {
			toast.error("Erreur lors de l'obtention de la liste des bénéficiaires");
		}
		return response;
	}
};

const [fetcherSignal, setFetcherSignal] = createSignal(1);
export const [annualCheckExamsRessource, { mutate, refetch }] = createResource(fetcherSignal(), fetchAnnualCheckExams);

function AnnualCheckupExamsList() {
	const [checkupList, setCheckupList] = createSignal([
		<>
			<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
				<CheckupElement options={GLOBAL_CONSTANTS.OPTIONS.ANNUAL_CHECKUP_TYPE_OPTIONS} />
			</div>
		</>,
	]);

	const onAdd = () => {
		setCheckupList((prevList) => [
			...prevList,
			<>
				<div class='grid grid-cols-1 gap-x-4 gap-y-1'>
					<CheckupElement options={GLOBAL_CONSTANTS.OPTIONS.ANNUAL_CHECKUP_TYPE_OPTIONS} />
				</div>
			</>,
		]);
	};

	return (
		<>
			<TitleCard
				title={'Liste examens pour le bilan medical'}
				topMargin='mt-1'
			>
				<Show
					when={!annualCheckExamsRessource.loading}
					fallback={<SuspenseContent />}
				>
					<div class='my-1'>
						<div class='divider m-0'>PRELEVEMENT(S)</div>
						<For each={annualCheckExamsRessource().data.checkup.filter((elt) => elt.exam_type === 'PRELEVEMENT')}>
							{(exam, idx) => (
								<>
									<CheckupElement
										configObj={exam}
										options={GLOBAL_CONSTANTS.OPTIONS.ANNUAL_CHECKUP_TYPE_OPTIONS}
									/>
								</>
							)}
						</For>
						<div class='divider'>RADIO(S)</div>
						<For each={annualCheckExamsRessource().data.checkup.filter((elt) => elt.exam_type === 'RADIO')}>
							{(exam, idx) => (
								<>
									<CheckupElement
										configObj={exam}
										options={GLOBAL_CONSTANTS.OPTIONS.ANNUAL_CHECKUP_TYPE_OPTIONS}
									/>
								</>
							)}
						</For>
						<div class='divider mb-0'>Nouveau(x)</div>
						{checkupList()}
					</div>
					{/* <CreateNewUserForm fromUserProile={true} /> */}
					<div class='flex flex-row-reverse mt-4'>
						<div>
							<button className='btn btn-sm btn-square btn-outline'>
								<BsPlusLg
									onClick={onAdd}
									class='h-6 w-6'
								/>
							</button>
						</div>
					</div>
				</Show>
			</TitleCard>
		</>
	);
}

export default AnnualCheckupExamsList;
