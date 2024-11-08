import React from "react";
import Input from "../Forms/Input";
import Button from "../Forms/Button";
import Errors from "../Helper/Errors";
import useForm from "../../Hooks/useForm";
import useFetch from "../../Hooks/useFetch";
import { PASSWORD_RESET } from "../../api";
import { useNavigate } from "react-router-dom";
import Head from "../Helper/Head";

const LoginPasswordReset = () => {
	const [login, setLogin] = React.useState("");
	const [key, setKey] = React.useState("");
	const password = useForm();
	const { error, loading, request } = useFetch();
	const navigate = useNavigate();

	React.useEffect(() => {
		//Tem acesso ao "token" da url de resetar a senha(enviado no email)
		// o URLSearchParams adiciona na variavel as chaves para serem acessadas diretamente
		const params = new URLSearchParams(window.location.search);
		const key = params.get("key");
		const login = params.get("login");
		if (key) setKey(key);
		if (login) setLogin(login);
	}, []);

	async function handleSubmit(event) {
		event.preventDefault();
		if (password.validate()) {
			const { url, options } = PASSWORD_RESET({
				login,
				key,
				password: password.value,
			});
			const { response } = await request(url, options);
			if (response.ok) navigate("/login");
		}
	}

	return (
		<section className="animeLeft">
			<Head title="Criar nova Senha" />
			<h1 className="title">Redefinir Senha</h1>
			<form onSubmit={handleSubmit}>
				<Input
					label="Nova Senha"
					type="password"
					name="password"
					{...password}
				/>
				{loading ? (
					<Button disabled>Enviando...</Button>
				) : (
					<Button>Confirmar</Button>
				)}
			</form>
			<Errors error={error} />
		</section>
	);
};

export default LoginPasswordReset;
