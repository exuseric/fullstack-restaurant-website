import Image from "next/image";

export default function HomePage() {
  return (
    <section className="layout-grid min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Hero Image"
        className="full-bleed h-full w-full object-cover"
        width={1170}
        height={650}
      />
    </section>
  );
}
