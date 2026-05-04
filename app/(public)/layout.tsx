import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ShootingStars from '@/components/ui/ShootingStars';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ShootingStars />
      <Navbar />
      <main className="flex-1 relative z-10">{children}</main>
      <Footer />
    </>
  );
}
