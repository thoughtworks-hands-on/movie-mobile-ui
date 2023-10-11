import {useTranslation} from 'react-i18next';
import Button from '../../components/Button/Button';
import {useAuthContext} from '../../context/auth/authContext';
import {Container, StyledText} from './Home.style';

export type Props = {
  baseEnthusiasmLevel: number;
};

const Home = () => {
  const {logOut} = useAuthContext();
  const {t} = useTranslation();

  return (
    <Container>
      <StyledText testID="home">{t('HOME')}</StyledText>
      <Button accessibleProps="logout" text="Log out" onPress={logOut} />
    </Container>
  );
};
export default Home;
