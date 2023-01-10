import React from 'react';
import { Link } from 'react-router-dom';
import AddAvatar from '../img/addAvatar.png';

const Register = () => {
  return (
    // container
    <div className="min-h-[100vh] grid place-items-center bg-slate-300">
      {/* wrapper */}
      <div className="min-w-[450px] bg-white text-center font-base p-8 rounded-xl">
        <div className="mb-12">
          <h2 className="title">LT Chat</h2>
          <p className="text-slate-600 text-lg">Registrar Conta</p>
        </div>
        <form className="flex flex-col gap-4 text-slate-600">
          <div>
            <input
              className="input_styles"
              type="text"
              placeholder="Nome de usuário"
            />
          </div>
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
          <div>
            <label
              htmlFor="file"
              className="flex items-center gap-4 cursor-pointer"
            >
              <input className="hidden" type="file" id="file" />
              <img src={AddAvatar} alt="" width={45} height={45} />
              <span className="text-slate-600">Selecione seu avatar</span>
            </label>
          </div>
          <button className="btn mb-2" type="submit">
            Registrar
          </button>
        </form>
        <p className="text-sm text-slate-600">
          Já possui uma conta?{' '}
          <Link to="/login" className="underline text-blue-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
