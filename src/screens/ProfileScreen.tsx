import React from 'react';
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import { Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import { IAppState } from '../redux/reducers';
import { copyObject } from '../utils';
import { InstanceAxios, uploadFileServer } from '../utils/RequestMethods';
import ButtonLoading from '../components/ButtonLoading';
import ButtonUploadImage from '../components/ButtonUploadImage';
import config from '../constants/config';
import { initUserObj, UserT } from '../types/Users';
import images from '../constants/images';


export const getCurrentUser = async (): Promise<UserT> => {
    return InstanceAxios.get(`${config.url.wpJson}/wp/v2/users/me`).then((res) => {
        if (res && res.data) {
            return res.data
        }
    }).catch((error) => {
        throw error
    })
}


export type IProfileScreenProps = {

}

const ProfileScreen: React.FC<IProfileScreenProps> = ({ }) => {
    let auth = useSelector((state: IAppState) => state.auth)
    const [fileLogo, setFileLogo] = React.useState(null)
    const [user, setUser] = React.useState(initUserObj);
    const [dirty, setDirty] = React.useState({});
    const form = React.useRef(null)
    const [validated, setValidated] = React.useState(false);
    const [isReady, setIsReady] = React.useState(false);



    React.useEffect(() => {
        fetchUserData()
    }, []);

    const fetchUserData = async () => {
        getCurrentUser().then((res) => {
            setUser(res)
            setIsReady(true)
        }).catch((error) => {
            setIsReady(true)
        })

    }

    const updateDirty = (key: string, value: any): void => {
        let cloneDirty = copyObject(dirty)
        cloneDirty[key] = value
        setDirty(cloneDirty)
    }

    const save = async (params = {}): Promise<string> => {
        if (!params) {
            params = {}
        }
        try {
            let res = await InstanceAxios.post(`${config.url.wpJson}/wp/v2/users/me`, params)
            if (res && res.data) {
                setUser(res.data)
                resetDirty()
                return 'User saved.'
            }
        } catch (error) {
            throw error
        }
    }


    const resetDirty = () => {
        setDirty({})
    }

    const saveProfilePicture = async (event): Promise<string> => {
        try {
            const res = await uploadFileServer(fileLogo)
            if (res.source_url) {
                updateDirty('profilePic', res.source_url)
                let params = {
                    profilePic: res.source_url
                }
                const resSave = await save(params)
                if (resSave) {
                    setTimeout(() => {
                        setFileLogo(null)
                    }, 1000);
                    return "Profile Pic saved."
                }
            }
        } catch (error) {
            throw error
        }
    }

    if (!isReady) {
        return (
            <Container className="mt-5 text-center">
                <Spinner animation="border" variant="info" />
            </Container>
        )
    }

    return (
        <Container className="mt-5 mb-5">
            <Form noValidate
                ref={form}
                validated={validated}>
                <Row>

                    <Col xs={12} sm={"auto"}>
                        <div className="d-flex flex-column align-items-center">
                            <Image
                                src={fileLogo && fileLogo.uri ? fileLogo.uri : user.profilePic != '' ? user.profilePic : images.defaultUser}
                                style={{ width: 200, height: 200 }} />
                            <div>
                                <ButtonUploadImage
                                    type="button"

                                    accept={"image/png, image/jpeg"}
                                    className="btn-link  mt-2"
                                    onChangeFile={(file) => {
                                        setFileLogo(file)
                                    }}>
                                    Update Profile Pic
                                </ButtonUploadImage>
                                {fileLogo && <div>
                                    <Button variant="light"
                                        onClick={() => {
                                            setFileLogo(null)
                                        }}>
                                        Cancel</Button>
                                    <ButtonLoading
                                        className="btn-primary"
                                        onClickFetching={saveProfilePicture}>
                                        Save</ButtonLoading>
                                </div>}
                            </div>
                        </div>
                    </Col>
                    <Col xs={12} sm={8}>
                        <Form.Group>

                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                value={`${_.has(dirty, "firstName") ? dirty['firstName'] : user.firstName}`}
                                className='input-material'
                                onChange={(event) => {
                                    updateDirty('firstName', event.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                className='input-material'
                                value={`${_.has(dirty, "lastName") ? dirty['lastName'] : user.lastName}`}
                                onChange={(event) => {
                                    updateDirty('lastName', event.target.value)
                                }}
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                // disabled={true}
                                value={`${_.has(dirty, "email") ? dirty['email'] : user.email}`}
                                className='input-material'
                                onChange={(event) => {
                                    updateDirty('email', event.target.value)
                                }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <ButtonLoading
                                /*className="btn-primary"*/
                                className='btn-primary btn-block'
                                onClickFetching={async (e): Promise<string> => {
                                    let params = { ...dirty }
                                    return await save(params)
                                }} >
                                Save
                            </ButtonLoading>
                        </Form.Group>
                    </Col>
                </Row>
            </Form >
        </Container >
    );
}

export default ProfileScreen
export { ProfileScreen }