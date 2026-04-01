// Bootstrap tooltips
const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

// Make non-internal links open in new tab
document.querySelectorAll('a[href^="https://"], a[href^="http://"]').forEach((el) => el.setAttribute("target", "_blank"))
// Fill in current year
document.querySelectorAll("span#year").forEach((el) => el.innerText = new Date().getFullYear())
