const Collapse = (props) => {
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
						{exam.agent.family_name} - {exam.status}
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
									defaultValue={exam.agent.family_name}
									containerStyle='mt-1'
									labelTitle='Nom'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Prénom(s)'
									defaultValue={exam.agent.first_name}
									containerStyle='mt-1'
									labelTitle='Prénom(s)'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Date de naissance'
									defaultValue={moment(exam.agent.dob).format('DD-MM-YYYY')}
									containerStyle='mt-1'
									labelTitle='Date de naissance'
									disabled={true}
								/>
							</div>
							<div>
								<SelectBox
									containerStyle='mt-1'
									labelTitle='Groupe sanguin'
									value={exam.agent.blood_group}
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
									defaultValue={exam.agent.id_number}
									containerStyle='mt-1'
									labelTitle='Matricule'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Direction'
									defaultValue={exam.agent.direction}
									containerStyle='mt-1'
									labelTitle='Direction'
									disabled={true}
								/>
							</div>
							<div class='col-span-2'>
								<InputText
									type='text'
									placeholder='Fonction'
									defaultValue={exam.agent.job_title}
									containerStyle='mt-1'
									labelTitle='Fonction'
									disabled={true}
								/>
							</div>
							<div>
								<InputText
									type='text'
									placeholder='Genre'
									defaultValue={exam.agent.gender}
									containerStyle='mt-1'
									labelTitle='Genre'
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

export default Collapse;
