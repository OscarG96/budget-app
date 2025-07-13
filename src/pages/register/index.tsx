import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      const result = await signIn("credentials", { username: email, password, redirect: false });

      if (result?.error) {
        throw new Error(result.error);
      }
      router.push("/dashboard");
    } catch (error) {
      console.error(error)
      setError((error as Error).message);
      setSuccess('');
    }
  };

  const validatePasswords = (pass: string, confirmPass: string) => {
    if (confirmPass && pass !== confirmPass) {
      setError("Passwords do not match!");
    } else {
      setError("");
    }
  };

  return (
    <section>
      <div className="flex justify-center h-full">
        <div className="w-full max-w-2xl bg-white p-6 rounded-lg">
          <form onSubmit={handleSubmit}>
            <h2 className='text-3xl text-center font-semibold mb-6'>Register</h2>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Name
              </label>
              <input
                type="name"
                placeholder="Name"
                id='name'
                className='border rounded w-full py-2 px-3 mb-2'
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                placeholder="Email"
                id='email'
                className='border rounded w-full py-2 px-3 mb-2'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id='password'
                placeholder="Password"
                className='border rounded w-full py-2 px-3 mb-2'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id='confirmPassword'
                placeholder="Password"
                className='border rounded w-full py-2 px-3 mb-2'
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  validatePasswords(password, e.target.value)
                }}
                required
              />
              <small>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p style={{ color: 'green' }}>{success}</p>}
              </small>
            </div>
            <button className='bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline' type="submit">Register</button>
            <small className='block text-center mt-4'>
              Already have an account?{" "}
              <button
                className="text-blue-500 hover:text-blue-700 focus:outline-none"
                onClick={() => signIn()}
              >
                Sign in
              </button>{" "}
            </small>
          </form>
        </div>
      </div>

    </section>
  );
}
