import React from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../firebase';
import AddAvatar from '../img/addAvatar.png';

const Register = () => {
  const [err, setErr] = React.useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', res.user.uid), {
              displayName,
              email,
              photoURL: downloadURL,
              uid: res.user.uid,
            });

            await setDoc(doc(db, 'userChats', res.user.uid), {});
            navigate('/');
          } catch (error) {
            const errorMessage = error.message;
            setErr(errorMessage);
          }
        });
      });
    } catch (error) {
      const errorMessage = error.message;
      setErr(errorMessage);
    }
  };

  return (
    <div className="min-h-[100vh] grid place-items-center bg-slate-300">
      <div className="min-w-[450px] bg-white text-center font-base p-8 rounded-xl">
        <div className="mb-12">
          <h2 className="title">LT Chat</h2>
          <p className="text-slate-600 text-lg">Registrar Conta</p>
        </div>
        <form
          className="flex flex-col gap-4 text-slate-600"
          onSubmit={handleSubmit}
        >
          <div>
            <input
              className="input_styles"
              type="text"
              placeholder="Nome"
              required
            />
          </div>
          <div>
            <input
              className="input_styles"
              type="email"
              placeholder="E-mail"
              required
            />
          </div>
          <div>
            <input
              className="input_styles"
              type="password"
              placeholder="Senha"
              required
            />
          </div>
          <div>
            <label
              htmlFor="file"
              className="flex items-center gap-4 cursor-pointer"
            >
              <input className="hidden" type="file" id="file" required />
              <img src={AddAvatar} alt="" width={45} height={45} />
              <span className="text-slate-600">Selecione seu avatar</span>
            </label>
          </div>
          <button className="btn mb-2" type="submit">
            Registrar
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
