import React, { useState, useEffect } from "react";

// Interfaces para TypeScript
interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

interface ButtonProps {
  href: string;
  children: React.ReactNode;
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

interface Skill {
  title: string;
  description: string;
}

const ElegantPortfolio: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState<boolean>(false);
  const [aboutVisible, setAboutVisible] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredHeroButton, setHoveredHeroButton] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Animación del hero al cargar
    const timer1 = setTimeout(() => setHeroVisible(true), 300);
    const timer2 = setTimeout(() => setAboutVisible(true), 800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const styles = {
    body: {
      backgroundColor: "#0a0a0a",
      color: "#ffffff",
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      minHeight: "100vh",
      margin: 0,
      padding: 0,
      overflowX: "hidden" as const,
    },
    navbar: {
      backgroundColor: "rgba(15, 15, 15, 0.95)",
      backdropFilter: "blur(10px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
      padding: "1rem 2rem",
      position: "fixed" as const,
      top: 0,
      width: "100%",
      zIndex: 1000,
      display: "flex",
      justifyContent: "space-between" as const,
      alignItems: "center",
    },
    navBrand: {
      color: "#ffffff",
      fontSize: "1.5rem",
      fontWeight: "600" as const,
      textDecoration: "none",
      letterSpacing: "1px",
      animation: "brandGlow 3s ease-in-out infinite", // Reducido de 4s a 3s para más frecuencia
      transition: "all 0.3s ease",
    },
    navLinks: {
      display: "flex",
      listStyle: "none" as const,
      margin: 0,
      padding: 0,
      gap: "2rem", // Restaurado al original
    },
    navLink: {
      color: "#cccccc",
      textDecoration: "none",
      padding: "0.5rem 1rem", // Restaurado al original
      transition: "all 0.3s ease",
      fontSize: "0.95rem",
      fontWeight: "500" as const,
      position: "relative" as const,
      overflow: "hidden" as const,
    },
    navLinkHover: {
      color: "#ffffff",
    },
    navLinkLine: {
      position: "absolute" as const,
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: "#ffffff",
      transform: "scaleX(0)",
      transformOrigin: "left" as const,
      transition: "transform 0.3s ease",
    },
    navLinkLineActive: {
      transform: "scaleX(1)",
    },
    hero: {
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)",
      position: "relative" as const,
      overflow: "hidden" as const,
      paddingTop: "80px",
    },
    heroDecoration: {
      position: "absolute" as const,
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "800px",
      height: "800px",
      background:
        "radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)",
      borderRadius: "50%",
      zIndex: 0, // Cambiado de 1 a 0
      pointerEvents: "none" as const, // Importante: permite que los eventos pasen a través
    },
    heroContent: {
      textAlign: "center" as const,
      zIndex: 10, // Aumentado para estar por encima de todo
      transform: heroVisible ? "translateY(0)" : "translateY(-50px)",
      opacity: heroVisible ? 1 : 0,
      transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      maxWidth: "800px",
      padding: "0 2rem",
      position: "relative" as const,
    },
    heroTitle: {
      fontSize: "clamp(2.5rem, 5vw, 4rem)",
      fontWeight: "700" as const,
      marginBottom: "1rem",
      background: "linear-gradient(45deg, #ffffff, #cccccc, #ffffff)",
      backgroundSize: "200% 200%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      color: "#ffffff", // Fallback
      letterSpacing: "2px",
      animation: "titleShimmer 3s ease-in-out infinite",
    },
    heroSubtitle: {
      fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
      color: "#cccccc",
      marginBottom: "2rem",
      fontWeight: "300" as const,
      letterSpacing: "0.5px",
      lineHeight: "1.6",
    },
    buttonContainer: {
      marginTop: "2rem",
      display: "flex",
      gap: "1rem",
      justifyContent: "center" as const,
      flexWrap: "wrap" as const,
    },
    button: {
      backgroundColor: "transparent",
      border: "2px solid #ffffff",
      color: "#ffffff",
      padding: "12px 30px",
      borderRadius: "50px",
      fontSize: "1rem",
      fontWeight: "500" as const,
      transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      textDecoration: "none",
      display: "inline-block",
      letterSpacing: "0.5px",
      position: "relative" as const,
      overflow: "hidden" as const,
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#ffffff",
      color: "#0a0a0a",
      transform: "translateY(-3px) scale(1.02)",
      boxShadow: "0 15px 35px rgba(255, 255, 255, 0.25)",
      borderColor: "#ffffff",
    },
    buttonSweep: {
      position: "absolute" as const,
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
      transition: "left 0.6s ease",
      zIndex: 1,
    },
    buttonSweepActive: {
      left: "100%",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "0 2rem",
    },
    aboutSection: {
      backgroundColor: "#111111",
      padding: "100px 0",
      position: "relative" as const,
    },
    aboutHero: {
      textAlign: "center" as const,
      marginBottom: "80px",
      transform: aboutVisible ? "translateY(0)" : "translateY(30px)",
      opacity: aboutVisible ? 1 : 0,
      transition: "all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
    aboutTitle: {
      fontSize: "clamp(2rem, 4vw, 3rem)",
      fontWeight: "600" as const,
      marginBottom: "2rem",
      color: "#ffffff",
      letterSpacing: "1px",
    },
    aboutDescription: {
      fontSize: "1.1rem",
      color: "#cccccc",
      lineHeight: "1.8",
      maxWidth: "700px",
      margin: "0 auto",
      fontWeight: "300" as const,
    },
    skillsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "2rem",
      marginTop: "3rem",
    },
    skillCard: {
      backgroundColor: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "15px",
      padding: "2rem",
      transition: "all 0.3s ease",
      backdropFilter: "blur(10px)",
      height: "100%",
    },
    skillCardHover: {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      transform: "translateY(-5px)",
      boxShadow: "0 15px 35px rgba(255, 255, 255, 0.1)",
    },
    skillTitle: {
      color: "#ffffff",
      marginBottom: "1rem",
      fontSize: "1.2rem",
      fontWeight: "600" as const,
    },
    skillDescription: {
      color: "#cccccc",
      margin: 0,
      fontSize: "0.95rem",
      lineHeight: "1.6",
    },
    placeholderSection: {
      minHeight: "60vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center" as const,
    },
  };

  // CSS keyframes como string para inyectar
  const keyframes = `
    @keyframes titleShimmer {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    .hero-button {
      background-color: transparent;
      border: 2px solid #ffffff;
      color: #ffffff;
      padding: 12px 30px;
      border-radius: 50px;
      font-size: 1rem;
      font-weight: 500;
      transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      text-decoration: none;
      display: inline-block;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
      cursor: pointer;
      margin: 0 10px;
    }

    .hero-button::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transition: left 0.6s ease;
      z-index: 1;
    }

    .hero-button:hover {
      background-color: #ffffff !important;
      color: #0a0a0a !important;
      transform: translateY(-3px) scale(1.02) !important;
      box-shadow: 0 15px 35px rgba(255, 255, 255, 0.25) !important;
      border-color: #ffffff !important;
      text-decoration: none !important;
    }

    .hero-button:hover::before {
      left: 100% !important;
    }

    .hero-button span {
      position: relative;
      z-index: 2;
    }
    
    @media (max-width: 768px) {
      .nav-links {
        display: none;
      }
    }
  `;

  // Componente para línea de navegación
  const NavLinkWithLine: React.FC<NavLinkProps> = ({
    href,
    children,
    isHovered,
    onHover,
    onLeave,
  }) => (
    <li style={{ position: "relative" }}>
      <a
        href={href}
        style={{
          ...styles.navLink,
          ...(isHovered ? styles.navLinkHover : {}),
        }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        {children}
      </a>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "2px",
          backgroundColor: "#ffffff",
          transform: isHovered ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.3s ease",
        }}
      />
    </li>
  );

  // Componente para botón con efecto sweep
  const ButtonWithSweep: React.FC<ButtonProps> = ({
    href,
    children,
    index,
    isHovered,
    onHover,
    onLeave,
  }) => {
    console.log(`ButtonWithSweep ${index} isHovered:`, isHovered); // Debug

    return (
      <a
        href={href}
        style={{
          ...styles.button,
          ...(isHovered ? styles.buttonHover : {}),
        }}
        onMouseEnter={() => {
          console.log(`Mouse enter button ${index}`); // Debug
          onHover();
        }}
        onMouseLeave={() => {
          console.log(`Mouse leave button ${index}`); // Debug
          onLeave();
        }}
      >
        <div
          style={{
            ...styles.buttonSweep,
            ...(isHovered ? styles.buttonSweepActive : {}),
          }}
        />
        <span style={{ position: "relative" as const, zIndex: 2 }}>
          {children}
        </span>
      </a>
    );
  };

  const skills: Skill[] = [
    {
      title: "Frontend Development",
      description:
        "React, TypeScript, JavaScript, HTML5, CSS3. Desarrollo de aplicaciones web modernas y responsivas con las mejores prácticas.",
    },
    {
      title: "UI/UX Design",
      description:
        "Diseño responsivo, experiencia de usuario, interfaces modernas. Creación de diseños intuitivos y atractivos.",
    },
    {
      title: "Tools & Technologies",
      description:
        "Git, Bootstrap, Sass, Node.js, APIs REST. Herramientas modernas para desarrollo eficiente y colaborativo.",
    },
  ];

  return (
    <div style={styles.body}>
      {/* Inyectar keyframes */}
      <style>{keyframes}</style>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <a href="#inicio" style={styles.navBrand}>
          MI PORTAFOLIO
        </a>
        <ul style={styles.navLinks} className="nav-links">
          {["Inicio", "Sobre Mí", "Proyectos", "Contacto"].map(
            (item, index) => {
              const isNavHovered = hoveredButton === `nav-${index}`;
              return (
                <li key={index} style={{ position: "relative" }}>
                  <a
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    style={{
                      ...styles.navLink,
                      color: isNavHovered ? "#ffffff" : "#cccccc",
                    }}
                    onMouseEnter={() => {
                      console.log(`🔥 Nav hover ${item}`);
                      setHoveredButton(`nav-${index}`);
                    }}
                    onMouseLeave={() => {
                      console.log(`❄️ Nav leave ${item}`);
                      setHoveredButton(null);
                    }}
                  >
                    {item}
                  </a>
                  <div
                    style={{
                      position: "absolute",
                      bottom: -4, // Separación de 4px debajo del texto
                      left: 0,
                      width: "100%",
                      height: "2px",
                      backgroundColor: "#ffffff",
                      transform: isNavHovered ? "scaleX(1)" : "scaleX(0)",
                      transformOrigin: "left",
                      transition: "transform 0.3s ease",
                    }}
                  />
                </li>
              );
            }
          )}
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="inicio" style={styles.hero}>
        <div style={styles.heroDecoration}></div>
        <div style={styles.container}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>DESARROLLADOR FRONTEND</h1>
            <p style={styles.heroSubtitle}>
              Creando experiencias digitales excepcionales con código limpio y
              diseño elegante
            </p>
            <div style={styles.buttonContainer}>
              <button
                onClick={() => console.log("Click Ver Proyectos")}
                style={{
                  backgroundColor:
                    hoveredHeroButton === 0 ? "#ffffff" : "transparent",
                  border: "2px solid #ffffff",
                  color: hoveredHeroButton === 0 ? "#0a0a0a" : "#ffffff",
                  padding: "12px 30px",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  margin: "0 10px",
                  fontFamily: "inherit",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform:
                    hoveredHeroButton === 0
                      ? "translateY(-3px) scale(1.02)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    hoveredHeroButton === 0
                      ? "0 15px 35px rgba(255, 255, 255, 0.25)"
                      : "none",
                }}
                onMouseEnter={() => {
                  console.log("🔥 React hover Ver Proyectos");
                  setHoveredHeroButton(0);
                }}
                onMouseLeave={() => {
                  console.log("❄️ React leave Ver Proyectos");
                  setHoveredHeroButton(null);
                }}
              >
                Ver Proyectos
              </button>

              <button
                onClick={() => console.log("Click Contactarme")}
                style={{
                  backgroundColor:
                    hoveredHeroButton === 1 ? "#ffffff" : "transparent",
                  border: "2px solid #ffffff",
                  color: hoveredHeroButton === 1 ? "#0a0a0a" : "#ffffff",
                  padding: "12px 30px",
                  borderRadius: "50px",
                  fontSize: "1rem",
                  fontWeight: "500",
                  cursor: "pointer",
                  margin: "0 10px",
                  fontFamily: "inherit",
                  transition: "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  transform:
                    hoveredHeroButton === 1
                      ? "translateY(-3px) scale(1.02)"
                      : "translateY(0) scale(1)",
                  boxShadow:
                    hoveredHeroButton === 1
                      ? "0 15px 35px rgba(255, 255, 255, 0.25)"
                      : "none",
                }}
                onMouseEnter={() => {
                  console.log("🔥 React hover Contactarme");
                  setHoveredHeroButton(1);
                }}
                onMouseLeave={() => {
                  console.log("❄️ React leave Contactarme");
                  setHoveredHeroButton(null);
                }}
              >
                Contactarme
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre-mi" style={styles.aboutSection}>
        <div style={styles.container}>
          <div style={styles.aboutHero}>
            <h2 style={styles.aboutTitle}>QUIÉN SOY</h2>
            <p style={styles.aboutDescription}>
              Soy un desarrollador frontend apasionado por crear interfaces de
              usuario atractivas y funcionales. Me especializo en React,
              TypeScript y las últimas tecnologías web para dar vida a ideas
              innovadoras.
            </p>
          </div>

          <div style={styles.skillsGrid}>
            {skills.map((skill, index) => (
              <div
                key={index}
                style={{
                  ...styles.skillCard,
                  ...(hoveredCard === index ? styles.skillCardHover : {}),
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <h4 style={styles.skillTitle}>{skill.title}</h4>
                <p style={styles.skillDescription}>{skill.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Placeholder sections */}
      <section
        id="proyectos"
        style={{ ...styles.placeholderSection, backgroundColor: "#0a0a0a" }}
      >
        <div style={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            PROYECTOS
          </h2>
          <p style={{ color: "#cccccc", fontSize: "1.1rem" }}>
            Aquí irán tus proyectos destacados
          </p>
        </div>
      </section>

      <section
        id="contacto"
        style={{ ...styles.placeholderSection, backgroundColor: "#111111" }}
      >
        <div style={styles.container}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>CONTACTO</h2>
          <p style={{ color: "#cccccc", fontSize: "1.1rem" }}>
            Información de contacto y formulario
          </p>
        </div>
      </section>
    </div>
  );
};

export default ElegantPortfolio;
