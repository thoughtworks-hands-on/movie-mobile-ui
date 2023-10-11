import {NavigationContainer} from '@react-navigation/native';
import {render} from '../utilities/test-util';
import AuthNavigation from './AuthNavigation';

describe('[Navigation] - [AuthNavigation]', () => {
  it('should render without error', () => {
    render(
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>,
    );
  });
});
