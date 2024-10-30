import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import styles from "./UserHeaderNav.module.css";
import useMedia from "../../Hooks/useMedia";

const UserHeaderNav = () => {
	const { userLogout } = React.useContext(UserContext);
	const mobile = useMedia("(max-width: 40rem)");
	const [mobileMenu, setMobileMenu] = React.useState(false);

	//fecha o menu ao selecionar uma das paginas
	const {pathname} = useLocation();
	React.useEffect(() => {
		setMobileMenu(false);
	}, [pathname])

	return (
		<>
			{/* Botao so aparece se estiver no mobile */}
			{mobile && (
				<button
				type="button"
					className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`}
					aria-label="Menu"
					onClick={() => setMobileMenu(!mobileMenu)}
				></button>
			)}
			<nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
				{/* O end serve para que o /conta nao fique ativo em todos os itens do header */}
				<NavLink to="/conta" end>
					<MinhasFotos />
					{mobile && "Minhas fotos"}
				</NavLink>
				<NavLink to="/conta/estatisticas">
					<Estatisticas />
					{mobile && "Estatisticas"}
				</NavLink>
				<NavLink to="/conta/postar">
					<AdicionarFoto />
					{mobile && "Adicionar Foto"}
				</NavLink>
				<button type="button" onClick={userLogout}>
					<Sair />
					{mobile && "Sair"}
				</button>
			</nav>
		</>
	);
};

export default UserHeaderNav;
