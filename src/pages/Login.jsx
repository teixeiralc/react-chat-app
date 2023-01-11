import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

const Login = () => {
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setErr(error.message);
    }
  };

  return (
    // container
    <div className="min-h-[100vh] grid place-items-center bg-slate-300">
      {/* wrapper */}
      <div className="min-w-[450px] bg-white text-center font-base p-8 rounded-xl">
        <div className="mb-12">
          <h2 className="title">LT Chat</h2>
          <p className="text-slate-600 text-lg">Faça login na sua conta</p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 text-slate-600"
        >
          <div>
            <input className="input_styles" type="email" placeholder="E-mail" />
          </div>
          <div>
            <input
              className="input_styles"
              type="password"
              placeholder="Senha"
            />
          </div>
          <button className="btn mb-2" type="submit">
            Login
          </button>
        </form>
        {err && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{err}</span>
          </div>
        )}
        <p className="text-sm text-slate-600">
          Não possui uma conta?{' '}
          <Link to="/register" className="underline text-blue-800">
            Registre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
