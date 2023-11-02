import { motion } from 'framer-motion';
import { usePositionReorder } from './use-position-reorder';
import { useMeasurePosition } from './use-measure-position';
import { useReducer, useState } from 'react';
import './styles.css';
import { initialState, reducer } from '../gallery copy/action';
import Img from '../gallery copy/own-components/Img';

const Gallery = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const [order, updatePosition, updateOrder] = usePositionReorder(state.images);

	return (
		<div className="grid">
			{order.map((item, i) => (
				<Item
					key={item.id}
					item={item}
					i={i}
					updatePosition={updatePosition}
					updateOrder={updateOrder}
					state={state}
					dispatch={dispatch}
				/>
			))}
		</div>
	);
};
export default Gallery;
function Item({ i, item, updatePosition, updateOrder, state, dispatch }) {
	const [isDragging, setDragging] = useState(false);

	const ref = useMeasurePosition((pos) => updatePosition(i, pos));

	return (
		<motion.div
			ref={ref}
			layout
			initial={false}
			className="item"
			style={{
				background: 'white',

				borderRadius: 5,
				zIndex: isDragging ? 3 : 1,

				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				fontSize: 24,
			}}
			whileHover={{
				scale: 1.03,
				boxShadow: '0px 3px 3px rgba(0,0,0,0.15)',
			}}
			whileTap={{
				scale: 1.12,
				boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
			}}
			drag={true}
			onDragStart={() => setDragging(true)}
			onDragEnd={() => setDragging(false)}
			onViewportBoxUpdate={(viewportBox, _) => {
				isDragging && updateOrder(i, viewportBox);
			}}
		>
			<Img data={item} state={state} dispatch={dispatch} />
		</motion.div>
	);
}

// const items = [
// 	0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
// ];
