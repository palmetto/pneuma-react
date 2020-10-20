import React, {
  useRef,
  FC,
  ReactNode,
  ChangeEvent,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import Box from '../Box/Box';
import FormLabel from '../FormLabel/FormLabel';
import Button, { ButtonVariant, ButtonSize } from '../Button/Button';

interface FileUploadProps {
  /**
   * Id for the file input element.
   */
  id: string;
  /**
   * Label to be used for input. It is required for accessibility reasons although it will not be displayed.
   */
  labelText: string;
  /**
   * Callback fired when there is a change event on the file input.
   * Files can be accessed from this change event as `event.target.files`;
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * HTML attribute that specifies what type of files are accepted for upload.
   * [Read More](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept)
   */
  accept?: string;
  /**
   * Text to be rendered in file input button.
   */
  buttonProps?: {
    variant?: ButtonVariant;
    className?: string;
    size?: ButtonSize;
    fullWidth?: boolean;
    isOutlined?: boolean;
  };
  /**
   * Text to be rendered in file input button.
   */
  buttonText?: ReactNode;
  /**
   * Controls whether an upload icon is shown in the button.
   */
  hasIcon?: boolean;
  /**
   * The max number of characters displayed in file names.
   * The component will preserve the the first n / 2 characters and the last n / 2 characters,
   * including the file extension. It will only truncate characters in the middle, following
   * a native HTML file input.
   */
  fileNameMaxLength?: number;
  /**
   * File list array-like
   */
  files?: FileList;
  /**
   * Additional props to be spread to rendered element
   */
  [x: string]: any; // eslint-disable-line
}

const FileUpload: FC<FileUploadProps> = ({
  id,
  labelText,
  onChange,
  accept = undefined,
  buttonProps = {},
  buttonText = 'Upload File',
  hasIcon = true,
  fileNameMaxLength = null,
  files = null,
  ...restProps
}) => {
  const hiddenFileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (hiddenFileInput?.current) hiddenFileInput.current.click();
  };

  const truncateFileName = (fileName: string, maxLength: number): string => {
    const half = Math.floor(maxLength / 2);

    return `${fileName.substr(0, half)}...${fileName.substr(fileName.length - half, fileName.length)}`;
  };

  return (
    <>
      <FormLabel inputId={id} className="display-none">
        {labelText}
      </FormLabel>
      <Button onClick={handleClick} {...buttonProps} aria-controls="fileupload">
        {hasIcon && <FontAwesomeIcon icon={faCloudUploadAlt} className="m-right-xs" />}
        {buttonText}
        <input
          ref={hiddenFileInput}
          className="display-none"
          type="file"
          id={id}
          name="hmmm"
          accept={accept}
          onChange={onChange}
          {...restProps}
        />
      </Button>
      {files && (
        <Box>
          {[...Array.from(files)].map((file: File) => (
            <p key={file.name} className="font-size-sm m-top-xs">
              <FontAwesomeIcon icon={faPaperclip} className="font-color-grey-light m-right-xs" />
              {fileNameMaxLength ? truncateFileName(file.name, fileNameMaxLength) : file.name}
            </p>
          ))}
        </Box>
      )}
    </>
  );
};

export default FileUpload;
