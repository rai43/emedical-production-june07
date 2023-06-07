import { createEffect, onMount } from 'solid-js';
import QRCode from 'qrcode';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import logoCnps from '../../../assets/logoCnps.jpeg';
import stamp from '../../../assets//stamp.png';

import { rightSidebarState } from '../../../data/rightSidebarState';

const BeneficiaryCard = () => {
	let cardPdf;
	const onDownload = async () => {
		const element = cardPdf;
		const canvas = await html2canvas(element, {
			allowTaint: true,
			useCORS: true,
		});

		const data = canvas.toDataURL('image/jpg');
		const link = document.createElement('a');

		if (typeof link.download === 'string') {
			link.href = data;
			const now = new Date();
			link.download =
				'CARD_' + rightSidebarState.extraObject?.data?.family_name + '_ON_' + now.toLocaleDateString() + '_AT_' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + '.jpg';

			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	};
	// const onDownload = () => {
	// 	const doc = new jsPDF();

	// 	doc.html(cardPdf, {
	// 		callback: function (doc) {
	// 			// Save the PDF
	// 			doc.save('card.pdf');
	// 		},
	// 		x: 15,
	// 		y: 15,
	// 		width: 170, //target width in the PDF document
	// 		windowWidth: 650, //window width in CSS pixels
	// 	});
	// };

	let qrCodeCanvasRef;

	createEffect(() => {
		let qrCodeData = {
			family_name: rightSidebarState.extraObject?.data?.family_name?.toLocaleUpperCase(),
			first_name: rightSidebarState.extraObject?.data?.first_name?.toLocaleUpperCase(),
			matricule: rightSidebarState.extraObject?.data?.id_number?.toLocaleUpperCase(),
			health_card_id: rightSidebarState.extraObject?.data?.health_card_id?.toLocaleUpperCase(),
			blood_group: rightSidebarState.extraObject?.data?.blood_group?.toLocaleUpperCase(),
		};
		qrCodeData = JSON.stringify(qrCodeData);
		QRCode.toCanvas(
			qrCodeCanvasRef,
			// QR code doesn't work with an empty string
			// so I'm using a blank space as a fallback
			qrCodeData || ' ',
			(error) => error && console.error(error)
		);
	});

	return (
		<>
			<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 my-7'>
				<div
					class='col-start-2 mx-auto'
					ref={cardPdf}
				>
					<div class='w-[273px] h-[432px] rounded-lg shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]'>
						<div class='grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-1 mt-7 p-3 justify-items-center'>
							<div class='col-start-2'>
								<img
									src={logoCnps}
									alt='LinqSC Admin'
									class='w-48 inline-block'
									style={{ 'max-width': '120px', 'max-height': '120px' }}
								></img>
							</div>
						</div>
						<div class='grid grid-cols-1 md:grid-cols-4 gap-x-2 gap-y-2 px-3 py-4 justify-self-center text-sm'>
							<div class='font-bold col-span-2'>Nom</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.family_name?.toLocaleUpperCase()}</div>
							<div class='font-bold col-span-2'>Prénoms</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.first_name?.toLocaleUpperCase()?.slice(0, 10)}</div>
							<div class='font-bold col-span-2'>Matricule</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.id_number?.toLocaleUpperCase()}</div>
							<div class='font-bold col-span-2'>N carte de santé</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.health_card_id?.toLocaleUpperCase()}</div>
							<div class='font-bold col-span-2'>Groupe sanguin</div>
							<div class='col-span-2 font-semibold'>{rightSidebarState.extraObject?.data?.blood_group?.toLocaleUpperCase()}</div>
						</div>
						<div class='grid grid-rows-1 grid-flow-col gap-1 p-3'>
							<div class='row-span-3'>
								<img
									// crossorigin='anonymous'
									class='w-full h-full object-cover'
									src={`${import.meta.env.VITE_APP_ASSETS_URL}/${rightSidebarState.extraObject?.data?.picture}`}
									alt='Preview'
									style={{ 'max-width': '120px', 'max-height': '120px', 'object-fit': 'fill', overflow: 'hidden' }}
								/>
							</div>
							<div class='col-span-2 mx-auto'>
								<canvas
									style={{ 'max-width': '80px', 'max-height': '80px' }}
									class=''
									ref={qrCodeCanvasRef}
								/>
							</div>
							<div class='col-span-2 mx-auto'>
								<div class='text-xs w-full'>Signature et cachet</div>
							</div>
							<div class='col-span-2 mx-auto'>
								<img
									class='w-full h-full object-cover'
									src={stamp}
									alt='Preview'
									style={{ 'max-width': '60px', 'max-height': '60px', 'object-fit': 'fill', overflow: 'hidden' }}
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<button
				class='btn btn-outline btn-primary'
				onClick={onDownload}
				type='button'
			>
				Télécharger
			</button>
		</>
	);
};

export default BeneficiaryCard;
