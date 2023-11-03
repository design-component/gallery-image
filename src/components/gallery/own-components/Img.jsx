import style from '../gallery.module.css';

function Img({ data, dispatch }) {
	return (
		<div
			// check selected or not
			className={`${style.image} shadow ${
				data.selected ? style.selected : style.notSelected
			}`}
		>
			<input
				// checkbox select dispatch
				onChange={(e) =>
					dispatch({
						type: 'SELECTED',
						payload: {
							id: data.id,
							value: e.target.checked,
						},
					})
				}
				type="checkbox"
				name=""
				id=""
				checked={data.selected}
				className={style.checkboxSelect}
			/>
			<img src={data.url} alt={'image-' + data.id} />
		</div>
	);
}

export default Img;
