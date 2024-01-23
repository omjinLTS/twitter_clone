import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import {
  Error,
  Input,
  Switcher,
  Title,
  Wrapper,
  Form,
} from "../components/auth-components";

const errors = {
  "auth/email-already-in-use": "Email is already in use.",
  "auth/invalid-email": "Email is invalid.",
  "auth/weak-password": "Password should be at least 6 characters.",
};

export default function CreateAccount() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = e;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (name === "" || email === "" || password === "") return;
    try {
      setIsLoading(true);
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      await updateProfile(credentials.user, {
        displayName: name,
      });
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(errors[e.code as keyof typeof errors]);
      }
    } finally {
      setIsLoading(false);
    }
    console.log(name, email, password);
  };

  return (
    <Wrapper>
      <Title>Join 𝕏</Title>
      <Form onSubmit={onSubmit}>
        <Input
          onChange={onChange}
          name='name'
          value={name}
          placeholder='Name'
          type='text'
          required
        />
        <Input
          onChange={onChange}
          name='email'
          value={email}
          placeholder='Email'
          type='email'
          required
        />
        <Input
          onChange={onChange}
          name='password'
          value={password}
          placeholder='Password'
          type='password'
          required
        />
        <Input
          type='submit'
          value={isLoading ? "Loading..." : "Create Account"}
        />
      </Form>
      {error && <Error>{error}</Error>}
      <Switcher>
        Don't have an account? <Link to='/login'>Log in &rarr;</Link>
      </Switcher>
    </Wrapper>
  );
}
