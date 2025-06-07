import React, { useState, useEffect, useCallback, memo, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Portfolio.css";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  life: number;
}

interface Skill {
  title: string;
  description: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ParticleSystem = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
    };

    const createParticle = (index: number): Particle => ({
      id: index,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 10 + 0.5,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 1,
      life: Math.random() * 100 + 50,
    });

    const initParticles = () => {
      const particleCount = Math.min(80, Math.floor(window.innerWidth / 15));
      particlesRef.current = Array.from({ length: particleCount }, (_, i) =>
        createParticle(i)
      );
    };

    const updateParticles = () => {
      const scrollOffset = scrollYRef.current * 0.3;
      const mouseInfluence = 50;

      particlesRef.current.forEach((particle) => {
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouseInfluence) {
          const force = (mouseInfluence - distance) / mouseInfluence;
          particle.x -= dx * force * 0.01;
          particle.y -= dy * force * 0.01;
        }

        particle.x += particle.speedX + scrollOffset * 0.001;
        particle.y += particle.speedY;
        particle.life -= 0.1;

        if (
          particle.life <= 0 ||
          particle.x < -10 ||
          particle.x > window.innerWidth + 10 ||
          particle.y < -10 ||
          particle.y > window.innerHeight + 10
        ) {
          Object.assign(particle, createParticle(particle.id));
        }
      });
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle) => {
        const gradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 2
        );
        gradient.addColorStop(0, `rgba(255, 255, 255)`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            const opacity = ((100 - distance) / 100) * 0.1;
            ctx.strokeStyle = `rgba(255, 255, 255)`;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
});

const ParallaxBackground = memo(() => {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const rate1 = scrolled * -0.3;
      const rate2 = scrolled * -0.15;
      const rate3 = scrolled * -0.05;

      if (layer1Ref.current) {
        layer1Ref.current.style.transform = `translateY(${rate1}px)`;
      }
      if (layer2Ref.current) {
        layer2Ref.current.style.transform = `translateY(${rate2}px)`;
      }
      if (layer3Ref.current) {
        layer3Ref.current.style.transform = `translateY(${rate3}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="parallax-container">
      <div ref={layer1Ref} className="parallax-layer layer-1"></div>
      <div ref={layer2Ref} className="parallax-layer layer-2"></div>
      <div ref={layer3Ref} className="parallax-layer layer-3"></div>
    </div>
  );
});

const ProjectCard = memo(
  ({
    project,
    index,
    isHovered,
    onHover,
    onLeave,
  }: {
    project: Project;
    index: number;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
  }) => (
    <Col md={6} lg={4} className="mb-4">
      <Card
        className={`project-card h-100 ${
          isHovered ? "project-card-hovered" : ""
        }`}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
      >
        <div className="project-image-container">
          <Card.Img
            variant="top"
            src={project.image}
            className="project-image"
          />
          <div className="project-overlay">
            <div className="project-actions">
              <Button
                variant="outline-light"
                size="sm"
                href={project.demoUrl}
                target="_blank"
              >
                Demo
              </Button>
              <Button
                variant="outline-light"
                size="sm"
                href={project.githubUrl}
                target="_blank"
              >
                GitHub
              </Button>
            </div>
          </div>
        </div>
        <Card.Body className="d-flex flex-column">
          <Card.Title className="project-title">{project.title}</Card.Title>
          <Card.Text className="project-description flex-grow-1">
            {project.description}
          </Card.Text>
          <div className="project-tech">
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
);

const ElegantPortfolio: React.FC = () => {
  const [heroVisible, setHeroVisible] = useState<boolean>(false);
  const [aboutVisible, setAboutVisible] = useState<boolean>(false);
  const [projectsVisible, setProjectsVisible] = useState<boolean>(false);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [hoveredHeroButton, setHoveredHeroButton] = useState<number | null>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setHeroVisible(true), 300);
    const timer2 = setTimeout(() => setAboutVisible(true), 800);

    const handleScroll = () => {
      const projectsSection = document.getElementById("proyectos");
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setProjectsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setContactForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setShowAlert(true);
    setContactForm({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);

    setTimeout(() => setShowAlert(false), 5000);
  }, []);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  }, []);

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

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Plataforma de comercio electrónico moderna con React, TypeScript y integración de pagos. Funcionalidades completas de carrito y gestión de productos.",
      image:
        "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=E-Commerce+Platform",
      technologies: ["React", "TypeScript", "Node.js", "MongoDB"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 2,
      title: "Task Management App",
      description:
        "Aplicación de gestión de tareas con interfaz drag & drop, notificaciones en tiempo real y colaboración en equipo.",
      image:
        "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Task+Manager",
      technologies: ["React", "Redux", "Socket.io", "Express"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description:
        "Dashboard meteorológico interactivo con gráficos dinámicos, pronósticos detallados y geolocalización automática.",
      image:
        "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Weather+Dashboard",
      technologies: ["React", "Chart.js", "Weather API", "CSS3"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 4,
      title: "Portfolio Website",
      description:
        "Sitio web portfolio responsivo con animaciones suaves, modo oscuro/claro y optimización SEO completa.",
      image:
        "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Portfolio+Website",
      technologies: ["React", "SCSS", "Framer Motion", "Next.js"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 5,
      title: "Social Media App",
      description:
        "Red social con funcionalidades de posts, comentarios, likes y chat en tiempo real. Interfaz moderna y responsive.",
      image:
        "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Social+Media+App",
      technologies: ["React", "Firebase", "Material-UI", "PWA"],
      demoUrl: "#",
      githubUrl: "#",
    },
    {
      id: 6,
      title: "Learning Platform",
      description:
        "Plataforma educativa con cursos interactivos, seguimiento de progreso y sistema de certificaciones.",
      image:
        "https://via.placeholder.com/400x250/1a1a1a/ffffff?text=Learning+Platform",
      technologies: ["React", "GraphQL", "PostgreSQL", "Docker"],
      demoUrl: "#",
      githubUrl: "#",
    },
  ];

  return (
    <div className="portfolio" ref={parallaxRef}>
      <ParticleSystem />
      <ParallaxBackground />
      <nav className="navbar">
        <a href="#inicio" className="nav-brand">
          MI PORTAFOLIO
        </a>

        <button
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-links ${mobileMenuOpen ? "nav-links-open" : ""}`}>
          {[
            { name: "Inicio", id: "inicio" },
            { name: "Sobre Mi", id: "sobre-mi" },
            { name: "Proyectos", id: "proyectos" },
            { name: "Contacto", id: "contacto" },
          ].map((item, index) => {
            const isNavHovered = hoveredButton === `nav-${index}`;
            return (
              <li key={index} className="nav-item">
                <button
                  className={`nav-link ${
                    isNavHovered ? "nav-link-hovered" : ""
                  }`}
                  onMouseEnter={() => setHoveredButton(`nav-${index}`)}
                  onMouseLeave={() => setHoveredButton(null)}
                  onClick={() => scrollToSection(item.id)}
                >
                  {item.name}
                </button>
                <div
                  className={`nav-link-line ${
                    isNavHovered ? "nav-link-line-active" : ""
                  }`}
                />
              </li>
            );
          })}
        </ul>
      </nav>

      <section id="inicio" className="hero">
        <div className="hero-decoration"></div>
        <Container>
          <div
            className={`hero-content ${
              heroVisible ? "hero-content-visible" : ""
            }`}
          >
            <h1 className="hero-title">
              <span className="word">
                {"DESARROLLADOR".split("").map((char, index) => (
                  <span key={index}>{char}</span>
                ))}
              </span>
              <span className="word">
                {"FRONTEND".split("").map((char, index) => (
                  <span key={index + 12}>{char}</span>
                ))}
              </span>
            </h1>
            <p className="hero-subtitle">
              Creando experiencias digitales excepcionales con código limpio y
              diseño elegante
            </p>
            <div className="button-container">
              <Button
                variant="outline-light"
                size="lg"
                className={`hero-button ${
                  hoveredHeroButton === 0 ? "hero-button-hovered" : ""
                }`}
                onMouseEnter={() => setHoveredHeroButton(0)}
                onMouseLeave={() => setHoveredHeroButton(null)}
                onClick={() => scrollToSection("proyectos")}
              >
                Ver Proyectos
              </Button>

              <Button
                variant="outline-light"
                size="lg"
                className={`hero-button ${
                  hoveredHeroButton === 1 ? "hero-button-hovered" : ""
                }`}
                onMouseEnter={() => setHoveredHeroButton(1)}
                onMouseLeave={() => setHoveredHeroButton(null)}
                onClick={() => scrollToSection("contacto")}
              >
                Contactarme
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section id="sobre-mi" className="about-section">
        <Container>
          <div
            className={`about-hero ${aboutVisible ? "about-hero-visible" : ""}`}
          >
            <h2 className="about-title">QUIÉN SOY</h2>
            <p className="about-description">
              Soy un desarrollador frontend apasionado por crear interfaces de
              usuario atractivas y funcionales. Me especializo en React,
              TypeScript y las últimas tecnologías web para dar vida a ideas
              innovadoras.
            </p>
          </div>

          <Row className="skills-grid">
            {skills.map((skill, index) => (
              <Col key={index} md={6} lg={4} className="mb-4">
                <div
                  className={`skill-card h-100 ${
                    hoveredCard === index ? "skill-card-hovered" : ""
                  }`}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <h4 className="skill-title">{skill.title}</h4>
                  <p className="skill-description">{skill.description}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      <section id="proyectos" className="projects-section">
        <Container>
          <div
            className={`projects-hero ${
              projectsVisible ? "projects-hero-visible" : ""
            }`}
          >
            <h2 className="section-title">PROYECTOS DESTACADOS</h2>
            <p className="section-subtitle">
              Una selección de mis trabajos más recientes y desafiantes
            </p>
          </div>

          <Row
            className={`projects-grid ${
              projectsVisible ? "projects-grid-visible" : ""
            }`}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isHovered={hoveredProject === index}
                onHover={() => setHoveredProject(index)}
                onLeave={() => setHoveredProject(null)}
              />
            ))}
          </Row>
        </Container>
      </section>

      <section id="contacto" className="contact-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="contact-hero text-center mb-5">
                <h2 className="section-title">CONTÁCTAME</h2>
                <p className="section-subtitle">
                  ¿Tienes un proyecto en mente? Me encantaría escuchar tus ideas
                </p>
              </div>

              {showAlert && (
                <Alert variant="success" className="custom-alert">
                  ¡Mensaje enviado correctamente! Te responderé pronto.
                </Alert>
              )}

              <Form onSubmit={handleSubmit} className="contact-form">
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Nombre</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={contactForm.name}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="Tu nombre completo"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="form-label">Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={contactForm.email}
                        onChange={handleInputChange}
                        required
                        className="form-input"
                        placeholder="tu@email.com"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label className="form-label">Asunto</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="¿En qué puedo ayudarte?"
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="form-label">Mensaje</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={contactForm.message}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                    placeholder="Cuéntame sobre tu proyecto..."
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    type="submit"
                    variant="outline-light"
                    size="lg"
                    disabled={isSubmitting}
                    className="submit-button"
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                  </Button>
                </div>
              </Form>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default ElegantPortfolio;
