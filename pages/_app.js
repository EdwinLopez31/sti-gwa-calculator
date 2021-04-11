import '../styles/globals.scss'
import Layout from '../components/Layout'
import GradesState from '../components/context/GradesState'

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<GradesState>
				<Component {...pageProps} />
			</GradesState>
		</Layout>
	)
}

export default MyApp
