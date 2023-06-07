import { For, createSignal } from 'solid-js';
import InputText from '../../../components/Input/InputText';
import { modalState } from '../../../data/modalState';
import moment from 'moment';
import Exam from './Exam';

const AnnualCheckupAdd = () => {
	return (
		<>
			<div className='divider'>INFORMATIONS - BILAN DE SANTÉ</div>
			<div class='mb-4'>
				<div class='grid grid-cols-1 md:grid-cols-6 gap-x-4 gap-y-1'>
					<div class='col-span-3'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.label}
							containerStyle='mt-1'
							labelTitle='Libélé'
							disabled={true}
						/>
					</div>
					<div class='col-span-3'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.created_by.family_name + ' ' + modalState.extraObject.data.created_by.first_name}
							containerStyle='mt-1'
							labelTitle='Crée par'
							disabled={true}
						/>
					</div>
					<div class='col-span-2'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data && modalState.extraObject.data.year}
							containerStyle='mt-1'
							labelTitle='Année'
							disabled={true}
						/>
					</div>
					<div class='col-span-2'>
						<InputText
							type='text'
							defaultValue={(modalState.extraObject?.data && modalState.extraObject.data.exams_list.length) || 0}
							containerStyle='mt-1'
							labelTitle="Nombre d'examens"
							disabled={true}
						/>
					</div>
					<div class='col-span-2'>
						<InputText
							type='text'
							defaultValue={modalState.extraObject?.data && moment(modalState.extraObject.data.created_at).format('DD/MM/YYYY à HH:mm')}
							containerStyle='mt-1'
							labelTitle='Date de création'
							disabled={true}
						/>
					</div>
				</div>
			</div>
			<div className='divider'>EXAMENS</div>
			<For each={(modalState.extraObject?.data && modalState.extraObject.data.exams_list) || []}>
				{(exam) => (
					<>
						<Exam
							family_name={exam.agent.family_name}
							first_name={exam.agent.first_name}
							dob={moment(exam.agent.dob).format('DD-MM-YYYY')}
							blood_group={exam.agent.blood_group}
							id_number={exam.agent.id_number}
							direction={exam.agent.direction}
							job_title={exam.agent.job_title}
							gender={exam.agent.gender}
							status={exam.status}
							examType={exam.examType}
							created_at={moment(exam.created_at).format('DD-MM-YYYY à HH:mm')}
						/>
					</>
				)}
			</For>
		</>
	);
};

export default AnnualCheckupAdd;
