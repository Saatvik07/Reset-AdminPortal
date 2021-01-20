import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import {
  Container,
  Col,
  Row,
  Button,
  CardBody,
  Card,
  Alert,
  Spinner
} from 'reactstrap';
import TextInput from './TextInput';
import { Link, Redirect } from 'react-router-dom';
import { newUserLoginAction } from '../../Store/ActionCreators/auth';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert, setAlert } from '../../Store/ActionCreators/alert';
function NewAdminLogin() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const alert = useSelector((state) => state.alert);
    const validationSchema = Yup.object().shape({ 
        password: Yup.string()
            .min(8, 'Password has to be longer than 8 characters!')
            .matches(
            /^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/,
            'Needs one special character'
            )
            .matches(/[0-9]/, 'Needs one digit')
            .matches(/[a-z]/, 'Needs one lowercase character')
            .matches(/[A-Z]/, 'Needs one uppercase character')
            .required('Required'),
        passwordConfirm: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
    });
    const handleSubmit = async (values) => {
        try {
          await dispatch(
            newUserLoginAction(
              auth.user,
              values.password,
            )
          );
        } catch (err) {
          dispatch(setAlert({ message: 'Error', color: 'danger' }));
        }
      };
    if(auth.user&& auth.idToken){
        return <Redirect to="/view-all-guru"/>
    }
    return (
        <div>
            <Container className="mb-100 mt-150">
                {alert.isAlert && (
                <Row className="mb-2">
                    <Col xs={12}>
                    <Alert color={alert.color}>{alert.msg}</Alert>
                    </Col>
                </Row>
                )}
                <Formik
                initialValues={{
                    password: '',
                    passwordConfirm: ''
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    dispatch(clearAlert());
                    if (!auth.isLoading) {
                        handleSubmit(values);
                    }
                }}
                >
                {(props) => (
                    <Container>
                    <Row className="justify-content-center">
                        <Col xs={12} md={8} lg={6}>
                        <Card className="login-page bg-white shadow rounded border-0">
                            <CardBody>
                            <h4 className="card-title text-center">Change Password<span className="danger">*</span></h4>
                            <Form>
                                <Row className="mt-4">
                                    <Col xs={12}>
                                        <TextInput
                                        label="Password"
                                        placeholder="Password"
                                        name="password"
                                        type="password"
                                        required
                                        />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col xs={12}>
                                        <TextInput
                                        label="Confirm Password"
                                        name="passwordConfirm"
                                        placeholder="Confirm Password"
                                        type="password"
                                        required
                                        />
                                    </Col>
                                    <Col xs={12} className="mt-2">
                                        <small className="text-dark mr-2">
                                        <em>
                                            Password must have minimum 8 characters, 1
                                            special character, 1 number & 1 uppercase
                                            character.
                                        </em>
                                        </small>
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                <Col xs={12}>
                                    <Button color="primary" type="submit" block>
                                    {auth.isLoading ? (
                                        <Spinner>idk</Spinner>
                                    ) : (
                                        <>Update</>
                                    )}
                                    </Button>
                                </Col>
                                </Row>
                            </Form>
                            </CardBody>
                        </Card>
                        </Col>
                    </Row>
                    </Container>
                )}
                </Formik>
            </Container>
        </div>
    )
}

export default NewAdminLogin
