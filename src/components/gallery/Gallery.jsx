import { useReducer } from 'react';
import { images } from '../../data';
import { AddImage } from './AddImage';
import style from './gallery.module.css';
import Header from './own-components/Header';
import Img from './own-components/Img';
import dummyImage from '../../assets/images/dummy-image.png';
import { reducer, initialState } from './action';

const Gallery = () => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return (
		<div className={style['image-gallery-layout']}>
			<div className={style['image-gallery-wrap']}>
				<Header state={state} dispatch={dispatch} />
				<div className={style['image-gallery-box']}>
					<div className={style['images-grid']}>
						{state.images.length > 0 ? (
							state.images.map((e) => (
								<Img key={e.id} data={e} state={state} dispatch={dispatch} />
							))
						) : (
							<div className={`${style.image}`}>
								<img src={dummyImage} alt="dummy-image" />
							</div>
						)}
						<AddImage state={state} dispatch={dispatch} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Gallery;
