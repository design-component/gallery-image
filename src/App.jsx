import { Suspense, lazy } from 'react';
import { GalleryLoader } from './components/loader/Loading';
const Gallery = lazy(() => import('./components/gallery'));

export default function App() {
	return (
		<Suspense fallback={<GalleryLoader />}>
			<Gallery />
		</Suspense>
	);
}
