import { Card, CardContent } from "@/components/ui/card";
import RegisterForm from "@/components/auth/register-form";

function RegisterPage() {
  return (
    <Card className="shadow-none">
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}

export default RegisterPage;
