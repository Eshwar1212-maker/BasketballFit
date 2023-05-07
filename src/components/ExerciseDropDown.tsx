interface ExerciseDropdownProps {
    exercises: string[];
    onSelectExercise: (exercise: string) => void;
  }
  
  export const ExerciseDropdown: React.FC<ExerciseDropdownProps> = ({ exercises, onSelectExercise }) => {
    return (
      <div className="exercise-dropdown bg-white rounded-md shadow-md absolute mt-2 max-h-[200px] overflow-y-auto z-10 w-[360px]">
        {exercises.map((exercise, index) => (
          <div
            key={index}
            className="exercise-dropdown-item p-2 cursor-pointer hover:bg-gray-200"
            onClick={() => onSelectExercise(exercise)}
          >
            {exercise}
          </div>
        ))}
      </div>
    );
  };
  