import { useState } from "react";
// import { toast } from "react-toastify";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { useNavigate } from "react-router";

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const { login } = useAuthContext();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [name]: value,
        }));
    };

    const loginUser = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            login && await login(credentials.email, credentials.password);
            // toast.success("Login efetuado com sucesso!");
            navigate('/');
        } catch (error) {
            console.error("Falha ao efetuar login", error);
            // toast.error("Falha no login");
        }
    };

    return (
        // <>
        //     <Figure>
        //         <Image src="/imgs/login.png" />
        //     </Figure>
        //     <div>
        //         <Heading>
        //             Login
        //         </Heading>
        //         <p>Preencha os dados do login.</p>
        //         <Form onSubmit={loginUser}>
        //             <Fieldset>
        //                 <FormLabel>
        //                     Email
        //                 </FormLabel>
        //                 <TextField
        //                     name="email"
        //                     type="email"
        //                     placeholder="Digite seu email"
        //                     value={credentials.email}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </Fieldset>
        //             <Fieldset>
        //                 <FormLabel>
        //                     Senha
        //                 </FormLabel>
        //                 <TextField
        //                     name="password"
        //                     type="password"
        //                     placeholder="Digite sua senha"
        //                     value={credentials.password}
        //                     onChange={handleChange}
        //                     required
        //                 />
        //             </Fieldset>
        //             <FormActions>
        //                 <Button type="submit">
        //                     Efetuar login
        //                 </Button>
        //             </FormActions>
        //         </Form>
        //     </div>
        // </>
        <div>
            <span>Login</span>
            <form onSubmit={loginUser}>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={credentials.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={credentials.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Efetuar login</button>
            </form>
        </div>
    );
};