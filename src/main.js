import './style.css'

class PhantomPortfolio {
  constructor() {
    this.currentNavItem = 0 // Work = 0, About = 1, Careers = 2
    this.init()
  }

  init() {
    this.setupLoader()
    this.setupNavigation()
    this.setupProjectInteractions()
    this.setupSmoothScrolling()
  }

  setupNavigation() {
    const navItems = document.querySelectorAll('.styles_NavigationWrapper__VKYXQ li')
    const navIndicator = document.querySelector('.styles_NavigationWrapper__VKYXQ div[inert]')
    
    // Set initial position for "Work" item
    this.updateNavIndicator(navIndicator, navItems[this.currentNavItem])
    
    navItems.forEach((item, index) => {
      const link = item.querySelector('a')
      
      link.addEventListener('click', (e) => {
        e.preventDefault()
        this.setActiveNavItem(index, navItems, navIndicator)
      })
    })
  }

  setActiveNavItem(index, navItems, navIndicator) {
    // Remove inert attribute from all items
    navItems.forEach(item => {
      item.removeAttribute('inert')
    })
    
    // Add inert attribute to selected item
    navItems[index].setAttribute('inert', '')
    
    // Update indicator position
    this.updateNavIndicator(navIndicator, navItems[index])
    
    this.currentNavItem = index
  }

  updateNavIndicator(indicator, targetItem) {
    const itemRect = targetItem.getBoundingClientRect()
    const containerRect = targetItem.parentElement.getBoundingClientRect()
    
    const left = targetItem.offsetLeft
    const width = itemRect.width
    
    indicator.style.width = `${width}px`
    indicator.style.translate = `${left}px 0%`
  }

  setupLoader() {
    const loader = document.getElementById('loader')
    const progressBar = document.getElementById('progressBar')
    
    // Start progress animation after a short delay
    setTimeout(() => {
      progressBar.style.width = '100%'
    }, 300)

    // Hide loader after progress completes
    setTimeout(() => {
      loader.classList.add('hidden')
      
      // Remove loader from DOM after animation
      setTimeout(() => {
        if (loader.parentNode) {
          loader.parentNode.removeChild(loader)
        }
      }, 500)
    }, 2000)
  }

  setupProjectInteractions() {
    const projectItems = document.querySelectorAll('.project-item')
    
    projectItems.forEach(item => {
      item.addEventListener('click', (e) => {
        // Add click interaction (could link to project pages)
        console.log('Project clicked:', item.querySelector('.project-title').textContent)
      })

      // Enhanced hover effects
      item.addEventListener('mouseenter', () => {
        this.animateProjectTags(item, true)
      })

      item.addEventListener('mouseleave', () => {
        this.animateProjectTags(item, false)
      })
    })
  }

  animateProjectTags(projectItem, isHovering) {
    const tags = projectItem.querySelectorAll('.tag')
    
    if (isHovering) {
      tags.forEach((tag, index) => {
        setTimeout(() => {
          tag.style.transform = 'translateY(-2px)'
          tag.style.backgroundColor = '#e8e8e8'
          tag.style.color = '#333'
        }, index * 30)
      })
    } else {
      tags.forEach(tag => {
        tag.style.transform = 'translateY(0)'
        tag.style.backgroundColor = '#f5f5f5'
        tag.style.color = '#666'
      })
    }
  }

  setupSmoothScrolling() {
    // Add smooth scrolling behavior for year headers
    const yearHeaders = document.querySelectorAll('.year-header')
    
    let lastScrollTop = 0
    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      
      yearHeaders.forEach((header, index) => {
        const rect = header.getBoundingClientRect()
        const isSticky = rect.top <= 20
        
        if (isSticky) {
          header.style.fontWeight = '500'
          header.style.color = '#000'
        } else {
          header.style.fontWeight = '400'
          header.style.color = '#666'
        }
      })
      
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
    })
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PhantomPortfolio()
  
  // Add keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const projectItems = document.querySelectorAll('.project-item')
      const focused = document.activeElement
      
      let currentIndex = Array.from(projectItems).indexOf(focused)
      
      if (e.key === 'ArrowDown' && currentIndex < projectItems.length - 1) {
        projectItems[currentIndex + 1].focus()
        e.preventDefault()
      } else if (e.key === 'ArrowUp' && currentIndex > 0) {
        projectItems[currentIndex - 1].focus()
        e.preventDefault()
      }
    }
  })
  
  // Make project items focusable
  document.querySelectorAll('.project-item').forEach(item => {
    item.setAttribute('tabindex', '0')
    
    item.addEventListener('focus', () => {
      item.style.outline = '2px solid #000'
      item.style.outlineOffset = '2px'
    })
    
    item.addEventListener('blur', () => {
      item.style.outline = 'none'
    })
  })
})