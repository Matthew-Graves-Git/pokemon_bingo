/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
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
      shiny: 'shimmer 6s ease infinite',
      shinyDelay: 'shimmer 7s ease infinite',
      shinyRight: 'shimmer 9s ease infinite',
      bingo: 'slam 2s ease 1',
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
      shimmer: {
        '0%': {
          opacity: '1',
          transform: 'scale(2.1)'
        },
        '25%': {
          opacity: '0.5',
          transform: 'scale(1.5)'
        },
        '50%': {
          opacity: '1',
          transform: 'scale(2.1)'
        },
        '75%': {
          opacity: '0.5',
          transform: 'scale(1.5)'
        },
        '100%': {
          opacity: '1',
          transform: 'scale(2.1)'
        },
      },
      slam: {
        '0%': {
          opacity: '0.6',
          transform: 'scale(2.1)'
        },
        '100%': {
          opacity: '1',
          transform: 'scale(1)'
        },
        
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "animation-delay": (value) => {
            return {
              "animation-delay": value,
            };
          },
        },
        {
          values: theme("transitionDelay"),
        }
      );
    }),
  ],
}