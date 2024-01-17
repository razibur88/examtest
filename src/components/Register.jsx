import React, { useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getDatabase,
  ref as dref,
  set,
  push,
  onValue,
} from "firebase/database";
const Register = () => {
  const db = getDatabase();
  const storage = getStorage();
  let navigate = useNavigate();
  const auth = getAuth();
  let [fullname, setFullname] = useState("");
  let [image, setImage] = useState([]);
  let [email, setEmail] = useState("");
  let [password, setPass] = useState("");

  let handleFullname = (e) => {
    setFullname(e.target.value);
  };
  let handleEmail = (e) => {
    setEmail(e.target.value);
  };
  let handlePassword = (e) => {
    setPass(e.target.value);
  };

  let handleFile = (e) => {
    const storageRef = ref(storage, "some-child");

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, e.target.files[0]).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log("File available at", downloadURL);
        set(push(dref(db, "users/")), {
          img: downloadURL,
        }).then(() => {
          alert("done");
        });
      });
    });
  };

  let handleSubmit = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setFullname("");
        setEmail("");
        setPass("");
      })
      .then(() => {
        toast("🦄 Wow so easy!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  useEffect(() => {
    const starCountRef = dref(db, "users/");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val());
      });
      setImage(array);
    });
  }, []);

  console.log(image);
  return (
    <div className="text-center mt-10">
      <h2 className="mb-5">Registration </h2>
      <ToastContainer />
      <div className="">
        <input
          type="text"
          onChange={handleFullname}
          placeholder="Name"
          value={fullname}
          className="w-96 h-10 border-2 "
        />
      </div>
      <div className="my-4">
        <input
          type="email"
          placeholder="Email"
          className="w-96 h-10 border-2 "
          onChange={handleEmail}
          value={email}
        />
      </div>
      <div className="">
        <input
          type="password"
          placeholder="password"
          className="border-2 h-10 w-96 "
          onChange={handlePassword}
          value={password}
        />
      </div>
      <div className="">
        <input type="file" onChange={handleFile} />
      </div>
      <div className="">
        {image.map((item) => (
          <img src={item.img} alt="" />
        ))}
      </div>
      <div className="mt-5">
        <button onClick={handleSubmit} className="p-3 bg-[tomato] text-white">
          Submit
        </button>
      </div>
    </div>
  );
};

export default Register;
