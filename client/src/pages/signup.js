import React, { useState, useContext } from 'react';
import { Form } from '../components';
import { HeaderContainer } from '../containers/header';
import { FooterContainer } from '../containers/footer';
import { AuthContext } from '../contexts/AuthContext';

export default function SignUp() {
  const { registerUser } = useContext(AuthContext);
  const [error, setError] = useState('');
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const handleSignup = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError('Password does not match');
      return;
    }

    try {
      const registerData = await registerUser(registerForm);
      if (!registerData.success) {
        setError(registerData.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Đăng ký</Form.Title>
          {error !== '' && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignup}>
            <Form.Input
              placeholder="Tên"
              name="displayName"
              onChange={onChangeRegisterForm}
            />
            <Form.WrapInput>
              <Form.Input
                placeholder="Địa chỉ email"
                value={username}
                name="username"
                onChange={onChangeRegisterForm}
              />
            </Form.WrapInput>
            <Form.WrapInput>
              <Form.Input
                type="password"
                value={password}
                name="password"
                autoComplete="off"
                placeholder="Mật khẩu"
                onChange={onChangeRegisterForm}
              />
            </Form.WrapInput>
            <Form.WrapInput>
              <Form.Input
                type="password"
                value={confirmPassword}
                name="confirmPassword"
                autoComplete="off"
                placeholder="Mật khẩu"
                onChange={onChangeRegisterForm}
              />
            </Form.WrapInput>
            <Form.Submit type="submit" data-testid="sign-up">
              Đăng ký
            </Form.Submit>
          </Form.Base>
          <Form.FBLogin>
            <Form.FBIcon />
            <Form.FBText>Đăng ký bằng tài khoản Facebook</Form.FBText>
          </Form.FBLogin>
          <Form.Text>
            Bạn đã có tài khoản?
            <Form.Link to="/signin"> Đăng nhập ngay.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            Trang này được Google reCAPTCHA bảo vệ để đảm bảo bạn không phải là
            robot. Tìm hiểu thêm.
          </Form.TextSmall>
        </Form>
        <FooterContainer />
      </HeaderContainer>
    </>
  );
}
