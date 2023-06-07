import { Show, createEffect, createSignal } from 'solid-js';
import toast from 'solid-toast';
import { reloadAppAfterOperation } from '../../../data/mainStoreFunctions';
import axios from 'axios';

const CheckupElement = (props) => {
	console.log(props.configObj); 
	const [loading, setLoading] = createSignal(false);
	const [editable, setEditable] = createSignal(true);
	const [elementId, setElementId] = createSignal(props?.configObj?._id);

	const [checkupData, setCheckupData] = createSignal({
		data: {
			label: '',
			type: '',
		},
	});

	createEffect(() => console.log(checkupData()));

	const valueChangeHandler = (field, value) => {
		setCheckupData((prevData) => {
			return { ...prevData, data: { ...prevData['data'], [field]: value } };
		});
	};

	const saveCheckupElement = async (collectedJsonValues) => {
		const response = await axios.post(import.meta.env.VITE_BACKEND_URL + '/checkup/add-new', collectedJsonValues, {
			headers: {
				'Content-Type': 'application/json',
			},
			authorization: 'Bearer ' + (localStorage.getItem('token') || appStore.userLoginInfo.token),
		});
		return response;
	};

	const submit = () => {
		setLoading(true);

		if (checkupData().data.label.trim().length === 0 || checkupData().data.type.trim().length === 0) {
			toast.error('Veuillez renseigner correctement les champs.');
			return;
		}

		const collectedJsonValues = JSON.stringify({ ...checkupData().data, created_by: localStorage.getItem('userId') });

		toast.promise(saveCheckupElement(collectedJsonValues), {
			loading: "Ajout de l'examen ...",
			success: (val) => {
				reloadAppAfterOperation();
				setCheckupData({
					data: {
						label: '',
						type: '',
					},
				});
				setEditable(false);
				setLoading(false);
				setElementId(val?.data?.exam?._id);
				return <span>Enregistré</span>;
			},
			error: () => {
				setLoading(false);
				return <span>Erreur lors de la création. Verifier les données et réessayer</span>;
			},
		});
	};

	const deleteExam = () => {
		console.log(elementId());
	};

	return (
		<>
			<div class='grid grid-cols-5 gap-x-4 gap-y-1'>
				<div class='col-span-3'>
					<div class={`form-control w-full mt-1`}>
						<label class='label'>
							<span class={'label-text text-base-content ' + props.labelStyle}>Nom du l'examen</span>
						</label>
						<input
							type='text'
							value={props.configObj?.exam_name || ''}
							name={'label' + props.id}
							placeholder="Nom du l'examen"
							class={'input input-bordered w-full ' + props.inputStyle}
							disabled={props.configObj || !editable() || false}
							onChange={(e) => valueChangeHandler('label', e.target.value)}
						/>
					</div>
				</div>

				<div class='col-span-1'>
					<div class={`inline-block w-full mt-1 ${props.containerStyle}`}>
						<label class={`label  ${props.labelStyle}`}>
							<div class='label-text'>Type</div>
						</label>

						<select
							class={'select select-bordered w-full'}
							value={props.configObj?.exam_type || ''}
							name={'act_name' + props.name}
							disabled={props.configObj || !editable() || false}
							onChange={(e) => valueChangeHandler('type', e.target.value)}
						>
							<option
								disabled
								selected
								value='PLACEHOLDER'
							>
								{props.placeholder}
							</option>
							{(props.options || []).map((o, _) => {
								return (
									<option
										value={o.value || o.name}
										selected={o.value === props.defaultValues?.type}
									>
										{o.name}
									</option>
								);
							})}
						</select>
					</div>
				</div>
				<div class='col-span-1'>
					<div class='grid grid-rows-3 grid-flow-col gap-4'>
						<div class='row-start-1 row-end-4'></div>
					</div>
					<div class={`form-control w-full mt-2 `}>
						<Show
							when={props.configObj || !editable()}
							fallback={
								<button
									class={'btn btn-outline btn-primary w-full'}
									disabled={props.disabled || false}
									onClick={submit}
								>
									Ajouter
								</button>
							}
						>
							<button
								class={'btn btn-outline btn-error w-full'}
								disabled={props.disabled || false}
								onClick={deleteExam}
							>
								Supprimer
							</button>
						</Show>
					</div>
				</div>
			</div>
		</>
	);
};

export default CheckupElement;
