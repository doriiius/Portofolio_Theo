"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Github, Linkedin, Mail, Instagram, Code, Globe, Zap, Moon, Sun } from "lucide-react"
import {ThemeToggle} from './components/ThemeToggle'


const TechStack = [
  { name: "React", icon: <Code className="w-6 h-6" /> },
  { name: "HTML", icon: <Code className="w-6 h-6" /> },
  { name: "CSS", icon: <Code className="w-6 h-6" /> },
  { name: "JavaScript", icon: <Code className="w-6 h-6" /> },
  { name: "Java", icon: <Code className="w-6 h-6" /> },
  { name: "C++", icon: <Code className="w-6 h-6" /> },

];

const projects = [
  { 
    title: "Hi-Toyz", 
    description: "Designed and developed a user-friendly, interactive toy store marketplace website.",
    techStack: ["HTML", "CSS", "JavaScript"],
    link: "https://github.com/doriiius/Hi-Toyz.git"
  },
  { 
    title: "TechOptique", 
    description: "Built a Tech website for the Tech enthusisant to supply with their needs of tech.",
    techStack: ["PHP", "Blade", "CSS", "Vite"],
    link: "https://github.com/DilR7/TechOptique.git"
  },
  { 
    title: "IgniteFuture", 
    description: "Created a web-based e-learning that allows users to learn with fun and enjoy benefits.",
    techStack: ["PHP", "Blade"],
    link: "https://github.com/DilR7/IgniteFuture.git"
  },
];


function useTypingEffect(text, speed = 50) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayedText, isComplete };
}

function SplashScreen({ finishLoading }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setIsMounted(true), 10)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <AnimatePresence>
      {isMounted && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-primary z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          onAnimationComplete={() => {
            setTimeout(finishLoading, 2000)
          }}
        >
          <motion.h1
            className="text-5xl font-bold text-primary-foreground"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Theodorius
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


export default function TheodoriusPortfolio() {
  const [loading, setLoading] = useState(true)
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"]
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {loading ? (
        <SplashScreen finishLoading={() => setLoading(false)} />
      ) : (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-primary transform-none z-50"
            style={{ scaleX }}
          />
          <header className="fixed top-0 left-0 right-0 z-40 bg-background bg-opacity-80 backdrop-filter backdrop-blur-lg">
            <nav className="container mx-auto px-6 py-3">
              <div className="flex justify-between items-center">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <a href="#home" className="text-2xl font-bold">Theodorius</a>
                </motion.div>
                <div className="hidden md:flex space-x-4 items-center">
                  {["home", "about", "projects", "contact"].map((item) => (
                    <motion.a
                      key={item}
                      href={`#${item}`}
                      className={`text-lg ${activeSection === item ? 'text-primary' : 'text-foreground opacity-70'} hover:opacity-100 transition-colors`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </motion.a>
                  ))}
                  <ThemeToggle />
                </div>
                <div className="md:hidden flex items-center">
                  <ThemeToggle />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                    className="ml-2"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </nav>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="md:hidden bg-background py-2"
              >
                {["home", "about", "projects", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="block px-4 py-2 text-sm hover:bg-accent"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                ))}
              </motion.div>
            )}
          </header>

          <main>
            <HeroSection />
            <AboutSection />
            <ProjectsSection />
            <ContactSection />
          </main>

          <footer className="bg-primary text-primary-foreground py-8">
            <div className="container mx-auto px-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <p>&copy; 2024 Theodorius. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                  <SocialIcon href="https://github.com/doriiius" icon={<Github />} label="GitHub" />
                  <SocialIcon href="https://linkedin.com/in/theodorius" icon={<Linkedin />} label="LinkedIn" />
                  <SocialIcon href="https://instagram.com/theo_dorius" icon={<Instagram />} label="Instagram" />
                  <SocialIcon href="mailto:theodorius546@gmail.com" icon={<Mail />} label="Email" />
                </div>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  )
}

function HeroSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary opacity-40" />
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-80"
          style={{
            backgroundImage: "",
          }}
        />
      </div>
      <div className="container mx-auto px-6 z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 text-primary-foreground drop-shadow-lg">
            Crafting Digital Experiences
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-8 text-primary-foreground drop-shadow-lg">
            UI & UX DESIGNER | WEB DEVELOPER
          </p>
          <Button asChild variant="outline" size="lg" className="mr-4 bg-primary text-primary-foreground hover:bg-primary/90">
            <a href="#projects">View Projects</a>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
            <a href="#contact">Get in Touch</a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const description1 = "I am a 5th-semester CS major at BINUS University with a keen interest in software development and IT solutions. My studies and projects have equipped me with  skills in programming, systems analysis, and troubleshooting, allowing me to tackle challenges efficiently. Known for my analytical mindset and dedication, I am passionate about using technology to solve real-world problems and enhance user experiences. "
  const description2 = "Known for my analytical mindset and dedication, I am passionate about using technology to solve real-world problems and enhance user experiences."

  const { displayedText: typedText1, isComplete: isComplete1 } = useTypingEffect(description1, 20)
  const { displayedText: typedText2, isComplete: isComplete2 } = useTypingEffect(description2, 20)

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-left text-primary">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-base sm:text-lg mb-6 text-foreground h-32 sm:h-auto">
                {typedText1}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {TechStack.map((tech, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center text-card-foreground">
                      {tech.icon}
                      <span className="ml-2 text-sm sm:text-base">{tech.name}</span>
                    </CardTitle>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-primary">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  return (
    <Card className="bg-card hover:bg-card/90 transition-colors border-border">
      <CardHeader>
        <CardTitle className="text-card-foreground">{project.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-card-foreground/70">{project.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col items-start">
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.map((tech, index) => (
            <span key={index} className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
          <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
        </Button>
      </CardFooter>
    </Card>
  )
}

function ContactSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-primary">Get in Touch</h2>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
              <Input type="text" placeholder="Your Name" required className="bg-input text-input-foreground border-input" />
              <Input type="email" placeholder="Your Email" required className="bg-input text-input-foreground border-input" />
              <Textarea placeholder="Your Message" required className="bg-input text-input-foreground border-input" />
              <Button variant = "outline" type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Send Message</Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SocialIcon({ href, icon, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-foreground hover:text-primary-foreground/70 transition-colors"
    >
      {icon}
      <span className="sr-only">{label}</span>
    </a>
  )
}
