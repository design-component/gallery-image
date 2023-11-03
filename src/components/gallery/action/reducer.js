import { initialState } from './initialState';
import { arrayMoveImmutable } from 'array-move';
import { findIndex } from './use-position-reorder';

export const reducer = (state = initialState, action) => {
	// payload data
	const data = action.payload;

	switch (action.type) {
		case 'ADD_IMG':
			// get id
			const max = state.images.reduce((maxValue, currentItem) => {
				return currentItem.id > maxValue ? currentItem.id : maxValue;
			}, state.images[0]?.id);

			// new images get
			const newImages = Array.from(data).map((image, i) => {
				const imageUrl = URL.createObjectURL(image);
				return {
					id: max ? max + i + 1 : i + 1,
					url: imageUrl,
					selected: false,
				};
			});

			// new images will set here
			if (data) {
				return {
					...state,
					images: [...state.images, ...newImages],
				};
			}

			return {
				...state,
				images: [...state.images],
			};

		// filtering images by to id
		case 'DELETE':
			return {
				...state,
				selected: [],
				images: state.images.filter((e) => !state.selected.includes(e.id)),
			};

		// checkbox selected image need to set other variable
		case 'SELECTED':
			const { id, value } = data;
			return {
				...state,
				// checking id is here or not
				// if get id just remove from array otherwise add new
				selected: state.selected.includes(id)
					? state.selected.filter((e) => e !== id)
					: [...state.selected, id],

				// need update to also status checked or not
				// if get id update by input checked value
				images: state.images.map((e) => {
					if (e.id === id) {
						return {
							...e,
							selected: value,
						};
					} else
						return {
							...e,
						};
				}),
			};

		// update order array of images
		case 'UPDATE_ORDER':
			const { i, viewportBox, positions } = data;
			// get target index
			const targetIndex = findIndex(i, viewportBox, positions);

			// if index is my not dispatch index that will move other wise not
			if (targetIndex !== i) {
				const reorderedImages = arrayMoveImmutable(
					state.images,
					i,
					targetIndex
				);

				return {
					...state,
					images: reorderedImages,
				};
			} else {
				return state;
			}

		default:
			return state;
	}
};
