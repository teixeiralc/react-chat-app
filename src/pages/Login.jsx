import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    // container
    <div className="min-h-[100vh] grid place-items-center bg-orange-500">
      {/* wrapper */}
      <div className="min-w-[450px] bg-white text-center font-base p-8 rounded-xl">
        <div className="mb-12">
          <h2 className="title">LT Chat</h2>
          <p className="text-slate-600 text-lg">Faça login na sua conta</p>
        </div>
        <form className="flex flex-col gap-4 text-slate-600">
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
