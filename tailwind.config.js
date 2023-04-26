/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'messaging': "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7m8hlZ0WjTEsHUkGg2NRfrW4omekZqn98xf5SiDJFXbQwm3NR9qPRpLoXrheDOkRd2YDXTj0xrDw&usqp=CAU&ec=48665701')"
      }
    },
  },
  screens: {
    xs: "480px",
    ss: "620px",
    sm: "768px",
    md: "1060px",
    lg: "1200px",
    xl: "1700px",
  },
  plugins: [],
}