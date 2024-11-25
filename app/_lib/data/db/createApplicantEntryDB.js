/**
 * Creates a new applicant entry in the Supabase database and uploads their resume file to storage.
 * The function generates a unique verification token and calculates its expiration time.
 *
 * @async
 * @function createApplicantEntryDB
 * @param {Object} formData - The form data containing applicant information.
 * @param {string} formData.givenName - The applicant's given name.
 * @param {string} formData.surname - The applicant's surname.
 * @param {string} formData.number - The applicant's phone number.
 * @param {string} formData.email - The applicant's email address.
 * @param {File} formData.resumeFile - The applicant's resume file.
 * @param {string} formData.currentJobTitle - The applicant's current job title.
 * @param {string} formData.linkedinLink - The applicant's LinkedIn profile link.
 * @param {string} formData.portfolioLink - The applicant's portfolio link.
 * @param {string} formData.message - An optional message from the applicant.
 * @param {string} formData.idPath - The job ID associated with the application.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the ID of the created entry and the resume link.
 * @throws {Error} Throws an error if the resume entry could not be created or if the resume upload fails.
 *
 * @example
 * const applicantData = {
 *   givenName: 'John',
 *   surname: 'Doe',
 *   number: '1234567890',
 *   email: 'john.doe@example.com',
 *   resumeFile: fileInput.files[0], // Assume fileInput is an input[type="file"]
 *   currentJobTitle: 'Software Engineer',
 *   linkedinLink: 'https://linkedin.com/in/johndoe',
 *   portfolioLink: 'https://johndoe.com',
 *   message: 'I am very interested in this position.',
 *   idPath: 'job-12345',
 * };
 *
 * try {
 *   const result = await createApplicantEntryDB(applicantData);
 *   console.log('Applicant entry created:', result);
 * } catch (error) {
 *   console.error('Error creating applicant entry:', error.message);
 * }
 */

import supabase from '@lib/supabase';

import { v4 as uuidv4 } from 'uuid';
import { randomBytes } from 'crypto';

import { calculateExpirationTime } from '@helpers/indexShared';

async function createApplicantEntryDB(formData) {
  const {
    givenName,
    surname,
    number,
    email,
    resumeFile,
    currentJobTitle,
    linkedinLink,
    portfolioLink,
    message,
    idPath,
  } = formData;

  const resumePathName = `${uuidv4()}-${resumeFile.lastModified}`;
  const resumePath = `${process.env.SUPABASE_URL}/storage/v1/object/public/CVs/${resumePathName}`;

  const token = randomBytes(32).toString('hex');

  const expirationTime = calculateExpirationTime(900);
  const expirationTimeISO = new Date(expirationTime).toISOString();

  //check if there is an existing entry:
  const { data: existingEntry, error: fetchError } = await supabase
    .from('tempResume')
    .select('id, resumeLink')
    .eq('email', email)
    .single();

  console.log('data:', existingEntry);
  console.log('error:', fetchError);

  if (fetchError && fetchError.code !== 'PGRST116')
    throw new Error(`Error checking existing entry`);

  const previousResumeLink = existingEntry ? existingEntry.resumeLink : null;

  console.log('previous resume link', previousResumeLink);

  const { data, error } = await supabase
    .from('tempResume')
    .upsert(
      {
        email,
        resumeLink: resumePath,
        givenName,
        number,
        currentJobTitle,
        surname,
        linkedinLink,
        portfolioLink,
        message,
        verificationToken: token,
        tokenExpiry: expirationTimeISO,
        jobId: idPath,
        verified: false,
        submitted: false,
      },
      { onConflict: 'email' },
    )
    .select();

  console.log('Data:', data);

  if (error) {
    console.error(error);
    throw new Error('Resume entry could not be created');
  }

  const { error: storageError } = await supabase.storage
    .from('CVs')
    .upload(resumePathName, resumeFile, {
      upsert: false,
    });

  if (storageError) {
    await supabase.from('tempResume').delete().eq('id', data.id);
    console.log(storageError);
    throw new Error(
      'Resume could not be uploaded and the Resume Entry was not created',
    );
  }

  return {
    id: data[0].id,
    resumeLink: resumePath,
  };
}

export default createApplicantEntryDB;
