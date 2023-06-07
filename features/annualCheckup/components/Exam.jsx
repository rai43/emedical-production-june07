import { createSignal } from 'solid-js';
import InputText from '../../../components/Input/InputText';
import SelectBox from '../../../components/Input/SelectBox';
import { GLOBAL_CONSTANTS } from '../../../utils/globalConstantUtil';

const Exam = (props) => {
	const [isOpened, setIsOpened] = createSignal(false);

	return (
		<>
			<div
				tabIndex={0}
				className={`my-3 collapse collapse-plus border border-base-300 bg-base-100 rounded-box ${isOpened() ? 'collapse-open' : 'collapse-close'}`}
			>
				<div
					className='collapse-title text-sm font-medium hover:cursor-pointer'
					onClick={() => setIsOpened((prevState) => !prevState)}
				>
					AGENT:{' '}
					<span class='text-primary capitalize'>
						{props.family_name} {props.first_name} - <span class='text-error'>{props.status}</span>
					</span>
				</div>
				<div className='collapse-content'>
					<div class='mb-4'>
						<div className='divider m-0'>AGENT</div>
						<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1'>
							<div>
								<InputText
									type='text'
									placeholder='Nom'
									defaultValue={props.family_name}
									containerStyle='mt-1'
									labelTitle='Nom'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Prénom(s)'
									defaultValue={props.first_name}
									containerStyle='mt-1'
									labelTitle='Prénom(s)'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Date de naissance'
									defaultValue={props.dob}
									containerStyle='mt-1'
									labelTitle='Date de naissance'
									disabled={true}
								/>
							</div>
							<div>
								<SelectBox
									containerStyle='mt-1'
									labelTitle='Groupe sanguin'
									value={props.blood_group}
									name='blood_group'
									placeholder='Groupe sanguin'
									options={GLOBAL_CONSTANTS.OPTIONS.BLOOD_GROUP_OPTIONS}
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Matricule'
									defaultValue={props.id_number}
									containerStyle='mt-1'
									labelTitle='Matricule'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Genre'
									defaultValue={props.gender}
									containerStyle='mt-1'
									labelTitle='Genre'
									disabled={true}
								/>
							</div>

							<div class='col-span-2'>
								<InputText
									type='text'
									placeholder='Direction'
									defaultValue={props.direction}
									containerStyle='mt-1'
									labelTitle='Direction'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder="Type d'examen"
									defaultValue={props.examType}
									containerStyle='mt-1'
									labelTitle="Type d'examen"
									disabled={true}
								/>
							</div>
							<div class='col-span-2'>
								<InputText
									type='text'
									placeholder='Fonction'
									defaultValue={props.job_title}
									containerStyle='mt-1'
									labelTitle='Fonction'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Date de création'
									defaultValue={props.created_at}
									containerStyle='mt-1'
									labelTitle='Date de création'
									disabled={true}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Exam;
