"use client"

import { useEffect, useState } from "react"
import { Github, Linkedin, Twitter, Mail, Download } from "lucide-react"

// Typewriter hook
function useTypewriter(words: string[], typingSpeed = 80, deletingSpeed = 40, pauseTime = 2000) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentWord = words[currentWordIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (currentText.length < currentWord.length) {
            setCurrentText(currentWord.slice(0, currentText.length + 1))
          } else {
            setTimeout(() => setIsDeleting(true), pauseTime)
          }
        } else {
          if (currentText.length > 0) {
            setCurrentText(currentText.slice(0, -1))
          } else {
            setIsDeleting(false)
            setCurrentWordIndex((prev) => (prev + 1) % words.length)
          }
        }
      },
      isDeleting ? deletingSpeed : typingSpeed,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentWordIndex, words, typingSpeed, deletingSpeed, pauseTime])

  return currentText
}

// Counter animation hook
function useCounter(target: number, duration = 5000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const frameRate = 60
    const totalFrames = Math.round((duration / 1000) * frameRate)
    let frame = 0

    const counter = setInterval(() => {
      frame++
      const progress = frame / totalFrames
      const current = Math.round(target * progress)
      setCount(current)

      if (frame === totalFrames) {
        clearInterval(counter)
      }
    }, 1000 / frameRate)

    return () => clearInterval(counter)
  }, [target, duration])

  return count
}

// Floating Icons Component
function FloatingIcons() {
  const icons = [
    "uil-html5",
    "uil-python",
    "uil-react",
    "uil-git",
    "uil-visual-studio",
    "uil-terminal",
    "uil-database",
    "uil-wrench",
    "uil-bug",
    "uil-navigator",
    "uil-shield-check",
    "uil-brackets-curly",
    "uil-linux",
    "uil-java-script",
    "uil-cloud-lock",
    "uil-apps",
    "uil-server-network",
    "uil-terminal",
    "uil-brackets-curly",
    "uil-linux",
  ]

  useEffect(() => {
    const iconElements = document.querySelectorAll(".floating-icon")
    const speeds: { dx: number; dy: number }[] = []
    const positions: { x: number; y: number }[] = []

    iconElements.forEach((icon) => {
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight
      const dx = (Math.random() - 0.5) * 1.5
      const dy = (Math.random() - 0.5) * 1.5

      const element = icon as HTMLElement
      element.style.left = x + "px"
      element.style.top = y + "px"

      positions.push({ x, y })
      speeds.push({ dx, dy })
    })

    function animateIcons() {
      iconElements.forEach((icon, i) => {
        positions[i].x += speeds[i].dx
        positions[i].y += speeds[i].dy

        if (positions[i].x < 0 || positions[i].x > window.innerWidth - 30) {
          speeds[i].dx *= -1
        }
        if (positions[i].y < 0 || positions[i].y > window.innerHeight - 30) {
          speeds[i].dy *= -1
        }

        const element = icon as HTMLElement
        element.style.left = positions[i].x + "px"
        element.style.top = positions[i].y + "px"
      })
      requestAnimationFrame(animateIcons)
    }

    animateIcons()
  }, [])

  return (
    <div id="floating-icons-container">
      {icons.map((icon, index) => (
        <i key={index} className={`uil ${icon} floating-icon`}></i>
      ))}
    </div>
  )
}

export default function Portfolio() {
  const typewriterText = useTypewriter(["Bug Bounty Hunter", "Python Developer", "Android Developer"])

  const projectsDone = useCounter(12)
  const projectsOngoing = useCounter(2)
  const linesOfCode = useCounter(54053)

  return (
    <div className="bg-[#191919] text-white font-sans min-h-screen relative overflow-hidden">
      {/* Grain texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='0.04'/%3E%3C/svg%3E")`,
        }}
      />

      <FloatingIcons />

      {/* Main content */}
      <div className="relative z-10 px-4 pt-12 md:pt-8 pb-24 md:pb-32 min-h-screen flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full mx-auto">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-14 text-center lg:text-left">
            {/* Left Column - Personal Info */}
            <div className="flex-1 max-w-xl">
              <h1 className="text-6xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[72px] leading-none font-extrabold text-[#616161]">
                DEEP
                <br />
                <span className="text-white">SENGUPTA</span>
              </h1>

              <div className="text-base md:text-lg font-light text-gray-300 mt-6 h-7 flex items-center justify-center lg:justify-start">
                <span className="relative transition-all duration-200 ease-in-out">
                  {typewriterText}
                  <span className="animate-pulse ml-1 text-[#7EFFA1]">|</span>
                </span>
              </div>

              <div className="bg-[#2e2e2e] rounded-xl p-6 mt-8 lg:mt-12 shadow-lg transition-transform duration-300 hover:scale-105">
                <h2 className="text-xl mb-4 text-white font-bold">ABOUT ME</h2>
                <p className="text-gray-300 leading-relaxed text-sm lg:text-base">
                  I'm a passionate developer and cybersecurity enthusiast who thrives on solving problems, learning new
                  technologies, and building things that matter.
                </p>
                <div className="mt-6 flex justify-between items-center">
                  <a
                    href="mailto:myselfdeepsengupta@gmail.com"
                    className="inline-flex items-center gap-2 text-[#7EFFA1] text-base font-light px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    <Mail className="w-5 h-5" />
                    Let's Talk
                  </a>
                  <a
                    href="Resume.pdf"
                    download
                    className="text-[#7EFFA1] text-2xl hover:text-white transition-transform duration-200 hover:scale-110"
                  >
                    <Download className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Education & Skills */}
            <div className="flex-1 max-w-xl w-full">
              <div className="mb-10">
                <h2 className="text-lg lg:text-xl text-white font-bold">EDUCATION</h2>
                <p className="text-gray-300 mt-2 text-sm leading-snug">Bachelor of Computer Application</p>
                <div className="inline-block mt-2 bg-[#2e2e2e] text-gray-200 text-xs px-3 py-1 rounded-full shadow-sm">
                  2021–2024
                </div>
              </div>

              <div className="mt-4">
                <h2 className="text-lg lg:text-xl text-white font-bold mb-4">SKILLS</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-[#2e2e2e] rounded-2xl p-4 shadow-lg transition-transform duration-300 hover:scale-105">
                    <div className="mb-3 text-[#7EFFA1] text-xl">
                      <i className="uil uil-code-branch text-2xl"></i>
                    </div>
                    <p className="text-sm text-gray-300">
                      HTML, CSS, JavaScript, ReactJS, Node.js, Python, SQL, Java, Bash, PowerShell
                    </p>
                  </div>
                  <div className="bg-[#2e2e2e] rounded-2xl p-4 shadow-lg transition-transform duration-300 hover:scale-105">
                    <div className="mb-3 text-[#7EFFA1] text-xl">
                      <i className="uil uil-wrench text-2xl"></i>
                    </div>
                    <p className="text-sm text-gray-300">
                      Android Studio, Burp Suite, Linux, VS Code, Git, GitHub, Docker, Nmap, Wireshark, Postman
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8">
                  <div className="bg-[#2e2e2e] rounded-2xl p-3 text-center shadow-md transition-transform duration-300 hover:scale-105">
                    <div className="text-lg font-bold text-[#7EFFA1]">{projectsDone}</div>
                    <p className="text-xs text-gray-300 mt-1">Projects Done</p>
                  </div>
                  <div className="bg-[#2e2e2e] rounded-2xl p-3 text-center shadow-md transition-transform duration-300 hover:scale-105">
                    <div className="text-lg font-bold text-[#7EFFA1]">{projectsOngoing}</div>
                    <p className="text-xs text-gray-300 mt-1">Projects Ongoing</p>
                  </div>
                  <div className="bg-[#2e2e2e] rounded-2xl p-3 text-center shadow-md transition-transform duration-300 hover:scale-105">
                    <div className="text-lg font-bold text-[#7EFFA1]">{linesOfCode.toLocaleString()}</div>
                    <p className="text-xs text-gray-300 mt-1">Lines of Code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Social Links - Right Side */}
      <div className="fixed top-1/2 right-4 transform -translate-y-1/2 hidden md:flex flex-col items-center gap-4 text-gray-400 text-2xl z-50">
        <a
          href="https://github.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-125 hover:text-white"
        >
          <Github className="w-6 h-6" />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-125 hover:text-white"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://twitter.com/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-125 hover:text-white"
        >
          <Twitter className="w-6 h-6" />
        </a>
        <div
          className="mt-4 text-sm tracking-widest text-gray-500 uppercase"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          Developer and Cybersecurity
        </div>
      </div>

      {/* Mobile Social Links */}
      <div className="md:hidden fixed bottom-16 left-1/2 transform -translate-x-1/2 flex gap-6 text-gray-400 text-xl z-50 bg-[#191919]/80 backdrop-blur-sm px-6 py-3 rounded-full">
        <a
          href="https://github.com/deep-sengupta"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-125 hover:text-white"
        >
          <Github className="w-5 h-5" />
        </a>
        <a
          href="https://www.linkedin.com/in/deepseng/"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-125 hover:text-white"
        >
          <Linkedin className="w-5 h-5" />
        </a>
        <a
          href="https://x.com/DeepSen_Gupta"
          target="_blank"
          rel="noopener noreferrer"
          className="transition-transform duration-300 hover:scale-125 hover:text-white"
        >
          <Twitter className="w-5 h-5" />
        </a>
      </div>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 w-full text-center text-xs text-gray-500 py-3 bg-[#191919]/90 backdrop-blur-sm z-40 border-t border-gray-800/50">
        &copy; 2025 Deep SenGupta. All rights reserved.
      </footer>
    </div>
  )
}
