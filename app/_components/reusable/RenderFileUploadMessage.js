function RenderFileUploadMessage({ resumeFile, resumeFileError }) {
  const isValidFile =
    resumeFile !== undefined &&
    resumeFileError &&
    typeof resumeFileError.status !== 'undefined';

  if (!isValidFile) return null;

  if (resumeFileError.status)
    return (
      <span className='flex items-center gap-x-2 text-green-500'>
        <span className='min-w-max'>Uploaded file: </span>
        <strong>{resumeFile?.name}</strong>
      </span>
    );

  return (
    <span className='flex items-center text-red-500'>
      {resumeFileError?.message}
    </span>
  );
}

export default RenderFileUploadMessage;
