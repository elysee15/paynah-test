import LoginForm from "@/components/auth/login-form";
import { ROUTES } from "@/libs/constants/routes";
import Link from "next/link";

function LoginPage() {
  return (
    <section>
      <h1 className="text-2xl font-semibold text-center mb-6">Bonjour,</h1>
      <LoginForm />
      <p className="text-sm text-center mt-4">
        <Link href={ROUTES.REGISTER}>Ouvrir mon compte</Link>
      </p>
    </section>
  );
}

export default LoginPage;
