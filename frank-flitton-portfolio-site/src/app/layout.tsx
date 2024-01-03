import Header from "@/components/header";
import "../styles/globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="font-futura flex min-h-screen flex-col p-4 w-full">
        {children}
      </div>
    </>
  );
}
