import TeamCircleInner from '@components/non-reusable/TeamCircleInner';
import TeamCircleRings from '@components/non-reusable/TeamCircleRings';

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
