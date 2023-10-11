import { useTranslation } from 'react-i18next';
import Button from '../../components/Button/Button';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { useAuthContext } from '../../context/auth/authContext';
import {
  Container,
  StyledLogoText,
  StyledSafeAreaContainer,
} from './Login.style';

const Login = () => {
  const { logIn } = useAuthContext();
  const { t } = useTranslation();
  const loginText: string = t('LOGIN');
  const handleLogin = async () => {
    await logIn?.({ username: "test", password: "test" });
  };
  return (
    <StyledSafeAreaContainer>
      <Container>
        <LanguageSelector />
        <StyledLogoText testID="welcome-message">
          {t('WELCOME_TEXT')}
        </StyledLogoText>
        <Button
          accessibleProps="login-button"
          text={loginText}
          onPress={() => handleLogin()}
        />
      </Container>
    </StyledSafeAreaContainer>
  );
};
export default Login;
