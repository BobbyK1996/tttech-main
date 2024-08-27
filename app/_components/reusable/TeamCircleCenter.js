import TeamCircleInner from './TeamCircleInner';
import TeamCircleRings from './TeamCircleRings';

function TeamCircleCenter({ employeeArray, activeIndex }) {
  return (
    <TeamCircleRings>
      {employeeArray.map((employee) => (
        <TeamCircleInner
          activeIndex={activeIndex}
          employee={employee}
          key={employee.id}
        />
      ))}
    </TeamCircleRings>
  );
}

export default TeamCircleCenter;
