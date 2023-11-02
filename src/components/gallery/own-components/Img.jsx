import style from '../gallery.module.css';

function Img({ data, dispatch }) {
	return (
		<div
			className={`${style.image} shadow ${
				data.selected ? style.selected : style.notSelected
			}`}
		>
			<input
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
			<img src={data.url} />
		</div>
	);
}

export default Img;
