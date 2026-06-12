let welcomeCompleted = false;

export const shouldShowWelcome = () => !welcomeCompleted;

export const markWelcomeComplete = () => {
  welcomeCompleted = true;
};

export const resetWelcomeSession = () => {
  welcomeCompleted = false;
};
