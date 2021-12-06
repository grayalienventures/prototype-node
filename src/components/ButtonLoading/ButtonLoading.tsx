

import * as React from 'react'
import { Button, Spinner } from 'react-bootstrap';
import { styleRules, __pick } from './utils';
import * as _ from 'lodash'
import PropTypes from 'prop-types';
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
const colors = {
    red: "#cc0000",
    green: "#198c19",
}

export interface SpinnerProps {
    animation: 'border' | 'grow';
    role?: string;
    size?: 'sm';
    variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'light'
    | 'dark';
    bsPrefix?: string;
}

// enum status {
//     loading = 'loading',
//     success = 'success',
//     error = 'error',
// }
declare const { defaultValue, value, ...inputAttributes }: React.InputHTMLAttributes<HTMLInputElement>;
type InputAttributes = typeof inputAttributes;

export interface ButtonLoadingProps extends React.InputHTMLAttributes<HTMLInputElement> {
    bootstrap?: boolean
    block?: boolean
    onClickFetching?: (event?: React.MouseEvent<HTMLButtonElement>) => Promise<string>
    propsSpinner?: SpinnerProps
    timeShowMsg?: number
    clearResult?: boolean
    customResponseMessage?(msg: string, status: boolean): JSX.Element
    variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light'
    | 'link'
    | 'outline-primary'
    | 'outline-secondary'
    | 'outline-success'
    | 'outline-danger'
    | 'outline-warning'
    | 'outline-info'
    | 'outline-dark'
    | 'outline-light';
    // status?: status
}

const defaultProps = {
    disabled: false,
    bootstrap: true,
    clearResult: true,
    customResponseMessage: null,
    propsSpinner: null,
    type: "button",
    block: false,
    className: "",
    timeShowMsg: 2000,
    style: {
        backgroundColor: ''
    },
    // variant: "primary"
}

const ButtonLoading: React.FunctionComponent<ButtonLoadingProps> = (props): JSX.Element => {

    const [loading, setLoading] = React.useState(false);
    const [show, setShow] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [isSuccessMsg, setIsSuccessMsg] = React.useState(false);
    // const [status, setStatus] = React.useState(null);


    const showMsg = (msg: string = "", success: boolean = false) => {
        setLoading(false)
        setIsSuccessMsg(success)
        setShow(true);
        setMsg(msg);

        if (props.clearResult && props.clearResult == true) {
            setTimeout(() => {
                clearResult()
            }, props.timeShowMsg);
        }

    }


    const clearResult = () => {
        setIsSuccessMsg(false)
        setShow(false);
        setMsg('');
    }



    /**
     * 
     * @param e 
     */
    const onClick = (e) => {
        if (props.onClick) {
            return props.onClick(e)
        }


        if (props.onClickFetching) {
            setLoading(true)
            props.onClickFetching(e).then((res) => {
                showMsg(res, true)
            }).catch((error) => {
                const msgError = _.has(error, "message") ? `${error.message}` : `${error}`
                showMsg(msgError, false)
            })
        }
    }
    const renderMessage = (): JSX.Element => {
        if (props.customResponseMessage) {
            return props.customResponseMessage(msg, isSuccessMsg)
        }
        return (
            <span style={{ color: isSuccessMsg ? colors.green : colors.red }} >{msg}</span>
        )
    }

    const { block } = props
    let classBtn = props.bootstrap ? "btn" : ""
    let className = `${classBtn} ${props.variant ? `btn-${props.variant}` : ""} ${props.className} ${block ? "btn-block" : ""}`
    if (show) {
        return (
            <span className="text-center" style={{ flex: 1, padding: 5, alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                {renderMessage()}
            </span>
        )
    }

    return (
        <button
            {...__pick(props, btnProps)}
            disabled={loading ? true : props.disabled}
            className={className}
            onClick={(e) => onClick(e)}  >
            {loading ? <>   <Spinner animation="border" {...props.propsSpinner} /> Loading... </>
                : props.children}
        </button>
    )
}

ButtonLoading.defaultProps = defaultProps;
export default ButtonLoading;
export { ButtonLoading };
