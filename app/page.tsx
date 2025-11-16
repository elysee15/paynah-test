import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";

function HomePage() {
  redirect(ROUTES.LOGIN);
}

export default HomePage;
