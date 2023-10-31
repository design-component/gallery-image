import { useReducer, useState } from 'react';
import { AddImage } from './AddImage';
import style from './gallery.module.css';
import Header from './own-components/Header';
import Img from './own-components/Img';
import dummyImage from '../../assets/images/dummy-image.png';
import { reducer, initialState } from './action';
import { Reorder, useDragControls } from 'framer-motion';

const Gallery = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const controls = useDragControls();

	const ids = state.images.map((element) => {
		return element.id;
	});
	console.log(ids);
	return (
		<div className={style['image-gallery-layout']}>
			<div className={style['image-gallery-wrap']}>
				<Header state={state} dispatch={dispatch} />
				<div className={style['image-gallery-box']}>
					<div className={style['images-grid']}>
						{state.images.length > 0 ? (
							<Reorder.Group
								axis="y"
								dragControls={controls}
								values={state.images}
								onReorder={(reorderedImages) =>
									dispatch({ type: 'DND', payload: reorderedImages })
								}
							>
								{state.images.map((image) => (
									<Reorder.Item key={image.id} value={image}>
										<Img data={image} state={state} dispatch={dispatch} />
									</Reorder.Item>
								))}
								<AddImage state={state} dispatch={dispatch} />
							</Reorder.Group>
						) : (
							<div className="photo-up">
								<div className={`${style.image}`}>
									<img src={dummyImage} alt="dummy-image" />
								</div>
							</div>
						)}
						{/* <AddImage state={state} dispatch={dispatch} /> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
