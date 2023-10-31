import { createContext } from 'react';
export const UseGallery = createContext();
function GalleryContext({ children }) {
	const value = {
		data: '',
	};
	return <UseGallery.Provider value={value}>{children}</UseGallery.Provider>;
}

export default GalleryContext;
