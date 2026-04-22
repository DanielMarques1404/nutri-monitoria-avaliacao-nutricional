import { useState } from "react";
import { useAuthContext } from "../../app/hooks/useAuthContext";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { Button } from "../../components/ui/Button";

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
            toast.success("Login efetuado com sucesso!");
            navigate('/admin/admin');
        } catch (error) {
            console.error("Falha ao efetuar login", error);
            toast.error("Falha no login");
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
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col gap-2 border border-blue-500 p-4 rounded-md" onSubmit={loginUser}>
                <h2 className="text-xl font-bold">Login</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Digite seu email"
                    value={credentials.email}
                    onChange={handleChange}
                    className="p-4"
                    required
                />
                <h2 className="text-lg font-semibold">Senha</h2>
                <input
                    type="password"
                    name="password"
                    placeholder="Digite sua senha"
                    value={credentials.password}
                    onChange={handleChange}
                    className="p-4"
                    required
                />
                <Button classname="bg-light-green text-center p-2 rounded-md text-white font-ubuntu text-2xl my-2" type="submit" label={"Entrar"} />
            </form>
        </div>
    );
};