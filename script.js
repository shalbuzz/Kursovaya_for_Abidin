document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const menuToggle = document.querySelector(".menu-toggle")
  const nav = document.querySelector("nav")

  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      nav.classList.add("active")

      // Create close button if it doesn't exist
      if (!document.querySelector(".close-menu")) {
        const closeBtn = document.createElement("div")
        closeBtn.className = "close-menu"
        closeBtn.innerHTML = '<i class="fas fa-times"></i>'
        nav.appendChild(closeBtn)

        closeBtn.addEventListener("click", () => {
          nav.classList.remove("active")
        })
      }
    })
  }

  // Testimonial Slider
  const testimonials = document.querySelectorAll(".testimonial")
  const dots = document.querySelectorAll(".dot")
  const prevBtn = document.querySelector(".prev-btn")
  const nextBtn = document.querySelector(".next-btn")

  if (testimonials.length > 0) {
    let currentIndex = 0

    function showTestimonial(index) {
      testimonials.forEach((testimonial) => testimonial.classList.remove("active"))
      dots.forEach((dot) => dot.classList.remove("active"))

      testimonials[index].classList.add("active")
      dots[index].classList.add("active")
      currentIndex = index
    }

    if (dots.length > 0) {
      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showTestimonial(index)
        })
      })
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        let newIndex = currentIndex - 1
        if (newIndex < 0) newIndex = testimonials.length - 1
        showTestimonial(newIndex)
      })
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        let newIndex = currentIndex + 1
        if (newIndex >= testimonials.length) newIndex = 0
        showTestimonial(newIndex)
      })
    }

    // Auto slide every 5 seconds
    setInterval(() => {
      let newIndex = currentIndex + 1
      if (newIndex >= testimonials.length) newIndex = 0
      showTestimonial(newIndex)
    }, 5000)
  }

  // FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item")

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question")

      question.addEventListener("click", () => {
        // Close all other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active")
          }
        })

        // Toggle current item
        item.classList.toggle("active")

        // Change icon
        const icon = item.querySelector(".faq-toggle i")
        if (item.classList.contains("active")) {
          icon.className = "fas fa-minus"
        } else {
          icon.className = "fas fa-plus"
        }
      })
    })
  }

  // Contact Form Submission
  const contactForm = document.getElementById("contactForm")
  const formStatus = document.getElementById("formStatus")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate form submission
      formStatus.innerHTML = "Sending your message..."
      formStatus.className = "form-status"
      formStatus.style.display = "block"

      // Simulate API call with timeout
      setTimeout(() => {
        formStatus.innerHTML = "Your message has been sent successfully! We will get back to you soon."
        formStatus.className = "form-status success"
        contactForm.reset()
      }, 1500)
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href")

      if (href !== "#") {
        e.preventDefault()

        const targetElement = document.querySelector(href)
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (nav.classList.contains("active")) {
            nav.classList.remove("active")
          }
        }
      }
    })
  })

  // Add active class to nav links based on scroll position
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section[id]")
    const scrollPosition = window.scrollY

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 150
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.add("active")
      } else {
        document.querySelector(`nav ul li a[href="#${sectionId}"]`)?.classList.remove("active")
      }
    })
  })
})
