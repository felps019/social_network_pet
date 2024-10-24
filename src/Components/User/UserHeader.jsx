import React from 'react'
import UserHeaderNav from './UserHeaderNav'
import styles from './UserHeader.module.css'
import { useLocation } from 'react-router-dom';

const UserHeader = () => {
  const [title, setTitle] = React.useState('');
  const location = useLocation();

  //Muda o titulo da pagina quando clicar no icon
  //atraves do pathname do location ele muda o endereco toda vez que mudar o location
  React.useEffect(() => {
    const {pathname} = location;
    switch(pathname) {
      case '/conta/postar':
        setTitle('Poste sua foto');
        break;
      case '/conta/estatisticas':
        setTitle('Estatísticas');
        break;
      default:
        setTitle('Minha Conta');
    }
  },[location]);

  return (
    <header className={styles.header}> 
      <h1 className='title'>{title}</h1>
      <UserHeaderNav />
    </header>
  )
}

export default UserHeader
