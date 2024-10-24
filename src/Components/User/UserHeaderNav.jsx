import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import MinhasFotos from "../../Assets/feed.svg?react";
import Estatisticas from "../../Assets/estatisticas.svg?react";
import AdicionarFoto from "../../Assets/adicionar.svg?react";
import Sair from "../../Assets/sair.svg?react";
import styles from './UserHeaderNav.module.css'

const UserHeaderNav = () => {
  const [mobile, setMobile] = React.useState(null)
	const { userLogout } = React.useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    userLogout();
    navigate('/login');
  }

	return (
		<nav className={styles.nav}>
      {/* O end serve para que o /conta nao fique ativo em todos os itens do header */}
			<NavLink to="/conta" end> 
				<MinhasFotos /> 
        {mobile && 'Minhas fotos'}
			</NavLink>
			<NavLink to="/conta/estatisticas">
				<Estatisticas />
        {mobile && 'Estatisticas'}
			</NavLink>
			<NavLink to="/conta/postar">
				<AdicionarFoto />
        {mobile && 'Adicionar Foto'}
			</NavLink>
			<button type="button" onClick={userLogout}>
				<Sair />
        {mobile && 'Sair'}
			</button>
		</nav>
	);
};

export default UserHeaderNav;
