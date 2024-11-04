import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./RegistrationStepper.module.scss";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [count, setCount] = useState(5);
  const [isActive, setIsActive] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    const validationErrors = validateStep(activeStep);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    let newSkipped = new Set(skipped);
    if (isStepSkipped(activeStep)) {
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleFinished = () => {
    handleNext();
    axios
      .post("http://localhost:8081/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .catch((error) => {
        setError(error.response.data.description);
      });
    startCountdown();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 0:
        if (!formData.username) {
          newErrors.username = "Username is required";
        }
        break;
      case 1:
        if (!formData.email) {
          newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Email is invalid";
        }
        break;
      case 2:
        if (!formData.password) {
          newErrors.password = "Password is required";
        }
        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    return newErrors;
  };

  const isStepperFinished = () => {
    return activeStep === steps.length;
  };

  const startCountdown = () => {
    setIsActive(true);
    setCount(5);
  };

  useEffect(() => {
    let timer: any;
    if (isActive && count > 0) {
      timer = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (count === 0) {
      setIsActive(false);
      navigate("/");
    }

    return () => clearInterval(timer);
  }, [isActive, count, navigate]);

  const steps = [
    {
      title: "Enter your username",
      formElement: (
        <div className={styles.step}>
          <input
            type="text"
            placeholder="Enter your username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
          {errors.username && (
            <div className={styles.error}>{errors.username}</div>
          )}
        </div>
      ),
    },
    {
      title: "Enter your email",
      formElement: (
        <div className={styles.step}>
          <input
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className={styles.error}>{errors.email}</div>}
        </div>
      ),
    },
    {
      title: "Enter your password",
      formElement: (
        <div className={styles.step}>
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className={styles.error}>{errors.password}</div>
          )}
          <input
            type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className={styles.error}>{errors.confirmPassword}</div>
          )}
        </div>
      ),
    },
  ];

  return (
    <article className={styles.root}>
      <div className={styles.wrapper}>
        <div className={styles.form}>
          {isStepperFinished() ? (
            <div>
              <h1>Thank you for registration!</h1>
              <h1>You will be redirected to home page in {count} seconds...</h1>
            </div>
          ) : (
            <div className={styles.stepContent}>
              <h1>{steps[activeStep].title}</h1>
              {steps[activeStep].formElement}
            </div>
          )}
        </div>
        <div className={styles.stepper}>
          <div className={styles.stepper_items}>
            <div className={styles.items}>
              <p className={styles.number}>{activeStep > 0 ? <Check /> : 1}</p>
              <p>Enter your username</p>
            </div>
            <div
              className={`${styles.items} ${
                activeStep !== 1 && activeStep !== 2 ? styles.disabled_item : ""
              }`}
            >
              <p className={styles.number}>{activeStep > 1 ? <Check /> : 2}</p>
              <p>Enter your email</p>
            </div>
            <div
              className={`${styles.items} ${
                activeStep !== 2 ? styles.disabled_item : ""
              }`}
            >
              <p className={styles.number}>{activeStep > 2 ? <Check /> : 3}</p>
              <p>Enter your password</p>
            </div>
          </div>
          <div className={styles.buttons}>
            <button
              className={styles.back_button}
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </button>
            <div style={{ flex: "1 1 auto" }} />
            {activeStep === steps.length - 1 ? (
              <button onClick={handleFinished}>Finish</button>
            ) : (
              <button onClick={handleNext}>Next</button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};

export default RegistrationStepper;
