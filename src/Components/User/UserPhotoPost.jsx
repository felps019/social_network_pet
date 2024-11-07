import React from "react";
import styles from "./UserPhotoPost.module.css";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Errors from "../Helper/Errors";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_POST } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const UserPhotoPost = () => {
	const nome = useForm();
	const peso = useForm("number");
	const idade = useForm("number");
	const [img, setImg] = React.useState({});
	const { data, error, loading, request } = useFetch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if(data) navigate('/conta');
  },[data, navigate])

	// sera necessario fazer um formData por conta do arquivo de midia
	//Caso fosse somente texto daria para retornar com json normalmente
	function handleSubmit(event) {
		event.preventDefault();
		const formData = new FormData();
		formData.append("img", img.raw);
		formData.append("nome", nome.value);
		formData.append("peso", peso.value);
		formData.append("idade", idade.value);

		const token = window.localStorage.getItem("token");
		const { url, options } = PHOTO_POST(formData, token);
		request(url, options);
	}

	function handleImgChange({ target }) {
		setImg({
			preview: URL.createObjectURL(target.files[0]), //Aparece uma pre visualizacao de como vai ficar a foto
			raw: target.files[0],
		});
	}

	return (
		<section className={`${styles.photoPost} animeLeft`}>
			<Head title='Poste sua foto' description='Perfil do usuário'/>
			<form onSubmit={handleSubmit}>
				<Input label="Nome" type="text" name="nome" {...nome} />
				<Input label="Peso" type="number" name="Peso" {...peso} />
				<Input label="Idade" type="number" name="Idade" {...idade} />
				<Input
					className={styles.file}
					type="file"
					name="img"
					id="img"
					onChange={handleImgChange}
				/>
        {loading ? <Button disabled>Enviando...</Button> : <Button>Enviar</Button>}
        <Errors error={error}/>
			</form>
			<div>
				{img.preview && (
					<div
						className={styles.preview}
						style={{ backgroundImage: `url('${img.preview}')` }}
					></div>
				)}
			</div>
		</section>
	);
};

export default UserPhotoPost;
