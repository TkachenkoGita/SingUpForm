import { useEffect, useState } from "react";
import { FaUserPen } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import styles from "./SingUpForm.module.css";

function SingUpForm() {
  const [userName, setUserName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [nameDirty, setNameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
  const [nameError, setNameError] = useState("Name can't be empty");
  const [emailError, setEmailError] = useState("Email can't be empty");
  const [passwordError, setPasswordError] = useState("Password can't be empty");
  const [confirmPasswordError, setConfirmPasswordError] = useState(
    "This holder can't be epty"
  );
  const [formValid, setFormValid] = useState(false);
  const [open, setOpen] = useState(false);
  const [agree, setAgree]= useState(false)
 

  useEffect(() => {
    if (
      nameError &&
      emailError &&
      passwordError &&
      confirmPasswordError &&
      handlePasswordConfirmation
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [
    nameError,
    emailError,
    passwordError,
    confirmPasswordError,
    handlePasswordConfirmation,
  ]);

  function handleNameChange({ target: { value } }) {
    setUserName(value);
    const uName = /^[A-Za-zrfc ]+$/;
    if (!uName.test(String(value).toLowerCase())) {
      setNameError("Name is not correct");
      if (!value) {
        setNameError("Name can't be empty");
      }
    } else {
      setNameError("");
    }
  }

  function handleLoginChange({ target: { value } }) {
    setLogin(value);
    const re =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(value).toLowerCase())) {
      setEmailError("Email is not correct");
    } else {
      setEmailError("");
    }
  }
  function handlePasswordChange({ target: { value } }) {
    setPassword(value);
    const pas = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    if (value.lenght < 3 || value > 8) {
      setPasswordError(
        "Password should be more than 3 simbols and hight the 8"
      );
      if (!value) {
        setPasswordError("Password can't be empty");
      } else if (!pas.test(String(value).toLowerCase())) {
        setPasswordError("Password is not correct!");
      }
    } else {
      setPasswordError("");
    }
  }
  function handlePasswordConfirmation({ target: { value } }) {
    setPasswordConfirmation(value);
    if (passwordConfirmation !== password) {
      setConfirmPasswordError("The password is not identical");
    } else {
      setConfirmPasswordError("");
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    setUserName("");
    setLogin("");
    setPassword("");
    setPasswordConfirmation("");
    
  }

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "name":
        setNameDirty(true);
        break;
      case "login":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "password-confirmation":
        setConfirmPasswordDirty(true);
        break;
    }
  };
  
      const toggle = () => {
          setOpen(!open);
        };
        const chekedForm=()=>{
          setAgree(!agree)
        }

  return (
    <>
      <h2 className={styles.numberForm}>Sing Up #01</h2>
      <form className={styles.userForm} onSubmit={handleSubmit}>
          <div className={styles.userImgContainer}>
          <FaUserPen className={styles.userImg} /> 
        </div>
        <h2 className={styles.nameOfForm}>Create Your Account</h2>
        
        <label className={styles.formLabel}>
          <span className={styles.formSpan}>FULL NAME</span>
          {nameDirty && nameError && (
            <div style={{ color: "red" }}>{nameError}</div>
          )}
          <input
            type="text"
            placeholder="John Doe"
            name="name"
            value={userName}
            onChange={(e) => handleNameChange(e)}
            onBlur={(e) => blurHandler(e)}
            autoFocus
          />
        </label>
        <label className={styles.formLabel}>
          <span className={styles.formSpan}>EMAIL ADRESS</span>
          {emailDirty && emailError && (
            <div style={{ color: "red" }}>{emailError}</div>
          )}
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            name="login"
            value={login}
            onChange={(e) => handleLoginChange(e)}
            onBlur={(e) => blurHandler(e)}
          />
        </label>
        <label className={styles.formLabel}>
          <span className={styles.formSpan}>PASSWORD</span>
          {passwordDirty && passwordError && (
            <div style={{ color: "red" }}>{passwordError}</div>
          )}
          <input
            type={open === false ? "password" : "text"}
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handlePasswordChange(e)}
            onBlur={(e) => blurHandler(e)}
          />
        </label>
        <label className={styles.formLabel}>
          <span className={styles.formSpan}>PASSWORD CONFIRMATION</span>
          {confirmPasswordDirty && confirmPasswordError && (
            <div style={{ color: "red" }}>{confirmPasswordError}</div>
          )}
          <input
            type={open === false ? "password" : "text"}
            placeholder="Password Confirmation"
            name="password-confirmation"
            value={passwordConfirmation}
            onChange={(e) => handlePasswordConfirmation(e)}
            onBlur={(e) => blurHandler(e)}
          />
        </label>
        <div className={styles.passwordIcon}>
          {(open === false) ? (
            <FaEyeSlash onClick={toggle} />
          ) : (
            <FaEye onClick={toggle} />
          )}
        </div>
        <div className={styles.agreeForm}>
          <input 
          onClick={chekedForm} 
          type="checkbox" 
          id="chack"
          value={agree} />
          <label className={styles.formLabel} for={"check"}>
            I Agree All Statements In Terms Of Service
          </label>
        </div>
        <button
          disabled={!formValid}
          className={styles.formButton}
          type="submit"
        >
          Sing Up
        </button>
        <div className={styles.member}>
          I'm already a member! <a href="#">Sing In</a>
        </div>
      </form>
    </>
  );
}

export default SingUpForm;
