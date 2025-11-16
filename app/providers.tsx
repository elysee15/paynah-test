import { PropsWithChildren } from "react";
import { ThemeProvider } from "next-themes";

function Providers({ children }: PropsWithChildren) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  );
}

export default Providers;
