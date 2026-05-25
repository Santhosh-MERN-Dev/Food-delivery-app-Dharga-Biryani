import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import "../LoginUI/style.css";
import AOS from "aos";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import API_URL from "../../config/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [remail, rsetEmail] = useState("");
  const [rpassword, rsetPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      toast.success("Login Success");
      setEmail("");
      setPassword("");
      navigate("/profile");
      window.location.reload();
    } else {
      toast.error(data.message || "Password Wrong");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !remail || !rpassword) {
      toast.error("Please complete all fields.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: remail, password: rpassword }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(data.message);
        setName("");
        rsetEmail("");
        rsetPassword("");
        setIsRegister(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
      console.error("register error", error);
    }
  };

  return (
    <>
      <Toaster />
      <div className="login-ui">
        <div className={`login-container${isRegister ? " active" : ""}`}>
          <div className="login-overlay"></div>

          {/* Login Form */}
          <div className="form-box Login" data-aos="zoom-in">
            <h2>Login</h2>
            <p className="form-subtitle">Welcome back! Sign in to continue.</p>
            <form>
              <div className="input-box">
                <input
                  type="email"
                  required
                  placeholder=" "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FiUser className="input-icon" />
                <label>Email</label>
              </div>

              <div className="input-box">
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder=" "
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FiLock className="input-icon" />
                <label>Password</label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShow(!show)}
                  tabIndex={-1}
                >
                  {show ? <GoEyeClosed /> : <RxEyeOpen />}
                </button>
              </div>

              <button type="button" className="login-btn" onClick={handleLogin}>
                Login
              </button>

              <div className="toggle-link">
                <p>
                  Don't have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(true);
                    }}
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Login Info */}
          <div className="info-content Login">
            <h2>WELCOME <span className="gold-text">BACK!</span></h2>
            <p>
              We are happy to have you with us again. Your biryani journey starts here — join us today and never miss the flavor of <span className="brand-highlight">Dharga</span>.
            </p>
          </div>

          {/* Register Form */}
          <div className="form-box Register">
            <h2>Register</h2>
            <p className="form-subtitle">Create your account and start ordering.</p>
            <form>
              <div className="input-box">
                <input
                  type="text"
                  required
                  placeholder=" "
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FiUser className="input-icon" />
                <label>Name</label>
              </div>

              <div className="input-box">
                <input
                  type="email"
                  required
                  placeholder=" "
                  value={remail}
                  onChange={(e) => rsetEmail(e.target.value)}
                />
                <FiMail className="input-icon" />
                <label>Email</label>
              </div>

              <div className="input-box">
                <input
                  type={show ? "text" : "password"}
                  required
                  placeholder=" "
                  value={rpassword}
                  onChange={(e) => rsetPassword(e.target.value)}
                />
                <FiLock className="input-icon" />
                <label>Password</label>
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShow(!show)}
                  tabIndex={-1}
                >
                  {show ? <GoEyeClosed /> : <RxEyeOpen />}
                </button>
              </div>

              <button type="button" className="login-btn" onClick={handleRegister}>
                Register
              </button>

              <div className="toggle-link">
                <p>
                  Already have an account?{" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsRegister(false);
                    }}
                  >
                    Sign In
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Register Info */}
          <div className="info-content Register">
            <h2>WELCOME TO <span className="gold-text">DHARGA</span></h2>
            <p>
              We're delighted to have you here. Taste the tradition, register now to savor authentic flavors crafted with love.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
