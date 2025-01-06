import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

// Prevent flash of wrong theme during page refresh
if (ExecutionEnvironment.canUseDOM) {
  try {
    const theme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.dataset.theme = theme;
  } catch (err) {
    // If localStorage is not available, fallback to light theme
    document.documentElement.setAttribute("data-theme", "light");
    document.documentElement.dataset.theme = "light";
  }
}
