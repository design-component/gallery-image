import style from '../gallery.module.css';

function Header({ state, dispatch }) {
	return (
		<div className={style['top-bar-of-gallery']}>
			<div className="">
				{/* if image will select that show selected otherwise show Gallery  */}
				{state.selected.length > 0 ? (
					<div className="flex gap-1 text-blue-700 items-center ">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>{' '}
						<span className="text-lg ">{`${state.selected.length} file selected`}</span>
					</div>
				) : (
					<span className="text-lg font-bold">Gallery</span>
				)}
			</div>
			<div>
				{state.selected.length > 0 && (
					<button
						className="btn bg-red-500 px-10 py-1 rounded-md text-white"
						// delete dispatch
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
