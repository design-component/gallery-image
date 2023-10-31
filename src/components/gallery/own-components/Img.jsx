import style from '../gallery.module.css';

function Img({ data, state, dispatch }) {
	// console.log(state.selected);

	return (
		<div
			className={`${style.image} shadow ${!data.selected && style.selected}`}
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
				className={style.checkboxSelect}
			/>
			<img src={data.url} />
		</div>
	);
}

export default Img;
