/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import React, { FormEvent, useState } from "react";
import "./Auth.css";
import { IAuthState, validateType } from "./authTypes";
import Button from "./Button/Button";
import Input from "./Input/Input";
import is from 'is_js'

type AuthorizationProps = {
	handleAuthChange: (value: boolean) => void
}

const Authorization = ({ handleAuthChange }: AuthorizationProps): JSX.Element => {
	const [state, setState] = useState<IAuthState>({
		isFormValid: false,
		formControls: {
			email: {
				value: "",
				type: "email",
				label: "Email",
				errorMessage: "Enter your email, for example 'adam@awwwmail.net' ",
				valid: false,
				touched: false,
				validation: {
					required: true,
					email: true,
				},
			},
			password: {
				value: "",
				type: "password",
				label: "Password",
				errorMessage: `Your password must be more than 6 characters`,
				valid: false,
				touched: false,
				validation: {
					required: true,
					minLength: 6,
				},
			},
		},
	})

	const loginHandler = () => {
		const email = state.formControls.email.value
		const password = state.formControls.password.value
		alert(`Welcome! Your email: ${email}. Password: ${password}`)
		if (state.isFormValid) {
			// async post request with auth data
			handleAuthChange(true)
		}
	};

	const registerHandler = () => {
		const email = state.formControls.email.value
		const password = state.formControls.password.value

		// async post request with auth data
		alert(`Your email: ${email}. Password: ${password}. Good to see You!`)
	};

	const submitHandler = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
	};

		const validateControl = ( value: string, validation : validateType) => {
		if (!validation) {
			return true;
		}

		let isValid = true;

		if (validation.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (validation.email) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			isValid = is.email(value) && isValid;
		}

		if (validation.minLength) {
			isValid = value.length >= validation.minLength && isValid;
		}
		return isValid;
	};

	const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>, controlName: string) => {
		const formControls = { ...state.formControls };
		const control = { ...formControls[controlName] };

		control.value = event.target.value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);

		formControls[controlName] = control;

		let isFormValid = true;

		Object.keys(formControls).forEach((name) => {
			isFormValid = formControls[name].valid && isFormValid;
		});

		setState({
			formControls,
			isFormValid,
		});
	};

	const renderInputs = () => {
		return Object.keys(state.formControls).map((controlName, index) => {
			const control = state.formControls[controlName];
			return (
				<Input
					key={controlName + index.toString()}
					type={control.type}
					value={control.value}
					valid={control.valid}
					touched={control.touched}
					label={control.label}
					shouldValidate={!!control.validation}
					errorMessage={control.errorMessage}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChangeHandler(event, controlName)}
				/>
			);
		});
	};

	return (
		<div className="Auth">
			<div>
				<h1>Authorization</h1>

				<form onSubmit={submitHandler} className="AuthForm">
					{renderInputs()}

					<Button
						type="success"
						onClick={loginHandler}
						disabled={!state.isFormValid}
					>
						Sign in
					</Button>

					<Button
						type="primary"
						onClick={registerHandler}
						disabled={!state.isFormValid}
					>
						Sign up
					</Button>
				</form>
			</div>
		</div>
	);
};

export default Authorization;
