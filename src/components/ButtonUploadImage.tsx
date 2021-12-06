import * as React from 'react';
import ButtonLoading from './ButtonLoading/ButtonLoading';
import bytes from 'bytes'
import * as _ from 'lodash'
import { __pick } from '../utils';

const btnProps = [
    // HTML attributes
    "title",
    "style",
    "className",
    "disabled",
    "type",
    "id",
    // Event listeners
    "onFocus",
    "onBlur",
    "onClick",
    "onKeyDown",

];
export interface Error {
    type: string
    msg: string
}
interface file {
    name: string
    type: string,
    size: number,
    lastModified: number
    uri: string
    webkitRelativePath?: string
}
export interface IButtonUploadImageProps extends React.InputHTMLAttributes<HTMLInputElement> {
    accept?: string
    maxSize?: string,
    onErrorValidate?(error: Error): void
    onChangeFile?(file: file): void
    children?: React.ReactNode
}

const ButtonUploadImage: React.FC<IButtonUploadImageProps> = (props) => {
    const [file, setFile] = React.useState("");
    const [imagePreviewUrl, setImagePreviewUrl] = React.useState(null);
    const fileInputRef = React.useRef(null)
    const btnRef = React.useRef(null)


    const openFileDialog = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }

    }

    const onChangeInput = (evt) => {
        evt.preventDefault();

        let reader = new FileReader();
        let file = evt.target.files[0];

        const error = validateFile(file)
        if (error) {
            onError(error)
            return error
        }

        reader.onloadend = () => {

            if (props.onChangeFile) {
                file.uri = reader.result
                props.onChangeFile(file)
            }
            setFile(file)
            setImagePreviewUrl(reader.result)

        }

        reader.readAsDataURL(file)

    }

    const validateFile = (file) => {
        const { accept } = props
        let error = null
        if (_.isArray(props.accept) && accept.includes(file.type)) {
            error = {
                type: "unsupportedFileType",
                msg: "Unsupported file type."
            }
        }
        if (props.maxSize != null && file.size > bytes(props.maxSize)) {
            error = {
                type: "maxSizeExceeded",
                msg: `Max File Size Exceeded ${props.maxSize}`
            }
        }
        return error
    }

    const onError = (error) => {
        if (props.onErrorValidate) {
            props.onErrorValidate(error)
        }
    }


    const onClick = () => {
        openFileDialog()
    }

    return (
        <>
            <ButtonLoading
                {...__pick(props, btnProps)}
                // ref={this.setRef}
                onClick={onClick} >
                <input
                    ref={fileInputRef}
                    className="FileInput"
                    type="file"
                    onChange={onChangeInput}
                    accept={props.accept}
                    style={{ display: "none" }}
                />
                {props.children}
            </ButtonLoading>

        </>
    );
}
export default ButtonUploadImage;
export { ButtonUploadImage };