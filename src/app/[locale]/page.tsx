import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";
import { Partners } from "@/components/partners";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { CursorFX } from "@/components/cursor-fx";
import { BgAmbience } from "@/components/bg-ambience";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return (
    <>
      <BgAmbience />
      <CursorFX />
      <Navbar locale={locale} />
      <main>
        <Hero locale={locale} />
        <About />
        <Services />
<Testimonials />
        <Partners />
        <Contact locale={locale} />
      </main>
      <Footer />
    </>
  );
}
