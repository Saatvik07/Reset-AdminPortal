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
  Spinner,
  Alert
} from 'reactstrap';
import TextInput from './TextInput.jsx';
import { Link, Redirect } from 'react-router-dom';
import { loginAction} from '../../Store/ActionCreators/auth';
import './style.scss';
import { useDispatch, useSelector } from 'react-redux';
import { clearAlert, setAlert } from '../../Store/ActionCreators/alert';

export default function Login() {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const alert = useSelector((state) => state.alert);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Required'),
        password: Yup.string().required('Required')
    });

    const handleSubmit = async (values) => {
        try {
        await dispatch(loginAction(values.email, values.password));
        } catch (err) {
        alert(err.message);
        }
    };
    useEffect(() => {
        if (!auth.isLoading) {
        if (auth.error !== '') {
            dispatch(setAlert({ message: auth.error, color: 'danger' }));
        } else if (auth.user) {
            dispatch(setAlert({ message: 'Successful login', color: 'success' }));
            
        }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        
    }, [auth]);
    if(auth.user){
        if(auth.user.challengeName){
            return <Redirect to="/new-admin-login"/>
        }
        else{
            return <Redirect to="/view-all-guru"/>;
        }
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
                email: '',
                password: ''
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
                    <Col xs={12} md={8} lg={5}>
                    <Card className="login-page bg-white shadow rounded border-0">
                        <CardBody>
                        <h4 className="card-title text-center">Login</h4>
                        <Form>
                            <Row className="mt-4 mb-4">
                            <Col xs={12}>
                                <TextInput
                                label="Email/Username"
                                name="email"
                                type="text"
                                placeholder="Email/Username"
                                required
                                />
                            </Col>
                            </Row>
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
                            <Row>
                                <Col xs={12}>
                                    <p className="mb-0 mt-2">
                                    <small className="text-primary mr-2">
                                        <Link to="/reset-password">
                                        Forgot Password?
                                        </Link>
                                    </small>
                                    </p>
                                </Col>
                            </Row>
                            <Row className="mt-4">
                                <Col xs={12}>
                                    <Button color="primary" type="submit" block>
                                    {auth.isLoading ? (
                                        <Spinner></Spinner>
                                    ) : (
                                        <>Sign In</>
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
    );
    }