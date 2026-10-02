import Navbar from "@/features/shared/components/navbar";
import Footer from "@/features/shared/components/footer";
import SupportChat from "@/features/support-chat/components/support-chat";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <SupportChat />
    </>
  );
}
