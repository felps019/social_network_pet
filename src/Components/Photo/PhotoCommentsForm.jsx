import React from "react";
import Enviar from "../../Assets/enviar.svg?react";
import useFetch from "../../Hooks/useFetch";
import Errors from "../Helper/Errors";
import { COMMENT_POST } from "../../api";
import styles from './PhotoCommentsForm.module.css'

const PhotoCommentsForm = ({ id, setComments }) => {
	const [comment, setComment] = React.useState("");
	const { request, error } = useFetch();

	async function handleSubmit(event) {
		event.preventDefault();
		const { url, options } = COMMENT_POST(id, { comment });
		const { response, json } = await request(url, options);
		if (response.ok) {
			setComment("");
			setComments((comments) => [...comments, json]);
		}
	}

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<textarea
				id="comment"
				name="comment"
				className={styles.textarea}
				placeholder="Add a comment"
				value={comment}
				onChange={({ target }) => setComment(target.value)}
			/>
			<button type="submit" className={styles.button}>
				<Enviar />
			</button>
			<Errors error={error} />
		</form>
	);
};

export default PhotoCommentsForm;
