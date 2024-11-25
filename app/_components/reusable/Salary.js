import { RiMoneyPoundCircleLine } from 'react-icons/ri';

import { formatToK, validateSalaryString } from '@helpers/indexServer';

function Salary({ salary, customCSS }) {
  const salaryMin =
    validateSalaryString(salary) !== 0
      ? Number(salary.split('-')[0].trim())
      : 0;
  const salaryMax =
    validateSalaryString(salary) !== 0
      ? Number(salary.split('-')[1].trim())
      : 0;

  return (
    <div className={`flex items-center gap-3 text-xl ${customCSS}`}>
      <div className='text-3xl text-primary-400'>
        <RiMoneyPoundCircleLine />
      </div>
      <div>
        <span className='font-bold'>
          £{formatToK(salaryMin)} - £{formatToK(salaryMax)}
        </span>
        <span className='text-xs'> /year</span>
      </div>
    </div>
  );
}

export default Salary;
