import {
  logoBase,
  productOne,
  productTwo,
  productThree,
  techSavvyImage,
  commitmentImage,
  resultsImage,
  trishnaMin,
  bobbyMin,
  farahMin,
  cainMin,
  marlennaMin,
  demMin,
  luluMin,
} from '@/public';

import {
  TiSocialLinkedinCircular,
  TiSocialInstagramCircular,
  TiSocialFacebookCircular,
  TiSocialTwitterCircular,
} from 'react-icons/ti';

import {
  isValidEmail,
  isValidJobTitle,
  isValidMessage,
  isValidName,
  isValidPhoneNumber,
  isValidUrl,
  validateFile,
} from '@helpers/indexShared';

let refreshingPromise = null;

let REFRESH_TOKEN = process.env.REFRESH_TOKEN;
let ACCESS_TOKEN = null;
let EXPIRATION_TIME = null;

const TOKEN_EXPIRATION_BUFFER = 300;

export const LOGO_DESC_LOGO_DATA = {
  content: logoBase,
  alt: 'TT Tech Logo',
};

export const LOGO_DESC_DESC_DATA = {
  header: {
    content: 'TT Tech Talent',
  },
  body: {
    content:
      'A boutique recruitment company focusing on the Development, Support and Data industries',
  },
};

export const SOCIALS_DATA = [
  {
    logo: <TiSocialLinkedinCircular />,
    href: 'https://www.linkedin.com/company/tttech-talent/',
    newTab: true,
  },
  {
    logo: <TiSocialInstagramCircular />,
    href: 'https://www.instagram.com/tttechtalent/',
    newTab: true,
  },
  {
    logo: <TiSocialTwitterCircular />,
    href: 'https://twitter.com/TTTechTalent',
    newTab: true,
  },
  {
    logo: <TiSocialFacebookCircular />,
    href: 'https://www.facebook.com/tttechtalent/',
    newTab: true,
  },
];

export const CONTACT_DATA = {
  address:
    'Winsor & Newton Building, N Building, 26 Whitefriars Ave, Harrow, HA3 5RN',
  addressLink: 'https://maps.app.goo.gl/qBxCQQ5m8EjmwQdk9',
  email: 'info@tttechrec.com',
  phoneNumber: '0203 500 2721',
};

export const LOCATION_DETAILS = {
  companyName: 'TT Tech Solutions',
  registrationLocation: 'England and Wales',
  registeredAddress:
    'Unimix House, Platinum Suite, Abbey Road, London, England, NW10 7TR',
  companyNumber: 11625905,
};

export const REVIEW_DATA = [
  {
    id: 1,
    content:
      'Trishna is as good as they come. I will be forever grateful for the way she helped me to secure my dream job with in a TM1 Analyst/Developer role. Trishna instinctively seemed to understand my strengths, and where I would best fit in, she instilled a new confidence in me (after several knockbacks in the market). I can wholeheartedly recommend Trishna as an amazing recruitment consultant.',
    quoter: 'TM1 Systems Finance Analyst Travel Company',
  },
  {
    id: 2,
    content:
      'It has been a pleasure working with Trishna over the last few years. Trishna understands my recruiting requirements and comes up with the right candidates.',
    quoter: 'Director Engineering Design Comp',
  },
  {
    id: 3,
    content:
      'Bobby is truly an exceptional individual and recruiter. He has helped me every step of the way and even taken my calls at 11pm when I had doubts or concerns. He takes his time in conveying his message and is very well spoken. Importantly, he will listen to you and ensure the client fully understands your requirements. Bobby helped me to get a job at a top software company. It’s been a pleasure to have worked with him.',
    quoter: 'Senior C++/Go Engineer Open-source Software Comp',
  },
  {
    id: 4,
    content:
      'Working with Bobby was a great experience for me. He is a true professional who was always kept me updated on how things were progressing. He was very quick on replying to text messages or emails no matter what time I was sending them. I really think he can help you, and I cannot recommend him enough.',
    quoter: 'FrontEnd React Developer Computer Software Company',
  },
  {
    id: 5,
    content:
      'You have taken a lot of stress off my shoulders, working side by side. The candidates you have sourced so far have been of a good caliber and you understood the job spec really well, while not having full details to pass on in the first conversation. You have responded during your evenings and weekends and you have been a great support so far. Thank you.',
    quoter: 'Talent Acquisition Partner CCTV Technology Company',
  },
  {
    id: 6,
    content:
      'I found Farah to be incredibly informative, professional and attentive to details in my dealings with her with a great understanding of the tech industry. It was a pleasure working with her.',
    quoter: 'Tech Support Consultant Retailer',
  },
];

export const PRODUCT_CARDS = [
  {
    id: 1,
    parameters: {
      product: productOne,
      alt: 'Product One',
      gradientDirectionMd: 'toTopRight',
      font: 'font-dmsans',
    },
    content:
      'A bespoke recruitment service tailored to your needs. We work as an extension to your internal hiring process, providing a whole recruitment solution, or additional support.',
  },
  {
    id: 2,
    parameters: {
      product: productTwo,
      alt: 'Product Two',
      font: 'font-dmsans',
    },
    content:
      'Market insights from market experts. We work together to provide reports on market saturation, trends and costs, etc. At all times, you will know what the next steps will be.',
  },
  {
    id: 3,
    parameters: {
      product: productThree,
      alt: 'Product Three',
      font: 'font-dmsans',
      gradientDirectionMd: 'toTopRight',
      gradientDirectionLg: 'toTop',
      colSpanMd: 2,
      colSpanLg: 1,
    },
    content:
      'Volume campaigns and one-off hires; we cater to you. This includes a detailed on-boarding call with one of our consultants, where we discuss short and long-term hiring plans.',
  },
];

export const COMPANY_VALUES_DATA = [
  {
    id: 1,
    parameters: {
      product: techSavvyImage,
      alt: 'Tech Savvy',
      font: 'font-dmsans',
      customTailwind: 'from-white to-white drop-shadow-2xl',
    },
    title: 'TECH SAVVY',
    content:
      'We pride ourselves on understanding the tech we work with. If we do not, how can we expect to provide a specialist service? Our consultants spend time researching the technology developers and engineers work with, so we can understand the limitations they face.',
  },
  {
    id: 2,
    parameters: {
      product: commitmentImage,
      alt: 'Commitment',
      font: 'font-dmsans',
      customTailwind: 'from-white to-white drop-shadow-2xl',
    },
    title: 'COMMITMENT',
    content:
      'Our consultants make sure you are looked after. From start to finish, we keep your experience in mind, making sure you never feel forgotten.',
  },
  {
    id: 3,
    parameters: {
      product: resultsImage,
      alt: 'Results',
      font: 'font-dmsans',
      customTailwind: 'from-white to-white drop-shadow-2xl',
      colSpanMd: 2,
      colSpanLg: 1,
    },
    title: 'RESULTS',
    content:
      'Being tech-savvy and committed means nothing if there are no results. At TT Tech Talent, we pride ourselves on our ability to deliver on our promises. Results speak for themselves, which can be seen on our testimonials page.',
  },
];

export const EMPLOYEE_DATA = [
  {
    id: 0,
    name: 'Trishna',
    image: trishnaMin,
    role: 'CEO',
    url: 'www.google.com',
  },
  {
    id: 1,
    name: 'Bobby',
    image: bobbyMin,
    role: 'Technical Recruiter',
    url: 'www.google.com',
  },
  {
    id: 2,
    name: 'Farah',
    image: farahMin,
    role: 'Support Recruiter',
    url: 'www.google.com',
  },
  {
    id: 3,
    name: 'Cain',
    image: cainMin,
    role: 'Resourcer',
    url: 'www.google.com',
  },
  {
    id: 4,
    name: 'Marlenna',
    image: marlennaMin,
    role: 'Resourcer',
    url: 'www.google.com',
  },
  {
    id: 5,
    name: 'Demitrious',
    image: demMin,
    role: 'Data Recruiter',
    url: 'https://www.google.com',
  },
  {
    id: 6,
    name: 'Lulu',
    image: luluMin,
    role: 'Joy Coordinator',
    url: 'https://www.google.com',
  },
];

export const SUBMIT_FORM_MESSAGES = ['Required', 'Optional', 'Review & Submit'];

export const VALID_FILE_TYPES = [
  { type: 'application/msword', name: '.doc' },
  {
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    name: '.docx',
  },
  { type: 'application/pdf', name: '.pdf' },
];

export const SUBMIT_FORM_VALIDATORS = {
  required: {
    givenName: isValidName,
    surname: isValidName,
    number: isValidPhoneNumber,
    email: isValidEmail,
    resumeFile: validateFile,
  },
  optional: {
    currentJobTitle: isValidJobTitle,
    linkedinLink: (value) => isValidUrl(value, true),
    portfolioLink: isValidUrl,
    message: isValidMessage,
  },
};
