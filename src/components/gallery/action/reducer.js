import { initialState } from './initialState';
import { arrayMoveImmutable } from 'array-move';
import { findIndex } from './use-position-reorder';

export const reducer = (state = initialState, action) => {
	console.log(state);
	const data = action.payload;
	switch (action.type) {
		case 'ADD_IMG':
			const max = state.images.reduce((maxValue, currentItem) => {
				return currentItem.id > maxValue ? currentItem.id : maxValue;
			}, state.images[0]?.id);

			const newImages = Array.from(data).map((image, i) => {
				const imageUrl = URL.createObjectURL(image);
				return {
					id: max ? max + i + 1 : i + 1,
					url: imageUrl,
					selected: false,
				};
			});
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
		case 'DELETE':
			return {
				...state,
				selected: [],
				images: state.images.filter((e) => !state.selected.includes(e.id)),
			};
		case 'SELECTED':
			const { id, value } = data;
			return {
				...state,
				selected: state.selected.includes(id)
					? state.selected.filter((e) => e !== id)
					: [...state.selected, id],
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

		case 'UPDATE_ORDER':
			const { i, viewportBox, positions } = action.payload;
			const targetIndex = findIndex(i, viewportBox, positions);

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

		case 'DND':
			return {
				...state,
				selected: [],
				images: action.payload.map((e) => ({ ...e, selected: false })),
			};
		default:
			return state;
	}
};
