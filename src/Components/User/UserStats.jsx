import React from "react";
import Head from "../Helper/Head";
import useFetch from "../../Hooks/useFetch";
import { STATS_GET } from "../../api";
import Loading from "../Helper/Loading";
import Errors from "../Helper/Errors";
const UserStatsGraphs = React.lazy(() => import('./UserStatsGraphs'))
//Utilize o React.lazy e suspense quando tiver uma parte do site muito pesada(Ex: Carregar Libs)
//Ou quando uma parte inteira do seu site tem muitos componentes muito pesados(Melhora performance)
const UserStats = () => {
	const { data, error, loading, request } = useFetch();

	React.useEffect(() => {
		async function getData() {
			const { url, options } = STATS_GET();
			await request(url, options);
		}
		getData();
	}, [request]);

	if (loading) return <Loading />;
	if (error) return <Errors error={error} />;
	if (data)
		return (
			<React.Suspense fallback={<div></div>}>
				<Head title="Estatísticas" />
				<UserStatsGraphs data={data} />
			</React.Suspense>
		);
	else return null;
};

export default UserStats;
