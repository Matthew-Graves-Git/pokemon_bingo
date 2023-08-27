/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    animation: {
      catch: 'shake 1s ease 3',
      fall: 'star 4s ease 1',
      fallRight: 'starRight 4s ease 1',
      fallLeft: 'starLeft 4s ease 1',
    },
    keyframes: {
      star: {
        '0%': {
          opacity: '0'
        },
        '75%': {
          opacity: '1',
          transform: 'translateY(20px)'
        },
        '85%': {
          opacity: '0.8',
        },
        '90%': {
          opacity: '0.5',
          transform: 'translateY(-20px)'
        },
        '100%': {
          opacity: '0',
        }
      },
      starRight: {
        '0%': {
          opacity: '0'
        },
        '75%': {
          opacity: '1',
          transform: 'translate3D(-20px,20px,0)'
        },
        '85%': {
          opacity: '0.8',
        },
        '90%': {
          opacity: '0.5',
          transform: 'translate3D(-5px,-10px,0)'
        },
        '100%': {
          opacity: '0',
          transform: 'translate3D(0,0,0)'
        }
      },
      starLeft: {
        '0%': {
          opacity: '0'
        },
        '75%': {
          opacity: '1',
          transform: 'translate3D(20px,20px,100px)'
        },
        '85%': {
          opacity: '0.8',
        },
        '90%': {
          opacity: '0.5',
          transform: 'translate3D(5px,-10px,100px)'
        },
        '100%': {
          opacity: '0',
          transform: 'translate3D(0,0,100px)'
        }
      },
      shake: {
        '0%': {
          opacity: '1',
          transform: 'rotate(0deg)'
        },
        '25%': {
          opacity: '1',
          transform: 'rotate(45deg)'
        },
        '50%': {
          opacity: '1',
          transform: 'translateY(-4px)'
        },
        '75%': {
          opacity: '1',
          transform: 'rotate(-45deg)'
        },
        '100%': {
          opacity: '1',
          transform: 'rotate(0deg)'
        },
        
      },
    },
  },
  plugins: [],
}