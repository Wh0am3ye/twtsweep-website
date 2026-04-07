{\rtf1\ansi\ansicpg1252\cocoartf2868
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fnil\fcharset0 HelveticaNeue;}
{\colortbl;\red255\green255\blue255;\red0\green0\blue0;}
{\*\expandedcolortbl;;\cssrgb\c0\c0\c0;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\deftab720
\pard\pardeftab720\partightenfactor0

\f0\fs22 \cf2 document.addEventListener("DOMContentLoaded", () => \{\
  const toggle = document.querySelector(".toggle");\
  const menu = document.querySelector(".menu");\
\
  if (toggle) \{\
    toggle.addEventListener("click", () => \{\
      menu.style.display = menu.style.display === "flex" ? "none" : "flex";\
    \});\
  \}\
\
  const form = document.querySelector("form");\
\
  if (form) \{\
    form.addEventListener("submit", async (e) => \{\
      e.preventDefault();\
\
      const data = new FormData(form);\
\
      const response = await fetch("https://formspree.io/f/YOUR-ID", \{\
        method: "POST",\
        body: data,\
        headers: \{\
          Accept: "application/json",\
        \},\
      \});\
\
      if (response.ok) \{\
        alert("Thanks! Your message has been sent.");\
        form.reset();\
      \} else \{\
        alert("Something went wrong. Please try again.");\
      \}\
    \});\
  \}\
\});\
}