import style from './gallery.module.css';
import Item from './own-components/Item';
import { useReducer, useRef } from 'react';
import Header from './own-components/Header';
import { initialState, reducer } from './action';
import { AddImage } from './own-components/AddImage';
import dummyImage from '../../assets/images/dummy-image.png';

const Gallery = () => {
	// position for dnd
	const positions = useRef([]).current;
	const updatePosition = (i, offset) => (positions[i] = offset);

	// manage state use reducer
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<div className={style['image-gallery-layout']}>
			<div className={style['image-gallery-wrap']}>
				{/* header of gallery  */}
				<Header state={state} dispatch={dispatch} />

				<div className={style['image-gallery-box']}>
					<div className={style['images-grid']}>
						{/* all [] of images that loop here */}
						{state.images.length > 0 ? (
							state.images.map((item, i) => (
								<Item
									key={item.id}
									item={item}
									i={i}
									positions={positions}
									updatePosition={updatePosition}
									state={state}
									dispatch={dispatch}
								/>
							))
						) : (
							<div className={style.item}>
								{/* if no images here that will show  */}
								<div className={`${style.imageWrap}`}>
									<img src={dummyImage} alt="dummy-image" />
								</div>
							</div>
						)}

						{/* add new image  */}
						<AddImage state={state} dispatch={dispatch} />
					</div>
				</div>
			</div>
		</div>
	);
};
export default Gallery;
