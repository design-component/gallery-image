import style from '../gallery.module.css';
function Header({ state, dispatch }) {
	return (
		<div className={style['top-bar-of-gallery']}>
			<div>
				{state.selected.length > 0
					? `${state.selected.length} file selected`
					: 'Gallery'}
			</div>
			<div>
				{state.selected.length > 0 && (
					<button
						className="btn bg-red-500 px-10 py-2 rounded-md text-white"
						onClick={() =>
							dispatch({
								type: 'DELETE',
							})
						}
					>
						Delete
					</button>
				)}
			</div>
		</div>
	);
}

export default Header;
