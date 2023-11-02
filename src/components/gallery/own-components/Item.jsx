import { motion } from 'framer-motion';
import { useState } from 'react';
import style from '../gallery.module.css';
import Img from './Img';
import { useMeasurePosition } from '../action';
export default function Item({
	i,
	item,
	updatePosition,
	positions,
	state,
	dispatch,
}) {
	const [isDragging, setDragging] = useState(false);
	const ref = useMeasurePosition((pos) => updatePosition(i, pos));

	return (
		<motion.div
			ref={ref}
			layout
			initial={false}
			className={style.item}
			drag={true}
			onDragStart={() => setDragging(true)}
			onDragEnd={() => setDragging(false)}
			// eslint-disable-next-line no-unused-vars
			onViewportBoxUpdate={(viewportBox, _) => {
				isDragging &&
					dispatch({
						type: 'UPDATE_ORDER',
						payload: {
							i: i,
							viewportBox: viewportBox,
							positions: positions,
						},
					});
			}}
		>
			<Img data={item} state={state} dispatch={dispatch} />
		</motion.div>
	);
}
