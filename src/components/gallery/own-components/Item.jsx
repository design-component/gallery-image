import Img from './Img';
import { useState } from 'react';
import { motion } from 'framer-motion';
import style from '../gallery.module.css';
import { useMeasurePosition } from '../action';

export default function Item({
	i,
	item,
	updatePosition,
	positions,
	state,
	dispatch,
}) {
	// check drag is not
	const [isDragging, setDragging] = useState(false);
	// get current position and update
	const ref = useMeasurePosition((pos) => updatePosition(i, pos));

	return (
		<motion.div
			ref={ref}
			layout
			initial={false}
			className={style.item}
			drag={true}
			style={{ zIndex: isDragging ? '3' : '1' }}
			onDragStart={() => setDragging(true)}
			onDragEnd={() => setDragging(false)}
			// drag for useing dispatch update position and items
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
