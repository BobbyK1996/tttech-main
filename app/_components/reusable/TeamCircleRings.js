function TeamCircleRings({ children }) {
  return (
    <div className="absolute overflow-hidden inset-4 sm:inset-16 md:inset-14 before:content-[''] before:absolute before:inset-0 before:border-4 before:border-transparent before:border-l-primary-400 before:border-r-accent-400 before:rounded-full before:teamsSpinnerRight after:content-[''] after:absolute after:inset-4 after:border-4 after:border-transparent after:border-l-primary-400 after:border-r-accent-400 after:rounded-full after:teamsSpinnerLeft flex items-center justify-center">
      {children}
    </div>
  );
}

export default TeamCircleRings;
