// styles.js
export const formContainer = `
  flex dark:bg-main-dark bg-main-light flex-col items-center justify-center w-full min-h-screen p-4 gap-9
`;

export const formCard = `
  w-[80%] h-[600px] min-h-[400px] flex flex-col bg-card-light dark:bg-transparent rounded-lg p-4 md:p-6 relative shadow-lg border-2
`;

export const formHeader = `
  text-xl md:text-2xl font-bold dark:text-neutral-400 text-bg-semicard-light
`;

export const labelStyles = `
  block text-xs md:text-sm font-medium dark:text-neutral-400 text-bg-semicard-light mb-1 md:mb-2
`;

export const inputBaseStyles = `
  block w-full px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-xl md:rounded-2xl 
  dark:text-zinc-200 text-zinc-700 backdrop-blur-lg 
  bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent 
  shadow hover:shadow-[#000000] duration-700 focus:ring-0 focus:outline-none 
  border border-gray-500 dark:border-gray-600
`;

export const buttonBaseStyles = `
  flex items-center px-3 py-1 md:px-4 md:py-2 text-sm md:text-base rounded-xl md:rounded-2xl 
  backdrop-blur-lg bg-gradient-to-tr from-transparent via-[rgba(121,121,121,0.16)] to-transparent 
  shadow hover:shadow-zinc-400 dark:hover:shadow-zinc-700 duration-300 focus:ring-0 focus:outline-none
  transition-all transform hover:scale-[1.02] active:scale-[0.98]
  border border-zinc-300/50 dark:border-zinc-600/50
  relative overflow-hidden
`;
export const buttonBaseStylesCustom = `
    flex items-center px-3 py-1 md:px-4 md:py-2 text-sm md:text-base  duration-300  
  transition-all transform hover:scale-[1.02] active:scale-[0.98]
  relative overflow-hidden w-full h-full
`;

export const cancelButtonStyles = `
  ${buttonBaseStyles} 
  text-zinc-700 dark:text-zinc-200 
  hover:text-zinc-200 dark:hover:text-zinc-900
  hover:bg-gradient-to-tr hover:from-red-500/20 hover:to-red-600/40
  dark:hover:bg-gradient-to-tr dark:hover:from-red-700/30 dark:hover:to-red-800/50
  after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8),_transparent] 
  after:opacity-0 hover:after:opacity-10 after:transition-opacity after:duration-300
`;

export const submitButtonStyles = `
  ${buttonBaseStyles} 
  text-[#5cb300] dark:text-[#92dd0d] 
  hover:text-[#4a8f00] dark:hover:text-[#8ee80e]
 dark:hover:to-green-800/50
  after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8),_transparent] 
  after:opacity-0 hover:after:opacity-10 after:transition-opacity after:duration-300
`;
export const moreButtonStyles = `
  ${buttonBaseStyles} 

  text-[#5cb300] dark:text-[#92dd0d] 
  hover:text-[#4a8f00] dark:hover:text-[#8ee80e]
 dark:hover:to-green-800/50
  after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.8),_transparent] 
  after:opacity-0 hover:after:opacity-10 after:transition-opacity after:duration-300
`;

// Example usage:
export const formGrid = `
  grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4
`;

export const scrollContainer = `
  flex-grow pr-1 md:pr-2
`;

export const formContent = `
  space-y-3 md:space-y-4
`;



export const formStyles = {
  // Text styles
  text: "text-shadow-[0_0_8px_rgba(161,165,247,0.8)] dark:text-shadow-[0_0_8px_rgba(90,103,216,0.6)]",
  label: "block text-sm font-medium mb-1 text-left",
  errorText:
    "mt-1 text-sm text-red-300 dark:text-red-800 text-left text-shadow-[0_0_8px_rgba(255,100,100,0.8)] dark:text-shadow-[0_0_8px_rgba(255,100,100,0.6)]",

  // Input styles
  input:
    "w-full px-4 py-3 rounded-lg bg-[rgba(255,255,255,0.05)]  border border-[rgba(255,255,255,0.1)] dark:border-[rgba(0,0,0,0.1)] focus:outline-none focus:ring-2 focus:ring-[rgba(161,165,247,0.8)] dark:focus:ring-[rgba(90,103,216,0.6)] transition-all duration-300",

  // Button styles
  button:
    "w-full py-4 px-4 font-medium rounded-xl focus:outline-none transition-all duration-300 shadow-[inset_0_2px_7px_-9px_rgba(255,255,255,0.5),inset_0_1px_2px_-1px_rgba(255,255,255,1),inset_0_-20px_16px_-32px_rgba(96,68,144,0.3),inset_0_28px_25px_-24px_rgba(202,172,255,0.3),inset_0_1px_4px_rgba(154,146,210,0.3),inset_0_1px_10px_rgba(227,222,255,0.2)] hover:shadow-[inset_0_4px_7px_-4px_rgba(255,255,255,0.5),inset_0_1px_2px_-1px_rgba(255,255,255,1),inset_0_-20px_16px_-32px_rgba(96,68,144,0.3),inset_0_28px_25px_-20px_rgba(202,172,255,0.3),inset_0_1px_4px_rgba(154,146,210,0.3),inset_0_1px_16px_rgba(227,222,255,0.2)] dark:shadow-[inset_0_2px_7px_-9px_rgba(0,0,0,0.3),inset_0_1px_2px_-1px_rgba(255,255,255,0.8),inset_0_-20px_16px_-32px_rgba(90,103,216,0.2),inset_0_28px_25px_-24px_rgba(90,103,216,0.2),inset_0_1px_4px_rgba(90,103,216,0.2),inset_0_1px_10px_rgba(90,103,216,0.15)] dark:hover:shadow-[inset_0_4px_7px_-4px_rgba(0,0,0,0.3),inset_0_1px_2px_-1px_rgba(255,255,255,0.8),inset_0_-20px_16px_-32px_rgba(90,103,216,0.2),inset_0_28px_25px_-20px_rgba(90,103,216,0.2),inset_0_1px_4px_rgba(90,103,216,0.2),inset_0_1px_16px_rgba(90,103,216,0.15)]",

  // Secondary button styles
  secondaryButton:
    "py-2 px-4 border border-[rgba(255,255,255,0.1)] dark:border-[rgba(0,0,0,0.1)] rounded-lg hover:bg-[rgba(255,255,255,0.05)] dark:hover:bg-[rgba(0,0,0,0.05)] transition-all duration-300",

  // Container styles
  formContainer: "space-y-6 flex flex-col  justify-center p-5 ",
  fieldContainer: "mb-4",
  buttonContainer: "text-center text-sm",
  formWrapper: "w-full h-full bg-[rgba(255,255,255,0.01)] dark:bg-[rgba(0,0,0,0.01)] text-white dark:text-gray-800 backdrop-blur-[100px] rounded-3xl text-center transition-all duration-300 shadow-[inset_0_22px_56px_-36px_rgba(255,255,255,0.5),inset_0_4px_5px_-4px_rgba(255,255,255,1),inset_0_-31px_34px_-32px_rgba(96,68,144,0.3),inset_0_39px_50px_-34px_rgba(202,172,255,0.3),inset_0_2px_9px_rgba(154,146,210,0.3),inset_0_1px_10px_rgba(227,222,255,0.2)] dark:shadow-[inset_0_22px_56px_-36px_rgba(0,0,0,0.2),inset_0_4px_5px_-4px_rgba(255,255,255,0.8),inset_0_-31px_34px_-32px_rgba(90,103,216,0.1),inset_0_39px_50px_-34px_rgba(90,103,216,0.1),inset_0_2px_9px_rgba(90,103,216,0.1),inset_0_1px_10px_rgba(90,103,216,0.1)] hover:shadow-[inset_0_19px_28px_-18px_rgba(255,255,255,0.5),inset_0_4px_6px_-3px_rgba(255,255,255,1),inset_0_-51px_44px_-42px_rgba(96,68,144,0.3),inset_0_59px_60px_-32px_rgba(202,172,255,0.3),inset_0_4px_16px_rgba(154,146,210,0.3),inset_0_2px_25px_rgba(227,222,255,0.23)] dark:hover:shadow-[inset_0_19px_28px_-18px_rgba(0,0,0,0.2),inset_0_4px_6px_-3px_rgba(255,255,255,0.8),inset_0_-51px_44px_-42px_rgba(90,103,216,0.1),inset_0_59px_60px_-32px_rgba(90,103,216,0.1),inset_0_4px_16px_rgba(90,103,216,0.1),inset_0_2px_25px_rgba(90,103,216,0.1)] border-2 border-amber-900"
};
